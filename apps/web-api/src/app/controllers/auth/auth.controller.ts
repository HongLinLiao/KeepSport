import { concatMap, of, catchError, throwError } from 'rxjs';
import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { LineService } from './../../services/auth/line.service';
import { AuthService } from './../../services/auth/auth.service';
import { ApiTags } from '@nestjs/swagger';
import { SignInBody, SignInType } from '@model';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly _line: LineService,
    private readonly _auth: AuthService
  ) {}

  @Post('/signIn')
  async signIn(@Body() body: SignInBody, @Res() res: Response) {
    return of(body).pipe(
      concatMap((data) => {
        if (data.signInType === SignInType.LINE) {
          return this._line.signIn(data.code);
        } else {
          throwError(() => new Error('Invalid Third-Party agent!'));
        }
      }),
      concatMap((svResult) => {
        if (svResult.isOk && svResult.data) {
          return this._auth.signIn(svResult.data);
        } else {
          throwError(() => svResult.error);
        }
      }),
      concatMap((tokenResult) => {
        if (tokenResult.isOk && tokenResult.data) {
          return of(res.status(HttpStatus.OK).send(tokenResult.data));
        } else {
          throwError(() => tokenResult.error);
        }
      }),
      catchError((error) => {
        return of(res.status(HttpStatus.UNAUTHORIZED).json(error));
      })
    );
  }

  @Post('/authentication')
  async authentication(@Body() body: { token: string }, @Res() res: Response) {
    return this._auth.authentication(body.token).pipe(
      concatMap((svResult) => {
        if (svResult.isOk && svResult.data) {
          return of(res.status(HttpStatus.OK).send(svResult.data));
        } else {
          throwError(() => svResult.error);
        }
      }),
      catchError((error) => {
        return of(res.status(HttpStatus.UNAUTHORIZED).json(error));
      })
    );
  }

  @Get('/line')
  async getLINEOAuthEndpoint(@Res() res: Response) {
    return this._line.getOAuthEndpoint().pipe(
      concatMap((result) => {
        if (result.isOk) {
          return of(res.status(HttpStatus.OK).send(result.data));
        } else {
          return of(res.status(HttpStatus.BAD_REQUEST).json(result.error));
        }
      })
    );
  }
}
