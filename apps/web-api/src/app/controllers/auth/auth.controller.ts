import { concatMap, of, throwError, Observable, catchError } from 'rxjs';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LineService } from './../../services/auth/line.service';
import { AuthService } from './../../services/auth/auth.service';
import { AuthenticationReq, SignInReq, SignInType, UserInfo } from '@model';
import { UserService } from '../../services/user.service';
import { JwtFullData, JwtInfo } from './../../models/services/jwt.interface';
import { UserInfo as SV_User } from '../../models/services/user.interface';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _line: LineService,
    private readonly _auth: AuthService,
    private readonly _user: UserService
  ) {}

  @Get('/line')
  getLINEOAuthEndpoint() {
    return this._line.getOAuthEndpoint().pipe(
      concatMap((uri) => {
        return uri
          ? of(uri)
          : throwError(() => new Error('Get line login uri error!'));
      }),
      catchError((error: Error) => {
        return throwError(() => new BadRequestException(error.message));
      })
    );
  }

  @Post('/login')
  signIn(@Body() body: SignInReq): Observable<string> {
    return of(body).pipe(
      concatMap((data) => {
        return data.signInType === SignInType.LINE
          ? this._line.signIn(data.code)
          : throwError(() => new Error('Invalid Third-Party agent!'));
      }),
      concatMap((jwtInfo) => {
        return jwtInfo
          ? this._auth.signIn(jwtInfo)
          : throwError(() => new Error('Line authentication error!'));
      }),
      catchError((error: Error) => {
        return throwError(() => new BadRequestException(error.message));
      })
    );
  }

  @Post()
  authentication(@Body() body: AuthenticationReq): Observable<string> {
    return this._auth.verifyJwtToken(body.token).pipe(
      concatMap((jwtData) => {
        return jwtData
          ? this._auth.createJwtToken(this.toJwtInfoModel(jwtData))
          : throwError(() => new Error('Invalid token!'));
      }),
      catchError((error: Error) =>
        throwError(() => new UnauthorizedException(error.message))
      )
    );
  }

  @Get('/login/user')
  getUser(@Headers('Authorization') auth: string): Observable<UserInfo> {
    //TODO: adust to get from user
    return this._auth.verifyJwtToken(auth.split(' ')[1]).pipe(
      concatMap((jwtData) => {
        return jwtData
          ? this._user.getUserById(jwtData.uid)
          : throwError(() => new Error('Invalid token!'));
      }),
      concatMap((userInfo) => {
        return userInfo
          ? of(this.toUserViewModel(userInfo))
          : throwError(() => new Error('Invalid user!'));
      }),
      catchError((error: Error) =>
        throwError(() => new UnauthorizedException(error.message))
      )
    );
  }

  toUserViewModel(data: SV_User): UserInfo {
    return {
      uid: data.uid,
      userName: data.name,
      avatar: data.avatar,
      signInType: data.signInType,
      thirdPartyUid: data.thirdPartyUid,
    };
  }

  toJwtInfoModel(data: JwtFullData): JwtInfo {
    return {
      uid: data.uid,
      userName: data.userName,
      avatar: data.avatar,
      signInType: data.signInType,
      thirdPartyUid: data.thirdPartyUid,
    };
  }
}
