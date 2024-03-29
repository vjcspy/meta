import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import type { AnalysisState } from '@modules/analysis/store/analysis.state';
import { MarketTicks } from '@modules/analysis/util/ticks/market-ticks';
import { APP_ACTIONS } from '@modules/app/store/app.actions';
import type { ApiResponse } from '@modules/app/type/api-response';
import { catchGeneralErrorPipe } from '@modules/app/util/pipe/catchGeneralError';
import { validateApiResponsePipe } from '@modules/app/util/pipe/validateApiResponseRx';
import type { IRootState } from '@src/store';
import { createEffect } from '@stock/packages-redux/src/createEffect';
import { ofType } from '@stock/packages-redux/src/ofType';
import { forEach, map as arrayMap } from 'lodash-es';
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

export const loadMarketTicks$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadMarketTicks),
    debounceTime(1000),
    withLatestFrom(state$, (_i, state: IRootState) => [_i, state.analysis]),
    mergeMap((d: any) => {
      const analysisState: AnalysisState = d[1];
      const { marketFromDate, marketToDate } = analysisState;
      const selectedMarketCat = analysisState.selectedMarketCat;
      if (
        selectedMarketCat &&
        Array.isArray(selectedMarketCat?.symbols) &&
        selectedMarketCat.symbols.length > 0
      ) {
        MarketTicks.setTicksDate(marketFromDate, marketToDate);

        const needLoadSymbols: string[] = [];
        forEach(selectedMarketCat.symbols, (symbol: string) => {
          if (
            MarketTicks.loadingInfo[symbol]?.loaded !== true &&
            MarketTicks.loadingInfo[symbol]?.isLoading !== true
          ) {
            needLoadSymbols.push(symbol);
          }
        });

        if (needLoadSymbols.length > 0) {
          const actions = arrayMap(needLoadSymbols, (symbol: string) =>
            ANALYSIS_ACTIONS.loadMarketSymbolTick({ symbol }),
          );

          return from(actions);
        }
      }

      return EMPTY;
    }),
  ),
);

export const loadMarketSymbolTick$ = createEffect((action$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadMarketSymbolTick),
    groupBy((value) => value.payload.symbol),
    mergeMap((group) =>
      group.pipe(
        filter(
          (action) =>
            !MarketTicks.loadingInfo[action?.payload?.symbol]?.isLoading ||
            !MarketTicks.loadingInfo[action?.payload?.symbol]?.loaded,
        ),
        switchMap((action) => {
          const symbol = action.payload.symbol;
          MarketTicks.loadingInfo[symbol] = { isLoading: true, loaded: false };
          MarketTicks.log(`Will load market tick data for symbol ${symbol}`);

          const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/tick/histories-v2?symbol=${symbol}&from=${MarketTicks.fromDate}&to=${MarketTicks.toDate}`;

          return from(fetch(url)).pipe(
            switchMap((res) => from(res.json())),
            validateApiResponsePipe(),
            map((data: ApiResponse) => {
              if (data?.success === true) {
                MarketTicks.saveTick({ symbol, ticks: data.data });
                return ANALYSIS_ACTIONS.loadMarketSymbolTickSuccess({
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

export const loadVNIndex$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(
      ANALYSIS_ACTIONS.loadVNINDEX,
      ANALYSIS_ACTIONS.setMarketToDate,
      ANALYSIS_ACTIONS.setMarketFromDate,
    ),
    debounceTime(500),
    withLatestFrom(state$, (_i, state: IRootState) => [_i, state.analysis]),
    mergeMap((d: any) => {
      const analysisState: AnalysisState = d[1];
      const { marketFromDate, marketToDate } = analysisState;

      const url = `${process.env.NEXT_PUBLIC_ENDPOINT_LIVE_URL}/stock-price/simple-histories?code=VNINDEX&from=${marketFromDate}&to=${marketToDate}`;

      return from(fetch(url)).pipe(
        switchMap((res) => from(res.json())),
        validateApiResponsePipe(),
        map((data: ApiResponse) => {
          if (data?.success === true) {
            return ANALYSIS_ACTIONS.loadVNINDEXSuccess(data);
          } else {
            return APP_ACTIONS.fetchApiError(data);
          }
        }),
        catchGeneralErrorPipe(),
      );
    }),
  ),
);
