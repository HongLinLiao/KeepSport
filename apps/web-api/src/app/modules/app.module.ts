import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth.module';
import { UserModule } from './user.module';
import configuration from '../configuration';
import { AppConfig } from './../services/config.service';
import { DataServiceModule } from './repository/data.module';
import { AppController } from '../controllers/app.controller';
import { AppService } from '../services/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    DataServiceModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppConfig, AppService],
})
export class AppModule {}
