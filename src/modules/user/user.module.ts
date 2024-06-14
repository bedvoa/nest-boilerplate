import { Module } from '@nestjs/common';
import { UserController } from './controller/user.controller';
import { UserService } from './service/user.service';
import { UserDao } from './dao/user.dao';
import { DatabaseModule } from '../database/database.module';
import { userRepository } from './repository/user.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [DatabaseModule, AuthModule],
  controllers: [UserController],
  providers: [UserService, UserDao, ...userRepository],
  exports: [UserDao, UserService],
})
export class UserModule {}
