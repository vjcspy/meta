import type { Action } from 'redux';
import type { StateObservable } from 'redux-observable';
import type { Observable } from 'rxjs';
import { EMPTY } from 'rxjs';
import { filter } from 'rxjs/operators';

export const createEffect = (
  effect: (
    action: Action<{ type: string }>,
    stateObservable: StateObservable<any>
  ) => Observable<{ type: string } | Observable<never>>
) => {
  return (
    action: Action<{ type: string }>,
    stateObservable: StateObservable<any>
  ): Observable<{ type: string }> =>
    effect(action, stateObservable).pipe(filter((a) => a !== EMPTY)) as any;
};
