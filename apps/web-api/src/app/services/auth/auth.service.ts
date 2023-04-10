import {
  JwtFullData,
  JwtInfo,
  ThirdPartyJwtInfo,
} from './../../models/services/jwt.interface';
import {
  serviceSuccess,
  ServiceResult,
  serviceError,
} from './../service-result';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { concatMap, Observable, catchError, of, throwError, from } from 'rxjs';

@Injectable()
export class AuthService {
  private readonly jwt_expiration: string = '7d';
  private readonly jwt_issuer: string = 'KeepSportNestBackend';

  constructor(private readonly _jwt: JwtService) {}

  signIn(thirdPartyInfo: ThirdPartyJwtInfo): Observable<ServiceResult<string>> {
    // TODO: Check user exist
    return of(thirdPartyInfo).pipe(
      concatMap(({ uid: thirdPartyUid, avatar, userName, signInType }) =>
        this.createJwtToken({
          uid: 'test uid',
          userName,
          avatar,
          thirdPartyUid,
          signInType,
        })
      ),
      concatMap((tokenResult) => {
        if (tokenResult.isOk && tokenResult.data) {
          return serviceSuccess(tokenResult.data);
        } else {
          throwError(() => tokenResult.error);
        }
      }),
      catchError((error) => serviceError<string>(error))
    );
  }

  authentication(jwtToken: string): Observable<ServiceResult<string>> {
    return this.verifyJwtToken(jwtToken).pipe(
      concatMap((tokenResult) => {
        if (tokenResult.isOk && tokenResult.data) {
          return this.signIn(tokenResult.data as ThirdPartyJwtInfo);
        } else {
          throwError(() => tokenResult.error);
        }
      }),
      concatMap((signInResult) => {
        if (signInResult.isOk && signInResult.data) {
          return serviceSuccess(signInResult.data);
        } else {
          throwError(() => signInResult.error);
        }
      }),
      catchError((error) => serviceError<string>(error))
    );
  }

  createJwtToken(data: JwtInfo): Observable<ServiceResult<string>> {
    return from(
      this._jwt.signAsync(data, {
        algorithm: 'HS256',
        issuer: this.jwt_issuer,
        expiresIn: this.jwt_expiration,
      })
    ).pipe(
      concatMap((jwt) => serviceSuccess(jwt)),
      catchError((error) => serviceError<string>(error))
    );
  }

  verifyJwtToken(token: string): Observable<ServiceResult<JwtFullData>> {
    return from(
      this._jwt.verifyAsync<JwtFullData>(token, {
        algorithms: ['HS256'],
      })
    ).pipe(
      concatMap((data) => serviceSuccess(data)),
      catchError((error) => serviceError<JwtFullData>(error))
    );
  }
}
