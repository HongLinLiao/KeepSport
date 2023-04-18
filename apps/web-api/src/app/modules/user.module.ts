import { Module } from '@nestjs/common';
import { UserController } from '../controllers/auth/user.controller';
import { DataServiceModule } from './repository/data.module';
import { UserService } from '../services/user.service';

@Module({
  imports: [DataServiceModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
