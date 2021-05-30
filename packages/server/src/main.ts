import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import morgan from 'morgan';
import { TransformInterceptor } from './interceptor/transform.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(morgan('combined'));

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(3090, () => {
    console.log('serve start at 3090');
  });
}
bootstrap();
