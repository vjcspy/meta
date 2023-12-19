import type { MarketIntraDayTickInfo } from '@modules/analysis/util/ticks/calTickIntraDayData';
import type { TimeResolution } from '@stock/packages-com/dist/tick/merge-by-res';
import { formatContext } from '@web/base/dist/lib/logger/console-template/format-content';
import { isSSR } from '@web/base/dist/util/isSSR';
import { filter, forEach, isNumber, orderBy, take } from 'lodash-es';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';

/* Trigger everytime load tick*/
const loadedTick$ = new BehaviorSubject<any>(undefined);

/*
 * Leverage observable to handle resolve chart data( for debounce,filter. etc...)
 * */
const triggerResolveChartData$ = new Subject<{
  date: string;
  tradeValue: number;
  timeRes: TimeResolution;
  symbols: string[];
}>();
triggerResolveChartData$.pipe(debounceTime(250)).subscribe((data) => {
  MarketIntraDay._resolveTickChartData(
    data.date,
    data.tradeValue,
    data.timeRes,
    data.symbols,
  );
});

/*
 * Ở view sẽ subscribe để biết lúc nào đã resolved chart data
 * */
const resolvedMarketIntraDayChart$ = new BehaviorSubject<any>(undefined);

export interface MarketIntraDayTickRecord {
  symbol: string;
  ticks: any;
}

export interface MarketIntraDayChartData {
  historyIntraDayData: MarketIntraDayTickInfo[];
  currentIntraDayData: MarketIntraDayTickInfo[];
  tradeValue: number;
  timeRes: TimeResolution;
}

export class MarketIntraDay {
  static DEBUG = true;
  static BACK_DATE = 3;
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
  static isResolveIntraDayChartData: boolean = false;
  static tickChartTradeValue: number;
  static tickChartTimeRes: TimeResolution;
  static marketIntraDayChartData: MarketIntraDayChartData | undefined;

  static log(...agrs: any[]) {
    if (MarketIntraDay.DEBUG) {
      console.log(formatContext(MarketIntraDay.name), ...agrs);
    }
  }

  static resetTicksData() {
    MarketIntraDay.log('=>> RESET all Market IntraDay data');
    MarketIntraDay.ticks = [];
    MarketIntraDay.marketIntraDayChartData = undefined;
    MarketIntraDay.loadingInfo = {};
    MarketIntraDay.isResolveIntraDayChartData = false;
    loadedTick$.next(undefined);
  }

