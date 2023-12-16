import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { APP_ACTIONS } from '@modules/app/store/app.actions';
import type { ApiResponse } from '@modules/app/type/api-response';
import { message } from '@modules/app/util/message';
import { catchGeneralErrorPipe } from '@modules/app/util/pipe/catchGeneralError';
import { validateApiResponsePipe } from '@modules/app/util/pipe/validateApiResponseRx';
import { createEffect } from '@stock/packages-redux/src/createEffect';
import { ofType } from '@stock/packages-redux/src/ofType';
import axios from 'axios';
import { debounceTime, from, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const loadMarketCat$ = createEffect((action$) =>
  action$.pipe(
    ofType(
      ANALYSIS_ACTIONS.loadMarketCat,
      ANALYSIS_ACTIONS.saveMarketCatSuccess,
    ),
    debounceTime(500),
    switchMap(() => {
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/market-cat/list`;

      return from(fetch(url)).pipe(
        switchMap((res) => from(res.json())),
        validateApiResponsePipe(),
        map((data: ApiResponse) => {
          if (data?.success === true) {
            return ANALYSIS_ACTIONS.loadMarketCatSuccess(data);
          } else {
            return APP_ACTIONS.fetchApiError(data);
          }
        }),
        catchGeneralErrorPipe(),
      );
    }),
  ),
);

export const saveMarketCat$ = createEffect((action$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.saveMarketCat),
    debounceTime(1000),
    switchMap((action) => {
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/market-cat/save`;

      return from(axios.post(url, action.payload.cat)).pipe(
        map((res) => res.data),
        validateApiResponsePipe(),
        map((data: ApiResponse) => {
          if (data?.success === true) {
            message().success({
              content: 'Save Market Category success',
            });
            return ANALYSIS_ACTIONS.saveMarketCatSuccess(data);
          } else {
            return APP_ACTIONS.fetchApiError(data);
          }
        }),
        catchGeneralErrorPipe(),
      );
    }),
  ),
);
