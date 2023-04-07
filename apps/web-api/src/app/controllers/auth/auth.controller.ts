import { concatMap, of } from 'rxjs';
import { GetLINEOAuthTokenBody, GetLINEOAuthTokenResponse } from '@model';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { Response } from 'express';

import { LineService } from './../../services/auth/line.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _line: LineService) {}

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

  @Post('/line')
  async getLINEOAuthToken(
    @Res() res: Response,
    @Body() body: GetLINEOAuthTokenBody
  ) {
    return this._line.getToken(body.code).pipe(
      concatMap((result) => {
        if (result.isOk && result.data) {
          const viewData: GetLINEOAuthTokenResponse = result.data;
          return of(res.status(HttpStatus.OK).json(viewData));
        } else {
          return of(res.status(HttpStatus.BAD_REQUEST).json(result.error));
        }
      })
    );
  }

  @Get('/line/verify/:token')
  async verifyLINEOAuthToken(
    @Res() res: Response,
    @Param() params: { token: string }
  ) {
    return this._line.verifyToken(params.token).pipe(
      concatMap((result) => {
        if (result.isOk && result.data) {
          return of(res.status(HttpStatus.OK).json(result.data));
        } else {
          return of(res.status(HttpStatus.BAD_REQUEST).json(result.error));
        }
      })
    );
  }

  @Post('/line/refresh')
  async refreshLINEOAuthToken(
    @Res() res: Response,
    @Body() body: { refreshToken: string }
  ) {
    return this._line.refreshToken(body.refreshToken).pipe(
      concatMap((result) => {
        if (result.isOk && result.data) {
          return of(res.status(HttpStatus.OK).json(result.data));
        } else {
          return of(res.status(HttpStatus.BAD_REQUEST).json(result.error));
        }
      })
    );
  }

  @Delete('/line')
  async revokeLINEOAuthToken(
    @Res() res: Response,
    @Body() body: { token: string }
  ) {
    return this._line.revokeToken(body.token).pipe(
      concatMap((result) => {
        if (result.isOk) {
          return of(res.status(HttpStatus.OK).send());
        } else {
          return of(res.status(HttpStatus.BAD_REQUEST).json(result.error));
        }
      })
    );
  }

  @Get('/line/verify/jwt/:token')
  async verifyLINEJWT(
    @Res() res: Response,
    @Param() params: { token: string }
  ) {
    return this._line.verifyIdToken(params.token).pipe(
      concatMap((result) => {
        if (result.isOk && result.data) {
          return of(res.status(HttpStatus.OK).json(result.data));
        } else {
          return of(res.status(HttpStatus.BAD_REQUEST).json(result.error));
        }
      })
    );
  }
}
