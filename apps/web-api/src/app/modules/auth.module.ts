import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AuthController } from '../controllers/auth/auth.controller';
import { LineService } from '../services/auth/line.service';
import { AppConfig } from '../services/config.service';

@Module({
  imports: [HttpModule],
  controllers: [AuthController],
  providers: [AppConfig, LineService],
})
export class AuthModule {}
