import { AuthModule } from './auth.module';
import { Module } from '@nestjs/common';
import { UserController } from '../controllers/auth/user.controller';

@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
