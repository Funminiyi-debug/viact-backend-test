import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [],
  exports: [],
})
export class UserModule {}
