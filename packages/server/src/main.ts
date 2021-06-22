import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { TransformInterceptor } from './interceptor/transform.interceptor';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('combined'));

  app.enableCors({
    credentials: true,
    origin: true,
    methods: ['POST', 'GET', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Access-Token',
      'X-XSRF-TOKEN',
      'User-Agent',
      'Referer',
      'Accept',
    ],
  });

  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3090, () => {
    console.log('serve start at 3090');
  });
}
bootstrap();
