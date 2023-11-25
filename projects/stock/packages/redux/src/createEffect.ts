import type { AnyAction } from '@reduxjs/toolkit';
import type { StateObservable } from 'redux-observable';
import type { Observable } from 'rxjs';
import { EMPTY } from 'rxjs';
import { filter } from 'rxjs/operators';

export const createEffect = (
  effect: (
    action$: Observable<AnyAction>,
    state$: StateObservable<any>,
  ) => Observable<{ type: string } | unknown>,
) => {
  return (
    _action$: Observable<AnyAction>,
    _state$: StateObservable<any>,
  ): Observable<{ type: string }> =>
    effect(_action$, _state$).pipe(filter((a: any) => a !== EMPTY)) as any;
};
