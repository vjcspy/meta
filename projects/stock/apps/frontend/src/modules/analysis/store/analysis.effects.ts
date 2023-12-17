import { loadAnalysisTableData$ } from '@modules/analysis/store/effects/loadAnalaysisTableData';
import {
  loadMarketTickIntraDay$,
  tapLoadTickIntraDaySuccess,
} from '@modules/analysis/store/effects/loadMarketTickIntraDay';
import { loadPrices$ } from '@modules/analysis/store/effects/loadPrices';
import {
  loadTickIntraDay$,
  refreshTickIntraDay$,
} from '@modules/analysis/store/effects/loadTickIntraDay';
import { loadTicks$ } from '@modules/analysis/store/effects/loadTicks';
import {
  loadMarketCat$,
  saveMarketCat$,
} from '@modules/analysis/store/effects/marketCat';
import {
  loadMarketSymbolTick$,
  loadMarketTicks$,
} from '@modules/analysis/store/effects/marketTicks';
import type { ApiResponse } from '@modules/app/type/api-response';
import { catchGeneralErrorPipe } from '@modules/app/util/pipe/catchGeneralError';
import { validateApiResponsePipe } from '@modules/app/util/pipe/validateApiResponseRx';
import { ANALYSIS_ACTIONS } from '@src/modules/analysis/store/analysis.actions';
import { APP_ACTIONS } from '@src/modules/app/store/app.actions';
import type { IRootState } from '@src/store';
import { createEffect } from '@stock/packages-redux/src/createEffect';
import { ofType } from '@stock/packages-redux/src/ofType';
import { debounceTime, from, map } from 'rxjs';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';

const loadCorsEffect$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadCors),
    debounceTime(500),
    withLatestFrom(state$, (_i, state: IRootState) => [
      _i,
      state.analysis.cors,
    ]),
    filter((d) => typeof d[1] === 'undefined'),
    switchMap(() => {
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_DEFAULT_URL}/cor/get-all-v1`;

      return from(fetch(url)).pipe(
        switchMap((res) => from(res.json())),
        validateApiResponsePipe(),
        map((data: ApiResponse) => {
          if (data?.success === true) {
            return ANALYSIS_ACTIONS.loadCorsSuccess(data);
          } else {
            return APP_ACTIONS.fetchApiError(data);
          }
        }),
        catchGeneralErrorPipe(),
      );
    }),
  ),
);

export const configAnalysisEffects = (storeManager: any) => {
  storeManager.addEpics('analysis', [
    loadCorsEffect$,
    loadTickIntraDay$,
    loadTicks$,
    loadPrices$,
    refreshTickIntraDay$,
    loadAnalysisTableData$,
    loadMarketCat$,
    saveMarketCat$,
    loadMarketTicks$,
    loadMarketSymbolTick$,
    loadMarketTickIntraDay$,
    tapLoadTickIntraDaySuccess,
  ]);
};
