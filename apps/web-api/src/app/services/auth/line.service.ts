import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { v4 as uuid } from 'uuid';
import { concatMap, of, catchError, Observable } from 'rxjs';

import { AppConfig } from './../config.service';
import { serviceSuccess, serviceError, ServiceResult } from '../service-result';
import {
  LINEOAuth,
  VerifyLINEJWT,
  VerifyLINEOAuth,
} from '../../models/services/line.interface';

const authorizeUri = 'https://access.line.me/oauth2/v2.1/authorize';

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

  getOAuthEndpoint(): Observable<ServiceResult<string>> {
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
      concatMap((queries) =>
        of(
          `${authorizeUri}?${queries
            .map((e) => `${e.key}=${e.value}`)
            .join('&')}`
        )
      ),
      concatMap((data) => serviceSuccess(data)),
      catchError((error) => serviceError<string>(error))
    );
  }

  getToken(code: string): Observable<ServiceResult<LINEOAuth>> {
    return this._http
      .request<LINEOAuth>({
        url: 'https://api.line.me/oauth2/v2.1/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          grant_type: 'authorization_code',
          code,
          redirect_uri: this.redirectUrl,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
      })
      .pipe(
        concatMap((res) => of(res.data)),
        concatMap((data) => serviceSuccess(data)),
        catchError((error) => serviceError<LINEOAuth>(error))
      );
  }

  verifyToken(accessToken: string): Observable<ServiceResult<VerifyLINEOAuth>> {
    return this._http
      .request<VerifyLINEOAuth>({
        url: 'https://api.line.me/oauth2/v2.1/verify',
        method: 'GET',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        params: {
          access_token: accessToken,
        },
      })
      .pipe(
        concatMap((res) => of(res.data)),
        concatMap((data) => serviceSuccess(data)),
        catchError((error) => serviceError<VerifyLINEOAuth>(error))
      );
  }

  refreshToken(refreshToken: string): Observable<ServiceResult<LINEOAuth>> {
    return this._http
      .request<LINEOAuth>({
        url: 'https://api.line.me/oauth2/v2.1/token',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
      })
      .pipe(
        concatMap((res) => of(res.data)),
        concatMap((data) => serviceSuccess(data)),
        catchError((error) => serviceError<LINEOAuth>(error))
      );
  }

  revokeToken(token: string): Observable<ServiceResult> {
    return this._http
      .request({
        url: 'https://api.line.me/oauth2/v2.1/revoke',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          access_token: token,
          client_id: this.clientId,
          client_secret: this.clientSecret,
        },
      })
      .pipe(
        concatMap(() => serviceSuccess()),
        catchError((error) => serviceError(error))
      );
  }

  verifyIdToken(
    idToken: string,
    nonce?: string,
    userId?: string
  ): Observable<ServiceResult<VerifyLINEJWT>> {
    console.log(idToken);

    return this._http
      .request<VerifyLINEJWT>({
        url: 'https://api.line.me/oauth2/v2.1/verify',
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: {
          id_token: idToken,
          client_id: this.clientId,
          nonce,
          user_id: userId,
        },
      })
      .pipe(
        concatMap((res) => of(res.data)),
        concatMap((data) => serviceSuccess(data)),
        catchError((error) => serviceError<VerifyLINEJWT>(error))
      );
  }
}
