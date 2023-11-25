import type { AnalysisState } from '@modules/analysis/store/analysis.state';
import type { ApiResponse } from '@modules/app/type/api-response';
import { ANALYSIS_ACTIONS } from '@src/modules/analysis/store/analysis.actions';
import { APP_ACTIONS } from '@src/modules/app/store/app.actions';
import { validateApiResponsePipe } from '@src/modules/app/util/validateApiResponseRx';
import type { IRootState } from '@src/store';
import { createEffect } from '@stock/packages-redux/src/createEffect';
import { ofType } from '@stock/packages-redux/src/ofType';
import { from, map } from 'rxjs';
import { filter, switchMap, withLatestFrom } from 'rxjs/operators';

const loadCorsEffect$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadCors),
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
      );
    }),
  ),
);

const loadTickIntraDay$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadTickIntraDay),
    withLatestFrom(state$, (_i, state: IRootState) => [_i, state.analysis]),
    switchMap((d: any) => {
      const analysisState: AnalysisState = d[1];
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/tick/intra-day?symbol=${analysisState.symbol}&date=${analysisState.toDate}`;

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
      );
    }),
  ),
);

export const configAnalysisEffects = (storeManager: any) => {
  storeManager.addEpics('analysis', [loadCorsEffect$, loadTickIntraDay$]);
};
