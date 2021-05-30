import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Options,
  Delete,
  Head,
  Put,
  Patch,
} from '@nestjs/common';

@Controller('api/axios/extend')
export class ExtendController {
  @Get('get')
  get(@Query() query: any) {
    return query;
  }

  @Post('post')
  post(@Body() body: any) {
    return body;
  }

  @Options('options')
  errorGet(@Query() query: any) {
    return query;
  }

  @Delete('delete')
  delete(@Query() query: any) {
    return query;
  }

  @Head('head')
  head(@Query() query: any) {
    return query;
  }

  @Put('put')
  put(@Query() query: any) {
    return query;
  }

  @Patch('patch')
  patch(@Query() query: any) {
    return query;
  }
}
