import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import type { AnalysisState } from '@modules/analysis/store/analysis.state';
import { MarketIntraDay } from '@modules/analysis/util/ticks/market-intra-day';
import { APP_ACTIONS } from '@modules/app/store/app.actions';
import type { ApiResponse } from '@modules/app/type/api-response';
import { catchGeneralErrorPipe } from '@modules/app/util/pipe/catchGeneralError';
import { validateApiResponsePipe } from '@modules/app/util/pipe/validateApiResponseRx';
import type { IRootState } from '@src/store';
import { createEffect } from '@stock/packages-redux/src/createEffect';
import { ofType } from '@stock/packages-redux/src/ofType';
import { forEach, map as arrayMap } from 'lodash-es';
import moment from 'moment/moment';
import {
  debounceTime,
  EMPTY,
  from,
  groupBy,
  map,
  mergeMap,
  switchMap,
} from 'rxjs';
import { filter, withLatestFrom } from 'rxjs/operators';

export const loadMarketTickIntraDay$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadMarketIntraDayTicks),
    debounceTime(1000),
    withLatestFrom(state$, (_i, state: IRootState) => [_i, state.analysis]),
    mergeMap((d: any) => {
      const analysisState: AnalysisState = d[1];
      const date = analysisState.toDate;
      const selectedMarketCat = analysisState.selectedMarketCat;

      if (
        selectedMarketCat &&
        Array.isArray(selectedMarketCat?.symbols) &&
        selectedMarketCat.symbols.length > 0
      ) {
        MarketIntraDay.setTickDate(date);

        const needLoadSymbols: string[] = [];
        forEach(selectedMarketCat.symbols, (symbol: string) => {
          if (!MarketIntraDay.loadingInfo.hasOwnProperty(symbol)) {
            MarketIntraDay.loadingInfo[symbol] = {
              loaded: false,
              isLoading: false,
            };
          }

          if (
            !MarketIntraDay.loadingInfo[symbol].loaded &&
            !MarketIntraDay.loadingInfo[symbol].isLoading
          ) {
            needLoadSymbols.push(symbol);
          }
        });

        if (needLoadSymbols.length > 0) {
          MarketIntraDay.getLoadedTickObserver().next(undefined);
          const actions = arrayMap(needLoadSymbols, (symbol: string) =>
            ANALYSIS_ACTIONS.loadMarketIntraDayTick({ symbol }),
          );

          return from(actions);
        }
      }
      MarketIntraDay.log('=>> Skipping loading ticks data');
      MarketIntraDay.getLoadedTickObserver().next(undefined);
      return EMPTY;
    }),
  ),
);

export const loadMarketIntraDayTick$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadMarketIntraDayTick),
    groupBy((value) => value.payload.symbol),
    mergeMap((group) =>
      group.pipe(
        filter(
          (action) =>
            !MarketIntraDay.loadingInfo[action?.payload?.symbol]?.isLoading ||
            !MarketIntraDay.loadingInfo[action?.payload?.symbol]?.loaded,
        ),
        withLatestFrom(state$, (_i, state: IRootState) => [_i, state.analysis]),
        switchMap((d: any) => {
          const action: any = d[0];
          const analysisState: AnalysisState = d[1];
          const date = analysisState.toDate;
          const symbol = action.payload.symbol;
          MarketIntraDay.loadingInfo[symbol] = {
            isLoading: true,
            loaded: false,
          };
          MarketIntraDay.log(`Will load market tick data for symbol ${symbol}`);

          const url = `${
            process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL
          }/tick/histories-v2?symbol=${symbol}&from=${moment(date)
            .subtract(MarketIntraDay.BACK_DATE + 5, 'days')
            .format('YYYY-MM-DD')}&to=${date}`;

          return from(fetch(url)).pipe(
            switchMap((res) => from(res.json())),
            validateApiResponsePipe(),
            map((data: ApiResponse) => {
              if (data?.success === true) {
                MarketIntraDay.saveTick({ symbol, ticks: data.data });
                return ANALYSIS_ACTIONS.loadMarketIntraDayTickSuccess({
                  symbol,
                  data,
                });
              } else {
                return APP_ACTIONS.fetchApiError(data);
              }
            }),
            catchGeneralErrorPipe(),
          );
        }),
      ),
    ),
  ),
);
