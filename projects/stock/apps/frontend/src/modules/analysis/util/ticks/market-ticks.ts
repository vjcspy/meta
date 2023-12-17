import type { MarketTickChartDataType } from '@modules/analysis/util/ticks/calTickRangeData';
import { formatContext } from '@web/base/dist/lib/logger/console-template/format-content';
import { isSSR } from '@web/base/dist/util/isSSR';
import { difference, find, forEach, isNumber } from 'lodash-es';
import { debounceTime, ReplaySubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
export interface ResolveTickChartStatus {
  isFinish: boolean;
  message?: string;
}

/*
 * For publish resolve chart whenever
 * */
const resolveTickChart$ = new Subject<any>();

resolveTickChart$
  .pipe(
    debounceTime(500),
    filter(() => isNumber(MarketTicks.tickChartsTradeValue)),
  )
  .subscribe(() => {
    forEach(MarketTicks.ticks, (t, _index) => {
      MarketTicks.resolveTickChart(t.symbol);
    });
  });

/*
 * Emit an event after resolving each tick data for every symbol
 * */
const resolvedTickCart$ = new ReplaySubject();

export class MarketTicks {
  static DEBUG = false;
  static fromDate: string;
  static toDate: string;
  static loadingInfo: Record<
    string,
    {
      isLoading?: boolean;
      loaded?: boolean;
    }
  > = {};
  static ticks: { symbol: string; ticks: any }[] = [];

  /* ___________________________________ Calculate market ticks chart data ___________________________________*/
  static tickCharts: {
    symbol: string;
    tradeValue: number;
    data: MarketTickChartDataType[];
  }[] = [];

  /*
   Là ánh xạ từ analysis state trade value.
   Do tradeValue từ state có thể bị thay đổi thường xuyên nên cần có một giá trị tại thời điểm tính.
   Tick chart info hiện tại đang được tính dựa trên cái này
  */
  static tickChartsTradeValue: number;
  static resoleTickChartInfo: Record<
    string,
    { isResolvingTickChart?: boolean; isResolvedTickChart?: boolean }
  > = {};

  static setTicksDate(from: string, to: string) {
    if (MarketTicks.fromDate !== from || MarketTicks.toDate !== to) {
      MarketTicks.log(`=>> Will reset ticks data due to change date`);
      MarketTicks.fromDate = from;
      MarketTicks.toDate = to;
      MarketTicks.resetTicksData();
    }
  }

  static resetTicksData() {
    MarketTicks.ticks = [];
    MarketTicks.tickCharts = [];
    MarketTicks.loadingInfo = {};
  }

  private static _worker: Worker | undefined;
  static getWorker(): Worker | undefined {
    if (isSSR()) {
      return undefined;
    }

    if (!MarketTicks._worker) {
      MarketTicks._worker = new Worker(
        new URL(
          '@modules/analysis/workers/calTickRangeData.worker.ts',
          import.meta.url,
        ),
      );

      MarketTicks._worker.onmessage = (event: any) => {
        if (event?.data) {
          MarketTicks.log(`Received data from worker`);
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
          if (tradeValue === MarketTicks.tickChartsTradeValue) {
            // Sẽ có trường hợp đang chạy worker mà lại thay đổi trade value
            MarketTicks.tickCharts.push(event.data);
            MarketTicks.resoleTickChartInfo[symbol] = {
              isResolvedTickChart: true,
              isResolvingTickChart: false,
            };
            MarketTicks.log(
              `Resolved tick chart data for symbol ${symbol}`,
              MarketTicks.tickCharts,
            );
            resolvedTickCart$.next(undefined);
          }
        }
      };
      MarketTicks._worker.onerror = (event: any) => {
        console.error(
          `${formatContext(
            'MarketTicksWorker',
          )} There is an error with worker!`,
          event,
        );
      };
    }

    return MarketTicks._worker;
  }

  static resolveTickChart(symbol: any) {
    const tickData = find(MarketTicks.ticks, (t) => t?.symbol === symbol);

    if (!Array.isArray(tickData?.ticks) || tickData?.ticks.length === 0) {
      MarketTicks.log(
        `Skip resolve tick chart for symbol ${symbol} due to lack ticks data`,
      );
      return;
    }

    if (!isNumber(MarketTicks.tickChartsTradeValue)) {
      MarketTicks.log(
        `Skip resolve tick chart for symbol ${symbol} due to lack tradeValue data`,
      );
      return;
    }

    const resolvingInfo = MarketTicks.resoleTickChartInfo[symbol];

    if (
      resolvingInfo &&
      (resolvingInfo?.isResolvingTickChart ||
        resolvingInfo?.isResolvedTickChart)
    ) {
      MarketTicks.log(
        `Skip resolve tick chart for symbol ${symbol} due to resolve Info`,
        resolvingInfo,
      );
      return;
    } else {
      if (!resolvingInfo) {
        MarketTicks.resoleTickChartInfo[symbol] = {
          isResolvingTickChart: true,
        };
      } else {
        resolvingInfo.isResolvingTickChart = true;
      }

      const worker = MarketTicks.getWorker();

      if (worker) {
        MarketTicks.log(
          `Send request calculate market tick to worker for ${symbol} `,
        );

        worker.postMessage({
          ticks: tickData.ticks,
          symbol,
          tradeValue: MarketTicks.tickChartsTradeValue,
          viewByValue: true,
        });
      }
    }
  }

  static setMarketTickTradeValue(tradeValue: number) {
    if (MarketTicks.tickChartsTradeValue !== tradeValue) {
      MarketTicks.log(
        `=>> Will reset market ticks chart data due to change trade value`,
      );
      MarketTicks.tickChartsTradeValue = tradeValue;
      MarketTicks.resetMarketTicksData();
    }

    MarketTicks.publishResolveTickChartData();
  }

  static resetMarketTicksData() {
    MarketTicks.tickCharts = [];
    MarketTicks.resoleTickChartInfo = {};
  }

  /**
   * It's safe to call when ever
   */
  static publishResolveTickChartData() {
    MarketTicks.log(
      `Publish resolve all ticks chart data (it's safe to call whenever)`,
    );
    resolveTickChart$.next(undefined);

    /*
     * Vì sau khi resolve tick chart mới publish event,
     * mà có trường hợp tick đã load xong(và đã resolve xong chart data) nên sẽ không trigger,
     * do đó khi vào lại page sẽ không biết là đã resolved chart data
     * */
    resolvedTickCart$.next(undefined);
  }

  static getResolvedTickChartObserver() {
    return resolvedTickCart$;
  }

  static getResolveTickChartStatus(need: string[]): ResolveTickChartStatus {
    const diff = difference(
      need,
      MarketTicks.tickCharts.map((t) => t.symbol),
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

  static log(...agrs: any[]) {
    if (MarketTicks.DEBUG) {
      console.log(formatContext('MarketTicks'), ...agrs);
    }
  }
}
