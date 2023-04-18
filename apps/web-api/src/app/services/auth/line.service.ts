import { ThirdPartyJwtInfo } from './../../models/services/jwt.interface';
import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { v4 as uuid } from 'uuid';
import { concatMap, of, Observable, map } from 'rxjs';

import { AppConfig } from './../config.service';
import {
  LINEOAuth,
  VerifyLINEJWT,
  VerifyLINEOAuth,
  LINEUserProfile,
} from '../../models/services/line.interface';
import { SignInType } from '@model';

const LINE_AUTHORIZE_ENDPOINT = 'https://access.line.me/oauth2/v2.1';
const LINE_OAUTH_ENDPOINT = 'https://api.line.me/oauth2/v2.1';

const LINE_USER_PROFILE_ENDPOINT = 'https://api.line.me/v2';
const REQUEST_CONTENT_TYPE = 'application/x-www-form-urlencoded';

@Injectable()
export class LineService {
  private readonly scope: string = 'profile%20openid%20email';
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly redirectUrl: string;

  constructor(
    private readonly _config: AppConfig,
    private readonly _http: HttpService
  ) {
    const config = this._config.getConfig();
    this.clientId = config.line_oauth_client_id;
    this.clientSecret = config.line_oauth_client_secret;
    this.redirectUrl = config.line_oauth_redirect_url;
  }

  getOAuthEndpoint(): Observable<string> {
    const queryStrings: { key: string; value: string }[] = [
      { key: 'response_type', value: 'code' },
      { key: 'client_id', value: this.clientId },
      {
        key: 'redirect_uri',
        value: this.redirectUrl,
      },
      { key: 'state', value: uuid() },
      { key: 'scope', value: this.scope },
    ];

    return of(queryStrings).pipe(
      map(
        (queries) =>
          `${LINE_AUTHORIZE_ENDPOINT}/authorize?${queries
            .map((e) => `${e.key}=${e.value}`)
            .join('&')}`
      )
    );
  }

  signIn(code: string): Observable<ThirdPartyJwtInfo> {
    return this.getToken(code).pipe(
      concatMap((tokenData) => this.getLineUserProfile(tokenData.access_token)),
      map((profile) => {
        const {
          userId: uid,
          displayName: userName,
          pictureUrl: avatar,
        } = profile;
        return {
          uid,
          userName,
          avatar,
          signInType: SignInType.LINE,
        } as ThirdPartyJwtInfo;
      })
    );
  }

  getToken(code: string): Observable<LINEOAuth> {
    return this._http
      .request<LINEOAuth>({
        url: `${LINE_OAUTH_ENDPOINT}/token`,
        method: 'POST',
        headers: {
          'Content-Type': REQUEST_CONTENT_TYPE,
        },
        data: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUrl,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
      })
      .pipe(map((res) => res.data));
  }

  verifyToken(accessToken: string): Observable<VerifyLINEOAuth> {
    return this._http
      .request<VerifyLINEOAuth>({
        url: `${LINE_OAUTH_ENDPOINT}/verify`,
        method: 'GET',
        headers: {
          'Content-Type': REQUEST_CONTENT_TYPE,
        },
        params: {
          access_token: accessToken,
        },
      })
      .pipe(map((res) => res.data));
  }

  refreshToken(refreshToken: string): Observable<LINEOAuth> {
    return this._http
      .request<LINEOAuth>({
        url: `${LINE_OAUTH_ENDPOINT}/token`,
        method: 'POST',
        headers: {
          'Content-Type': REQUEST_CONTENT_TYPE,
        },
        data: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
      })
      .pipe(map((res) => res.data));
  }

  revokeToken(token: string): Observable<unknown> {
    return this._http.request({
      url: `${LINE_OAUTH_ENDPOINT}/revoke`,
      method: 'POST',
      headers: {
        'Content-Type': REQUEST_CONTENT_TYPE,
      },
      data: {
        access_token: token,
        client_id: this.clientId,
        client_secret: this.clientSecret,
      },
    });
  }

  verifyIdToken(
    idToken: string,
    nonce?: string,
    userId?: string
  ): Observable<VerifyLINEJWT> {
    return this._http
      .request<VerifyLINEJWT>({
        url: `${LINE_OAUTH_ENDPOINT}/verify`,
        method: 'POST',
        headers: {
          'Content-Type': REQUEST_CONTENT_TYPE,
        },
        data: {
          id_token: idToken,
          client_id: this.clientId,
          nonce,
          user_id: userId,
        },
      })
      .pipe(map((res) => res.data));
  }

  getLineUserProfile(accessToken: string): Observable<LINEUserProfile> {
    return this._http
      .request<LINEUserProfile>({
        url: `${LINE_USER_PROFILE_ENDPOINT}/profile`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(map((res) => res.data));
  }
}
