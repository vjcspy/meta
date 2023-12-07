import type { ApiResponse } from '@src/modules/app/type/api-response';
import { validateApiResponse } from '@src/modules/app/type/api-response';
import { of, pipe, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const validateApiResponsePipe = () => {
  return pipe(
    switchMap((data: ApiResponse) => {
      const { error, value } = validateApiResponse(data);

      if (error) {
        return throwError(() => error);
      } else {
        return of(value);
      }
    }),
  );
};
