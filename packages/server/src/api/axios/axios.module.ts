import { Module } from '@nestjs/common';
import { AxiosController } from './axios.controller';

@Module({
  controllers: [AxiosController],
})
export class AxiosModule {}
