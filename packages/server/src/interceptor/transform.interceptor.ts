import {
  Injectable,
  NestInterceptor,
  CallHandler,
  ExecutionContext,
} from '@nestjs/common';
import { map, timeout } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Response<T> {
  data: T;
  status: number;
}

// 对以下api不进行数据转换
const ignoreApiList = [];

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Observable<Response<T>> {
    const ctx = context.switchToHttp();
    const { originalUrl } = ctx.getRequest();

    const isIgnoreFlag = ignoreApiList.filter((item) =>
      originalUrl.startsWith(item),
    )[0];

    return next.handle().pipe(
      timeout(5000), // 5000ms 请求取消
      map((data) => {
        return isIgnoreFlag
          ? data
          : {
              data,
              status: 200,
            };
      }),
    );
  }
}