  static saveTick(data: MarketIntraDayTickRecord) {
    MarketIntraDay.ticks = filter(
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
    return loadedTick$;
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

  static triggerResolveChartData(
    date: string,
    tradeValue: number,
    timeRes: TimeResolution,
    symbols: string[],
  ) {
    return triggerResolveChartData$.next({
      date,
      timeRes,
      tradeValue,
      symbols,
    });
  }

  static _resolveTickChartData(
    date: string,
    tradeValue: number,
    timeRes: TimeResolution,
    symbols: string[],
  ) {
    MarketIntraDay.log(
      `Check to resolveTickChartData (it's safe to call whenever)`,
    );

    let isLoadedFullTicks = true;

    forEach(symbols, (symbol) => {
      if (MarketIntraDay.loadingInfo[symbol]?.loaded !== true) {
        isLoadedFullTicks = false;
        return false;
      }
    });

    if (!isLoadedFullTicks) {
      MarketIntraDay.log(
        `=> Skipping resolveTickChartData due to not having loaded full tick data`,
      );
    }

    let needCalculate = false;
    if (
      MarketIntraDay.DATE !== date ||
      MarketIntraDay.tickChartTradeValue !== tradeValue ||
      MarketIntraDay.tickChartTimeRes !== timeRes
    ) {
      MarketIntraDay.log(
        `Will resolveTickChartData due to input values changed (date || tradeValue || timeRes)`,
      );
      needCalculate = true;
    } else {
      if (!MarketIntraDay.isResolveIntraDayChartData) {
        MarketIntraDay.log(
          `Will resolveTickChartData due to !isResolveIntraDayChartData`,
        );
        needCalculate = true;
      }
    }

    if (needCalculate) {
      // validate ticks data before send worker
      let length: number;
      MarketIntraDay.log(`Validating ticks before calculate chart data`);
      let hasError = false;

      MarketIntraDay.ticks = filter(MarketIntraDay.ticks, (d) =>
        symbols.includes(d.symbol),
      );

      forEach(MarketIntraDay.ticks, (value: MarketIntraDayTickRecord) => {
        if (!Array.isArray(value.ticks)) {
          hasError = true;
          console.error(`Tick Data for symbol ${value.symbol} is an array`);

          return;
        }

        if (!length) {
          length = value.ticks.length;
        }

        if (length !== value.ticks.length) {
          hasError = true;
          console.error(
            `Tick Data for symbol ${value.symbol} not valid length`,
            value,
            MarketIntraDay.ticks,
          );
        }

        if (value.ticks.length < MarketIntraDay.BACK_DATE + 1) {
          hasError = true;
          console.error(
            `Tick Data for symbol ${value.symbol} has not enough ${MarketIntraDay.BACK_DATE} days`,
            value,
          );
        }

        value.ticks = orderBy(value.ticks, (t) => t.date, 'desc');
        value.ticks = take(value.ticks, MarketIntraDay.BACK_DATE + 1);
      });

      if (hasError) {
        return;
      }

      /*
       * Trước khi tính thì lưu lại information,
       * nhưng vẫn có flag isResolveIntraDayChartData để biết là chưa resolve cho nhưng info này
       * */
      MarketIntraDay.tickChartTimeRes = timeRes;
      MarketIntraDay.tickChartTradeValue = tradeValue;
      MarketIntraDay.DATE = date;
      MarketIntraDay.isResolveIntraDayChartData = false;

      const payload = {
        ticks: MarketIntraDay.ticks,
        timeRes: MarketIntraDay.tickChartTimeRes,
        tradeValue: MarketIntraDay.tickChartTradeValue,
        date: MarketIntraDay.DATE,
      };

      MarketIntraDay.log(
        `=>> Send data to worker for calculating chart data`,
        payload,
      );
      MarketIntraDay.getWorker()?.postMessage(payload);
    }
  }

  static getWorker(): Worker | undefined {
    if (isSSR()) {
      return undefined;
    }

    if (!MarketIntraDay._worker) {
      MarketIntraDay._worker = new Worker(
        new URL(
          '@modules/analysis/workers/calTickIntraDayData.worker.ts',
          import.meta.url,
        ),
      );

      MarketIntraDay._worker.onmessage = (event: any) => {
        if (event?.data) {
          MarketIntraDay.log(`Received data from worker`);
          const tradeValue = event.data?.tradeValue;
          const timeRes = event.data?.timeRes;
          if (!isNumber(timeRes) || !isNumber(tradeValue)) {
            console.error(
              `${formatContext(
                'MarketTicksWorker',
              )} Wrong response data format from worker`,
            );

            return;
          }
          if (
            tradeValue === MarketIntraDay.tickChartTradeValue &&
            timeRes == MarketIntraDay.tickChartTimeRes
          ) {
            // Sẽ có trường hợp đang chạy worker mà lại thay đổi trade value || timeRes
            MarketIntraDay.marketIntraDayChartData = event.data;
            MarketIntraDay.log(
              `=>> Resolved Market intra-day chart data`,
              MarketIntraDay.marketIntraDayChartData,
            );
            MarketIntraDay.isResolveIntraDayChartData = true;
            resolvedMarketIntraDayChart$.next(undefined);
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
    return resolvedMarketIntraDayChart$.asObservable();
  }
}
