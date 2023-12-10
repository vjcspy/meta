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
import { auditTime, debounceTime, from, map } from 'rxjs';
import { switchMap, withLatestFrom } from 'rxjs/operators';

export const loadTickIntraDay$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadTickIntraDay),
    debounceTime(500),
    withLatestFrom(state$, (_i, state: IRootState) => [_i, state.analysis]),
    switchMap((d: any) => {
      const analysisState: AnalysisState = d[1];
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/tick/intra-day?symbol=${analysisState.symbol}&date=${analysisState.toDate}`;

      return from(fetch(url)).pipe(
        switchMap((res) => from(res.json())),
        validateApiResponsePipe(),
        map((data: ApiResponse) => {
          if (data?.success === true) {
            return ANALYSIS_ACTIONS.loadTickIntraDaySuccess(data);
          } else {
            return APP_ACTIONS.fetchApiError(data);
          }
        }),
        catchGeneralErrorPipe(),
      );
    }),
  ),
);

export const refreshTickIntraDay$ = createEffect((action$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.refreshTickIntraDay),
    auditTime(2 * CommonValue.REFRESH_WINDOW_TIME),
    map(() => ANALYSIS_ACTIONS.loadTickIntraDay({})),
  ),
);
