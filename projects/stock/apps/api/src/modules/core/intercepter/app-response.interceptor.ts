import { OkResponse } from '@modules/core/model/ok-response';
import { getInstanceId, xAppContext } from '@nest/base';
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
          const response = context.switchToHttp().getResponse();
          response.header(
            'x-correlation-id',
            `${getInstanceId()}|${xAppContext().getXCorrelationId()}`,
          );
          if (response.statusCode === 201) {
            response.status(200); // Thay đổi mã trạng thái từ 201 thành 200
          }
          return data.output();
        }
        return data;
      }),
    );
  }
}
