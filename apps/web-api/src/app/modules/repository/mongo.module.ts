import { IDataAccessService } from '../../interfaces/DataAccessService';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from '../../models/data/User';
import { MongoService } from '../../services/repository/mongo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: User.name.toLowerCase(),
      },
    ]),
    MongooseModule.forRoot(
      'mongodb+srv://root:kDzYpnmhE4UYnlyN@keep-sport-dev.pyv19n5.mongodb.net/main'
    ),
  ],
  providers: [
    {
      provide: IDataAccessService,
      useClass: MongoService,
    },
  ],
  exports: [IDataAccessService],
})
export class MongoDataServiceModule {}
