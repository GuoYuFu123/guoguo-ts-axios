import { Module } from '@nestjs/common';
import { AxiosModule } from './axios/axios.module';
import { ExtendModule } from './extend/extend.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AxiosModule, ExtendModule, UploadModule],
})
export class ApiModule {}
