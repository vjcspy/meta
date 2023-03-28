import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import {
  appCheckReferUrl,
  appHasReferUrl,
  increaseCount,
} from '@modules/app/store/app.actions';
import { EMPTY } from 'rxjs';
import { map, mapTo, tap, withLatestFrom } from 'rxjs/operators';

const whenIncrease$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(increaseCount),
    withLatestFrom(state$),
    tap(([action, state]) =>
      console.log('Run effect: ' + action.type, state.app)
    ),
    mapTo({ type: 'AFTER_INDECREASE_COUNT' })
  )
);

const whenCheckUrlRefer$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(appCheckReferUrl),
    withLatestFrom(state$, (v1: any, v2: any) => [v1, v2.app.referUrl]),
    map((data: any) => {
      if (data[1]) {
        return appHasReferUrl({
          url: data[1],
        });
      }
      return EMPTY;
    })
  )
);

export const APP_EFFECTS = [whenCheckUrlRefer$];
