import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import type { AnalysisState } from '@modules/analysis/store/analysis.state';
import { APP_ACTIONS } from '@modules/app/store/app.actions';
import type { ApiResponse } from '@modules/app/type/api-response';
import { catchGeneralErrorPipe } from '@modules/app/util/pipe/catchGeneralError';
import { validateApiResponsePipe } from '@modules/app/util/pipe/validateApiResponseRx';
import type { IRootState } from '@src/store';
import { createEffect } from '@stock/packages-redux/src/createEffect';
import { ofType } from '@stock/packages-redux/src/ofType';
import { debounceTime, from, map } from 'rxjs';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';

export const loadIntraDaySpeed$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadIntraDaySpeed),
    debounceTime(1000),
    withLatestFrom(state$, (_i, state: IRootState) => [_i, state.analysis]),
    filter((value: any) => {
      const analysisState: AnalysisState = value[1];

      return !!(analysisState.intraDaySpeedSymbol && analysisState.toDate);
    }),
    switchMap((value: any) => {
      const analysisState: AnalysisState = value[1];

      // const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/market-tick-action/history?symbol=${analysisState.intraDaySpeedSymbol}&date=${analysisState.toDate}`;
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_DEFAULT_URL}/market-tick-action/intra-day-speed?symbol=${analysisState.intraDaySpeedSymbol}&date=${analysisState.toDate}`;

      return from(fetch(url)).pipe(
        switchMap((res) => from(res.json())),
        validateApiResponsePipe(),
        map((data: ApiResponse) => {
          if (data?.success === true) {
            return ANALYSIS_ACTIONS.loadIntraDaySpeedDataSuccess({ data });
          } else {
            return APP_ACTIONS.fetchApiError(data);
          }
        }),
        catchGeneralErrorPipe(),
      );
    }),
  ),
);
