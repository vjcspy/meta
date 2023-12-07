import { catchError, EMPTY, pipe } from 'rxjs';

export const catchGeneralErrorPipe = () => {
  return pipe(
    catchError((err) => {
      console.error(err);

      return EMPTY;
    }),
  );
};
