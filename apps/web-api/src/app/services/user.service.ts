import { Injectable } from '@nestjs/common';
import { IDataAccessService } from '../interfaces/DataAccessService';
import { Observable, map } from 'rxjs';
import { UserInfo } from '../models/services/user.interface';
import { User } from '../models/data/User';
import { Types } from 'mongoose';

@Injectable()
export class UserService {
  constructor(private readonly _data: IDataAccessService) {}

  createUser(data: UserInfo): Observable<UserInfo> {
    return this._data.user
      .create(this.toDataModel(data))
      .pipe(map((data) => data && this.toServiceModel(data)));
  }

  getUserById(id: string): Observable<UserInfo> {
    return this._data.user
      .getById(id)
      .pipe(map((data) => data && this.toServiceModel(data)));
  }

  getUser(condition: {
    [key in keyof User]?: User[keyof User];
  }): Observable<UserInfo> {
    return this._data.user
      .getOne(condition)
      .pipe(map((data) => data && this.toServiceModel(data)));
  }

  toDataModel(data: UserInfo): User {
    return {
      _id: data.uid ? new Types.ObjectId(data.uid) : undefined,
      name: data.name,
      avatar: data.avatar,
      signInType: data.signInType,
      thirdPartyUid: data.thirdPartyUid,
    };
  }

  toServiceModel(data: User): UserInfo {
    return {
      uid: data._id?.toString(),
      name: data.name,
      avatar: data.avatar,
      signInType: data.signInType,
      thirdPartyUid: data.thirdPartyUid,
    };
  }
}
