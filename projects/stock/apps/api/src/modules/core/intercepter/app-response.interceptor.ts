import { OkResponse } from '@modules/core/model/ok-response';
import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class AppResponseInterceptor<T> implements NestInterceptor<T, Response> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        if (data instanceof OkResponse) {
          return data.output();
        }
        return data;
      }),
    );
  }
}
