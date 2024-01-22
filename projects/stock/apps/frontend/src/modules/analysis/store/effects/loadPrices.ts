import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import type { AnalysisState } from '@modules/analysis/store/analysis.state';
import { CommonValue } from '@modules/analysis/value/common.value';
import { APP_ACTIONS } from '@modules/app/store/app.actions';
import type { ApiResponse } from '@modules/app/type/api-response';
import { catchGeneralErrorPipe } from '@modules/app/util/pipe/catchGeneralError';
import { validateApiResponsePipe } from '@modules/app/util/pipe/validateApiResponseRx';
import type { IRootState } from '@src/store';
import { createEffect } from '@stock/packages-redux/src/createEffect';
import { ofType } from '@stock/packages-redux/src/ofType';
import { debounceTime, from, map } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

export const loadPrices$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadPrices),
    debounceTime(500),
    withLatestFrom(state$, (_i, state: IRootState) => [_i, state.analysis]),
    switchMap((value: any) => {
      const analysisState: AnalysisState = value[1];
      let url: string;
      if (analysisState.symbol === CommonValue.VNINDEX_CODE) {
        url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/stock-price/histories?code=${analysisState.symbol}&from=${analysisState.fromDate}&to=${analysisState.toDate}`;
      } else {
        url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/stock-price/simple-histories?code=${analysisState.symbol}&from=${analysisState.fromDate}&to=${analysisState.toDate}`;
      }

      return from(fetch(url)).pipe(
        switchMap((res) => from(res.json())),
        validateApiResponsePipe(),
        map((data: ApiResponse) => {
          if (data?.success === true) {
            return ANALYSIS_ACTIONS.loadPricesSuccess(data);
          } else {
            return APP_ACTIONS.fetchApiError(data);
          }
        }),
        catchGeneralErrorPipe(),
      );
    }),
  ),
);
