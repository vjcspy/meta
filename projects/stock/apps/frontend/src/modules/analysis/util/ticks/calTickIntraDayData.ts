import type { TimeResolution } from '@stock/packages-com/dist/tick/merge-by-res';
import { group_by_time_period } from '@stock/packages-com/dist/tick/merge-by-res';
import { first, forEach, orderBy, sortBy, tail, values } from 'lodash-es';
import moment from 'moment/moment';
import {MarketIntraDayTickRecord} from "@modules/analysis/util/ticks/market-intra-day";

export interface MarketIntraDayTickInfo {
  ts: number;
  sheep_buy: number;
  sheep_sell: number;
  shark_buy: number;
  shark_sell: number;

  sum_sheep_buy: number;
  sum_sheep_sell: number;
  diff_sum_sheep: number;
  sum_shark_buy: number;
  sum_shark_sell: number;
  diff_sum_shark: number;
}

function resolveChartTicks(
  historyTicks: any[],
  tradeValue: number,
  timeRes: TimeResolution,
) {
  const date = moment.utc();
  let historyData: Record<number, MarketIntraDayTickInfo> = {};
  forEach(historyTicks, (tickDate: any) => {
    let meta = tickDate?.meta ?? [];
    meta = sortBy(meta, 'time');

    forEach(meta, (tick: any) => {
      const timeString = tick.time;
      date.set({
        hour: moment(timeString, 'HH:mm:ss').hour(),
        minute: moment(timeString, 'HH:mm:ss').minute(),
        second: moment(timeString, 'HH:mm:ss').second(),
      });
      const roundedTime = group_by_time_period(date, timeRes);
      const ts = roundedTime.unix();

      if (!historyData.hasOwnProperty(ts)) {
        historyData[ts] = {
          ts,
          shark_buy: 0,
          shark_sell: 0,
          sheep_buy: 0,
          sheep_sell: 0,

          sum_sheep_buy: 0,
          sum_shark_buy: 0,
          sum_shark_sell: 0,
          sum_sheep_sell: 0,
          diff_sum_shark: 0,
          diff_sum_sheep: 0,
        };
      }
      if (tick.a === 'S') {
        if (tick.vol * tick.p > tradeValue * 10 ** 6) {
          historyData[ts].shark_sell += tick.vol * tick.p;
        } else {
          historyData[ts].sheep_sell += tick.vol * tick.p;
        }
      } else if (tick.a === 'B') {
        if (tick.vol * tick.p > tradeValue * 10 ** 6) {
          historyData[ts].shark_buy += tick.vol * tick.p;
        } else {
          historyData[ts].sheep_buy += tick.vol * tick.p;
        }
      }
    });
  });
  let sum_sheep_buy = 0;
  let sum_sheep_sell = 0;
  let diff_sum_sheep = 0;
  let sum_shark_buy = 0;
  let sum_shark_sell = 0;
  let diff_sum_shark = 0;
  historyData = sortBy(values(historyData), 'ts');
  forEach(historyData, (tickTime) => {
    sum_sheep_buy += tickTime.sheep_buy;
    sum_sheep_sell += tickTime.shark_sell;
    diff_sum_sheep = sum_sheep_buy - sum_sheep_sell;
    sum_shark_buy += tickTime.shark_buy;
    sum_shark_sell += tickTime.shark_sell;
    diff_sum_shark = sum_shark_buy - sum_shark_sell;

    tickTime.sum_sheep_buy = sum_sheep_buy;
    tickTime.sum_sheep_sell = sum_sheep_sell;
    tickTime.diff_sum_sheep = diff_sum_sheep;
    tickTime.sum_shark_buy = sum_shark_buy;
    tickTime.sum_shark_sell = sum_shark_sell;
    tickTime.diff_sum_shark = diff_sum_shark;
  });

  return historyData;
}

export const calTickIntraDayData = (data: {
  ticks: MarketIntraDayTickRecord[];
  timeRes: TimeResolution;
  tradeValue: number;
}) => {
  // @ts-ignore
  if (Array.isArray(data.ticks) || data.ticks.length === 0) {
    return undefined;
  }

  const ticks = orderBy(data.ticks, (tick: any) => tick.date, 'desc');

  const historyTicks = tail(ticks);
  const historyIntraDayData = resolveChartTicks(
    historyTicks,
    data.tradeValue,
    data.timeRes,
  );

  const currentTicks = first(ticks);
  const currentIntraDayData = resolveChartTicks(
    currentTicks,
    data.tradeValue,
    data.timeRes,
  );

  return {
    historyIntraDayData,
    currentIntraDayData,
  };
};
