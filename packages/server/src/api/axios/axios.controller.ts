import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Query,
  Req,
} from '@nestjs/common';

@Controller('api/axios')
export class AxiosController {
  @Get('base/get')
  get(@Query() query: any) {
    return query;
  }

  @Get('base/get/403')
  get403() {
    throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
  }

  @Post('base/post')
  post(@Body() body: any) {
    return body;
  }

  //error
  @Get('error/get')
  errorGet() {
    throw new BadRequestException();
    // return query;
  }

  @Get('headers/get')
  headersGet(@Req() req) {
    return req.headers;
  }
}
