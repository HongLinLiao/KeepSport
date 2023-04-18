import { Observable, catchError, concatMap, of, throwError } from 'rxjs';
import {
  BadRequestException,
  Controller,
  Get,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../services/auth/auth.guard';
import { UserService } from './../../services/user.service';
import { UserInfo } from '@model';
import { UserInfo as SV_UserInfo } from '../../models/services/user.interface';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly _user: UserService) {}

  @Get(':uid')
  @UseGuards(AuthGuard)
  getUserByUid(@Param('uid') uid: string): Observable<UserInfo> {
    return this._user.getUserById(uid).pipe(
      concatMap((user) => {
        return of(user && this.toViewModel(user));
      }),
      catchError((error: Error) =>
        throwError(() => new BadRequestException(error.message))
      )
    );
  }

  toViewModel(data: SV_UserInfo): UserInfo {
    return {
      uid: data.uid,
      userName: data.name,
      avatar: data.avatar,
      signInType: data.signInType,
      thirdPartyUid: data.thirdPartyUid,
    };
  }
}
