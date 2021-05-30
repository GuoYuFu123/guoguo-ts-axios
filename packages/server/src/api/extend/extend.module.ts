import { Module } from '@nestjs/common';
import { ExtendController } from './extend.controller';

@Module({
  controllers: [ExtendController],
})
export class ExtendModule {}
