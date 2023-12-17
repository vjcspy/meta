import { ANALYSIS_ACTIONS } from '@modules/analysis/store/analysis.actions';
import type { AnalysisState } from '@modules/analysis/store/analysis.state';
import { MarketIntraDay } from '@modules/analysis/util/ticks/market-intra-day';
import type { ApiResponse } from '@modules/app/type/api-response';
import type { IRootState } from '@src/store';
import { createEffect } from '@stock/packages-redux/src/createEffect';
import { ofType } from '@stock/packages-redux/src/ofType';
import { difference, map as arrayMap } from 'lodash-es';
import { debounceTime, EMPTY, from, map, mergeMap, tap } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';

export const loadMarketTickIntraDay$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadMarketIntraDay),
    debounceTime(1000),
    withLatestFrom(state$, (_i, state: IRootState) => [_i, state.analysis]),
    mergeMap((d: any) => {
      const analysisState: AnalysisState = d[1];
      const date = analysisState.toDate;
      const selectedMarketCat = analysisState.selectedMarketCat;

      if (
        Array.isArray(selectedMarketCat?.symbols) &&
        selectedMarketCat?.symbols.length > 0
      ) {
        MarketIntraDay.setTickDate(date);

        const needLoadSymbols = difference(
          selectedMarketCat.symbols,
          arrayMap(MarketIntraDay.ticks, (t: any) => t.symbol),
        );

        if (needLoadSymbols.length > 0) {
          const actions = arrayMap(needLoadSymbols, (symbol: string) =>
            ANALYSIS_ACTIONS.loadTickIntraDay({ symbol }),
          );

          return from(actions);
        }
      }

      return EMPTY;
    }),
  ),
);

export const tapLoadTickIntraDaySuccess = createEffect((action$, state$) =>
  action$.pipe(
    ofType(ANALYSIS_ACTIONS.loadTickIntraDaySuccess),
    tap((action) => {
      const data: ApiResponse = action.payload;
      const symbol = data?.data?.symbol;
      MarketIntraDay.loadingInfo[symbol] = {
        isLoading: false,
        loaded: true,
      };
      MarketIntraDay.ticks.push({ symbol, data: data.data });
      MarketIntraDay.log(
        `Loaded market tick intra-day ${symbol}`,
        MarketIntraDay.ticks,
      );
      MarketIntraDay.publishResolveTickChartData();
    }),
    map(() => EMPTY),
  ),
);
