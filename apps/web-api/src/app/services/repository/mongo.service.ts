import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IDataAccessService } from '../../interfaces/DataAccessService';
import { User, UserDocument } from '../../models/data/User';
import { MongoRepository } from '../../repository/MongoRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class MongoService
  implements IDataAccessService, OnApplicationBootstrap
{
  user: MongoRepository<User>;

  constructor(
    @InjectModel(User.name) private UserRepository: Model<UserDocument>
  ) {}

  onApplicationBootstrap() {
    this.user = new MongoRepository<User>(this.UserRepository);
  }
}
