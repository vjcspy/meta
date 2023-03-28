import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { proxyFetch } from '@util/proxy-fetch';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import {
  getCheckoutConfig,
  getCheckoutConfigAfter,
  getCheckoutConfigError,
} from './actions';

const getCheckoutConfig$ = createEffect((action$) =>
  action$.pipe(
    ofType(getCheckoutConfig),
    switchMap(() =>
      from(
        proxyFetch({
          type: 'get-checkout-config',
        })
      ).pipe(
        map((res: any) => {
          return getCheckoutConfigAfter({ checkout: res });
        }),
        catchError((error) => of(getCheckoutConfigError({ error })))
      )
    )
  )
);

export const R_CONFIG_EFFECTS = [getCheckoutConfig$];
