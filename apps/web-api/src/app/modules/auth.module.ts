import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AuthController } from '../controllers/auth/auth.controller';
import { LineService } from '../services/auth/line.service';
import { AppConfig } from '../services/config.service';
import { AuthService } from '../services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from '../interfaces/Config.interface';

@Module({
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (_config: ConfigService) => ({
        secret: _config.get<Config>('config').jwt_secret,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AppConfig, AuthService, LineService],
})
export class AuthModule {}
