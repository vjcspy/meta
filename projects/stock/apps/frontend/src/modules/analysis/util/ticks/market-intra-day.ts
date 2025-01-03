import type { MarketIntraDayTickInfo } from '@modules/analysis/util/ticks/calTickIntraDayData';
import type { TimeResolution } from '@stock/packages-com/dist/tick/merge-by-res';
import { formatContext } from '@web/base/dist/lib/logger/console-template/format-content';
import { isSSR } from '@web/base/dist/util/isSSR';
import {
  difference,
  filter,
  first,
  forEach,
  isNumber,
  orderBy,
  take,
} from 'lodash-es';
import { BehaviorSubject, debounceTime, Subject } from 'rxjs';

/* Trigger everytime load tick*/
const loadedTick$ = new BehaviorSubject<any>(undefined);

/*
 * Leverage observable to handle resolve chart data( for debounce,filter. etc...)
 * Gọi để trigger resolve chart data
 * */
const triggerResolveChartData$ = new Subject<{
  date: string;
  tradeValue: number;
  timeRes: TimeResolution;
  symbols: string[];
}>();
triggerResolveChartData$.pipe(debounceTime(250)).subscribe((data) => {
  MarketIntraDay._resolveTickChartData(
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
  analysis: {
    symbol: string;
    date: string;
    deal_value_5: number;
  };
}

export interface MarketIntraDayResolvedChartInfo {
  isResolved: boolean;
  isLoading?: boolean;
  symbols: string[];
}

export interface MarketIntraDayChartData {
  historyIntraDayData: MarketIntraDayTickInfo[];
  currentIntraDayData: MarketIntraDayTickInfo[];
  historyIntraDayDataByTick: Record<string, MarketIntraDayTickInfo[]>;
  currentIntraDayDataByTick: Record<string, MarketIntraDayTickInfo[]>;
  tradeValue: number;
  timeRes: TimeResolution;
}

export class MarketIntraDay {
  static DEBUG = false;
  static BACK_DATE = 3;
  private static _worker: Worker | undefined;

  /* ___________________________________ Market Tick Data ___________________________________ */
  private static DATE: string;
  static loadingInfo: Record<
    string,
    {
      isLoading?: boolean;
      loaded?: boolean;
    }
  > = {};
  static ticks: MarketIntraDayTickRecord[] = [];

  /* ___________________________________ Calculate market ticks chart data ___________________________________ */
  static isResolveIntraDayChartData: MarketIntraDayResolvedChartInfo = {
    isResolved: false,
    symbols: [],
  };
  static tickChartTradeValue: number;
  static tickChartTimeRes: TimeResolution;
  static marketIntraDayChartData: MarketIntraDayChartData | undefined;

  static log(...agrs: any[]) {
    if (MarketIntraDay.DEBUG) {
      console.log(formatContext(MarketIntraDay.name), ...agrs);
    }
  }

  static resetTicksData() {
    MarketIntraDay.log('=>> RESET all Market Tick IntraDay data');
    MarketIntraDay.ticks = [];
    MarketIntraDay.marketIntraDayChartData = undefined;
    MarketIntraDay.loadingInfo = {};
    MarketIntraDay.isResolveIntraDayChartData = {
      isResolved: false,
      symbols: [],
    };
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
    MarketIntraDay.getLoadedTickObserver().next(data.symbol);
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
    let notLoaded: number = 0;
    forEach(needed, (symbol: string) => {
      if (MarketIntraDay.loadingInfo[symbol]?.loaded !== true) {
        isFull = false;

        notLoaded++;
      }
    });

    return { isFull, notLoaded };
  }

  static setTickDate(date: string) {
    if (MarketIntraDay.DATE !== date) {
      MarketIntraDay.log(`=>> Will reset ticks data due to change date`);
      MarketIntraDay.DATE = date;
      MarketIntraDay.resetTicksData();
    }
  }

  static triggerResolveChartData(
    tradeValue: number,
    timeRes: TimeResolution,
    symbols: string[],
  ) {
    return triggerResolveChartData$.next({
      date: MarketIntraDay.DATE,
      timeRes,
      tradeValue,
      symbols,
    });
  }

  static _resolveTickChartData(
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

    if (!isLoadedFullTicks || MarketIntraDay.ticks.length === 0) {
      MarketIntraDay.log(
        `=> Skipping resolveTickChartData due to not having loaded full tick data`,
      );
      return;
    }

    let needCalculate = false;
    if (
      MarketIntraDay.tickChartTradeValue !== tradeValue ||
      MarketIntraDay.tickChartTimeRes !== timeRes
    ) {
      MarketIntraDay.log(
        `Will resolveTickChartData due to input values changed (tradeValue || timeRes)`,
      );
      needCalculate = true;
    } else {
      if (!MarketIntraDay.isResolveIntraDayChartData.isResolved) {
        MarketIntraDay.log(
          `Will resolveTickChartData due to !isResolveIntraDayChartData`,
        );
        needCalculate = true;
      } else {
        if (
          difference(symbols, MarketIntraDay.isResolveIntraDayChartData.symbols)
            .length > 0 ||
          difference(MarketIntraDay.isResolveIntraDayChartData.symbols, symbols)
            .length > 0
        ) {
          MarketIntraDay.log(
            `Will resolveTickChartData due to symbols changed`,
          );
          needCalculate = true;
        }
      }
    }

    if (!needCalculate) {
      MarketIntraDay.log(`=>> Skipping resolveTickChartData`);
      return;
    }

    MarketIntraDay.log(`Validating ticks before calculate chart data`);
    let hasError = false;

    const ticks = filter(MarketIntraDay.ticks, (d) =>
      symbols.includes(d.symbol),
    );
    // validate ticks data before send worker
    const length: number = first(ticks)?.ticks?.length;

    forEach(ticks, (value: MarketIntraDayTickRecord) => {
      if (!Array.isArray(value.ticks)) {
        hasError = true;
        console.error(`Tick Data for symbol ${value.symbol} is an array`);

        return;
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
    MarketIntraDay.isResolveIntraDayChartData = {
      isResolved: false,
      isLoading: true,
      symbols,
    };
    // Fire event for view known chart data is resolving
    resolvedMarketIntraDayChart$.next(undefined);

    const payload = {
      ticks: ticks,
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
            MarketIntraDay.isResolveIntraDayChartData.isResolved = true;
            MarketIntraDay.isResolveIntraDayChartData.isLoading = false;
            resolvedMarketIntraDayChart$.next(undefined);
          }
        }
      };
      MarketIntraDay._worker.onerror = (event: any) => {
        MarketIntraDay.isResolveIntraDayChartData.isLoading = false;
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
