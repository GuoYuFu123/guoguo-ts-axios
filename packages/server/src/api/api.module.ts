import { Module } from '@nestjs/common';
import { AxiosModule } from './axios/axios.module';
import { ExtendModule } from './extend/extend.module';
import { UploadModule } from './upload/upload.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AxiosModule, ExtendModule, UploadModule, AuthModule, UsersModule],
})
export class ApiModule {}
