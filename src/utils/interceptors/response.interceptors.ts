import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  result: T | null;
  message: string;
  success?: boolean;
  status: number;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => ({
        status: Number(context.switchToHttp().getResponse().statusCode),
        success:
          context
            .switchToHttp()
            .getResponse()
            .statusCode.toString()
            .charAt(0) === '2',
        message: data.message,
        result: data,
      })),
    );
  }
}
