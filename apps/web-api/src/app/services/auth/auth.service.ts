import { concatMap, Observable, from } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

import { UserService } from './../user.service';
import { UserInfo } from './../../models/services/user.interface';
import {
  JwtFullData,
  JwtInfo,
  ThirdPartyJwtInfo,
} from './../../models/services/jwt.interface';

@Injectable()
export class AuthService {
  private readonly jwt_expiration: string = '7d';
  private readonly jwt_issuer: string = 'KeepSportNestBackend';

  constructor(
    private readonly _jwt: JwtService,
    private readonly _user: UserService
  ) {}

  signIn(thirdPartyInfo: ThirdPartyJwtInfo): Observable<string> {
    const { uid, signInType, userName, avatar } = thirdPartyInfo;
    return this._user.getUser({ thirdPartyUid: uid, signInType }).pipe(
      concatMap((user) => {
        if (user) {
          return this.createJwtToken(this.toJwtInfoModel(user));
        } else {
          return this._user
            .createUser({
              name: userName,
              avatar,
              signInType,
              thirdPartyUid: uid,
            })
            .pipe(
              concatMap((user) =>
                this.createJwtToken(this.toJwtInfoModel(user))
              )
            );
        }
      })
    );
  }

  authentication(jwtToken: string): Observable<string> {
    return this.verifyJwtToken(jwtToken).pipe(
      concatMap((token) => this.signIn(token as ThirdPartyJwtInfo))
    );
  }

  createJwtToken(data: JwtInfo): Observable<string> {
    return from(
      this._jwt.signAsync(data, {
        algorithm: 'HS256',
        issuer: this.jwt_issuer,
        expiresIn: this.jwt_expiration,
      })
    );
  }

  verifyJwtToken(token: string): Observable<JwtFullData> {
    return from(
      this._jwt.verifyAsync<JwtFullData>(token, {
        algorithms: ['HS256'],
      })
    );
  }

  toJwtInfoModel(data: UserInfo): JwtInfo {
    return {
      uid: data.uid.toString(),
      userName: data.name,
      avatar: data.avatar,
      signInType: data.signInType,
      thirdPartyUid: data.thirdPartyUid,
    };
  }
}
