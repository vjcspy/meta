import { formatContext } from '@web/base/dist/lib/logger/console-template/format-content';
import { isSSR } from '@web/base/dist/util/isSSR';
import { delay, difference, find, forEach, isNumber, random } from 'lodash-es';
import { debounceTime, ReplaySubject, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

const resolveTickChart$ = new Subject<any>();

resolveTickChart$
  .pipe(
    debounceTime(500),
    filter(() => isNumber(MarketTicks.tickChartsTradeValue)),
  )
  .subscribe(() => {
    forEach(MarketTicks.ticks, (t, index) => {
      delay(
        () => {
          MarketTicks.resolveTickChart(t.symbol);
        },
        random(50, 150) * index,
      );
    });
  });

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

  /* Calculate market ticks chart data*/
  static tickCharts: { symbol: string; tradeValue: number; data: any }[] = [];

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
    resolvedTickCart$.next(undefined);
  }

  static getResolvedTickChartObserver() {
    return resolvedTickCart$;
  }

  static getResolveTickChartStatus(need: string[]): {
    isFinish: boolean;
    message?: string;
  } {
    const diff = difference(
      need,
      MarketTicks.tickCharts.map((t) => t.symbol),
    );
    console.log('=>>>>>>>>>>> diff', diff);
    if (diff.length > 0) {
      return {
        isFinish: false,
        message: `Calculating market tick for ${diff.length} symbols`,
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
