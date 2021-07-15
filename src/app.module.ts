import { Module } from '@nestjs/common';
import { AuthzModule } from './authz/authz.module';
import { UserModule } from './user/user.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [AuthzModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
