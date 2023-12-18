import type { ResolveTickChartStatus } from '@modules/analysis/util/ticks/market-ticks';
import type { TimeResolution } from '@stock/packages-com/dist/tick/merge-by-res';
import { formatContext } from '@web/base/dist/lib/logger/console-template/format-content';
import { isSSR } from '@web/base/dist/util/isSSR';
import {
  difference,
  filter as lodashFilter,
  forEach,
  isNumber,
} from 'lodash-es';
import { ReplaySubject, Subject } from 'rxjs';

const loadedTick$ = new Subject<any>();

const resolveTickChart$ = new Subject<any>();
const resolvedTickChart$ = new ReplaySubject();

export interface MarketIntraDayTickRecord {
  symbol: string;
  ticks: any;
}

export class MarketIntraDay {
  static DEBUG = true;
  static BACK_DATE = 7;
  private static _worker: Worker | undefined;

  /* ___________________________________ Market Tick Data ___________________________________ */
  static DATE: string;
  static loadingInfo: Record<
    string,
    {
      isLoading?: boolean;
      loaded?: boolean;
    }
  > = {};
  static ticks: MarketIntraDayTickRecord[] = [];

  /* ___________________________________ Calculate market ticks chart data ___________________________________ */
  static tickCharts: {
    symbol: string;
    tradeValue: number;
    data: any;
  }[] = [];

  static tickChartTradeValue: number;
  static tickChartTimeRes: TimeResolution;
  static resoleTickChartInfo: Record<
    string,
    { isResolvingTickChart?: boolean; isResolvedTickChart?: boolean }
  > = {};

  static log(...agrs: any[]) {
    if (MarketIntraDay.DEBUG) {
      console.log(formatContext(MarketIntraDay.name), ...agrs);
    }
  }

  static resetTicksData() {
    MarketIntraDay.ticks = [];
    MarketIntraDay.tickCharts = [];
    MarketIntraDay.loadingInfo = {};
    MarketIntraDay.resoleTickChartInfo = {};
  }

  static saveTick(data: MarketIntraDayTickRecord) {
    MarketIntraDay.ticks = lodashFilter(
      MarketIntraDay.ticks,
      (t) => t.symbol !== data.symbol,
    );
    MarketIntraDay.loadingInfo[data.symbol] = {
      isLoading: false,
      loaded: true,
    };
    MarketIntraDay.ticks.push(data);
    loadedTick$.next(data.symbol);
    MarketIntraDay.log(
      `Loaded market ticks ${data.symbol}`,
      MarketIntraDay.ticks,
    );
  }

  static getLoadedTickObserver() {
    return loadedTick$.asObservable();
  }

  static isLoadedFullTicks(needed: string[]) {
    let isFull = true;
    forEach(needed, (symbol: string) => {
      if (MarketIntraDay.loadingInfo[symbol]?.loaded !== true) {
        isFull = false;

        return false;
      }
    });

    return isFull;
  }

  static setTickDate(date: string) {
    if (MarketIntraDay.DATE !== date) {
      MarketIntraDay.log(`=>> Will reset ticks data due to change date`);
      MarketIntraDay.DATE = date;
      MarketIntraDay.resetTicksData();
    }
  }

  static publishResolveTickChartData() {
    MarketIntraDay.log(
      `Publish resolve all ticks chart data (it's safe to call whenever)`,
    );
    resolveTickChart$.next(undefined);

    /*
     * Vì sau khi resolve tick chart mới publish event,
     * mà có trường hợp tick đã load xong(và đã resolve xong chart data) nên sẽ không trigger,
     * do đó khi vào lại page sẽ không biết là đã resolved chart data
     * */
    resolvedTickChart$.next(undefined);
  }

  static getWorker(): Worker | undefined {
    if (isSSR()) {
      return undefined;
    }

    if (!MarketIntraDay._worker) {
      MarketIntraDay._worker = new Worker(
        new URL(
          '@modules/analysis/workers/calTickRangeData.worker.ts',
          import.meta.url,
        ),
      );

      MarketIntraDay._worker.onmessage = (event: any) => {
        if (event?.data) {
          MarketIntraDay.log(`Received data from worker`);
          const symbol = event.data?.symbol;
          const tradeValue = event.data?.tradeValue;
          if (!symbol || !isNumber(tradeValue)) {
            console.error(
              `${formatContext(
                'MarketTicksWorker',
              )} Wrong response data format from worker`,
            );

            return;
          }
          if (tradeValue === MarketIntraDay.tickChartTradeValue) {
            // Sẽ có trường hợp đang chạy worker mà lại thay đổi trade value
            MarketIntraDay.tickCharts.push(event.data);
            MarketIntraDay.resoleTickChartInfo[symbol] = {
              isResolvedTickChart: true,
              isResolvingTickChart: false,
            };
            MarketIntraDay.log(
              `Resolved tick chart data for symbol ${symbol}`,
              MarketIntraDay.tickCharts,
            );
            resolvedTickChart$.next(undefined);
          }
        }
      };
      MarketIntraDay._worker.onerror = (event: any) => {
        console.error(
          `${formatContext(
            'MarketTicksWorker',
          )} There is an error with worker!`,
          event,
        );
      };
    }

    return MarketIntraDay._worker;
  }

  static getResolvedTickChartObserver() {
    return resolvedTickChart$;
  }

  static getResolveTickChartStatus(need: string[]): ResolveTickChartStatus {
    const diff = difference(
      need,
      MarketIntraDay.tickCharts.map((t) => t.symbol),
    );
    if (diff.length > 0) {
      return {
        isFinish: false,
        message: `Remaining ${diff.length} symbols to calculate`,
      };
    }

    return {
      isFinish: true,
      message: '',
    };
  }
}
