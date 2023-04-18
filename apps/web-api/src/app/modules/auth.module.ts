import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from '../controllers/auth/auth.controller';
import { LineService } from '../services/auth/line.service';
import { AppConfig } from '../services/config.service';
import { AuthService } from '../services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { IConfig } from '../interfaces/Config.interface';
import { UserModule } from './user.module';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: async (_config: ConfigService) => ({
        secret: _config.get<IConfig>('config').jwt_secret,
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AppConfig, AuthService, LineService],
  exports: [AuthService, LineService],
})
export class AuthModule {}
