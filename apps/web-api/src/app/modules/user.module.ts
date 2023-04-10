import { AuthModule } from './auth.module';
import { Module } from '@nestjs/common';
import { AppConfig } from '../services/config.service';
import { AuthService } from '../services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Config } from '../interfaces/Config.interface';
import { UserController } from '../controllers/auth/user.controller';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (_config: ConfigService) => ({
        secret: _config.get<Config>('config').jwt_secret,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
  ],
  controllers: [UserController],
  providers: [AppConfig, AuthService],
})
export class UserModule {}
