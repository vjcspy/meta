import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import { APP_ACTIONS } from '@modules/app/store/app.actions';
import type { ApiResponse } from '@modules/app/type/api-response';
import { catchGeneralErrorPipe } from '@modules/app/util/pipe/catchGeneralError';
import { validateApiResponsePipe } from '@modules/app/util/pipe/validateApiResponseRx';
import { createEffect } from '@stock/packages-redux/src/createEffect';
import { ofType } from '@stock/packages-redux/src/ofType';
import { debounceTime, from, map } from 'rxjs';
import { switchMap } from 'rxjs/operators';

export const loadAnalysisTableData$ = createEffect((action$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadAnalysisTableData),
    debounceTime(500),
    switchMap(() => {
      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/stock-trading/analysis-v1`;

      return from(fetch(url)).pipe(
        switchMap((res) => from(res.json())),
        validateApiResponsePipe(),
        map((data: ApiResponse) => {
          if (data?.success === true) {
            return ANALYSIS_ACTIONS.loadAnalysisTableDataSuccess(data);
          } else {
            return APP_ACTIONS.fetchApiError(data);
          }
        }),
        catchGeneralErrorPipe(),
      );
    }),
  ),
);
