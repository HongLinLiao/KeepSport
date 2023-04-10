import { catchError, concatMap, of, throwError } from 'rxjs';
import { Response } from 'express';
import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './../../services/auth/auth.service';
import { UserInfo } from '@model';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly _auth: AuthService) {}

  @Post('/token')
  getUser(@Body() body: { token: string }, @Res() res: Response) {
    //TODO: adust to get from user
    return this._auth.verifyJwtToken(body.token).pipe(
      concatMap((svResult) => {
        if (svResult.isOk && svResult.data) {
          return of(res.status(HttpStatus.OK).json(svResult.data as UserInfo));
        } else {
          throwError(() => svResult.error);
        }
      }),
      catchError((error) => {
        return of(res.status(HttpStatus.UNAUTHORIZED).json(error));
      })
    );
  }
}
