import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('combined'));

  app.enableCors({
    credentials: true,
    origin: true,
    // origin: [
    //   'http://localhost:3000',
    //   'http://127.0.0.1:3000',
    //   'http://10.253.28.233:3000',
    //   'http://www.a.fuguoyu.com'
    // ],
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
  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3090, () => {
    console.log('serve start at 3090');
  });
}
bootstrap();
