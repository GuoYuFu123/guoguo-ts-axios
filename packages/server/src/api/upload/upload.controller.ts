import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('api/axios/upload')
export class UploadController {
  @Post('post')
  @UseInterceptors(FileInterceptor('file'))
  post(@UploadedFile() file: Express.Multer.File) {
    return file;
  }
}
