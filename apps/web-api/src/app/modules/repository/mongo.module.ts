import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { IDataAccessService } from '../../interfaces/DataAccessService';
import { User, UserSchema } from '../../models/data/User';
import { MongoService } from '../../services/repository/mongo.service';
import { IConfig } from '../../interfaces/Config.interface';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
        collection: User.name.toLowerCase(),
      },
    ]),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (_config: ConfigService) => ({
        uri: _config.get<IConfig>('config').mongo_connection,
        dbName: 'main',
      }),
      inject: [ConfigService],
    }),
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
