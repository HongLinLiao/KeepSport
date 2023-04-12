import { catchError, concatMap, of, throwError } from 'rxjs';
import { Response } from 'express';
import { Controller, Get, Headers, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './../../services/auth/auth.service';
import { UserInfo } from '@model';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly _auth: AuthService) {}

  @Get('/token')
  getUser(@Headers('Authorization') auth: string, @Res() res: Response) {
    //TODO: adust to get from user
    return this._auth.verifyJwtToken(auth.split(' ')[1]).pipe(
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
