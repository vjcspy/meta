import type { IntraDayTickInfo } from '@stock/packages-com';
import type { TimeResolution } from '@stock/packages-com/dist/tick/merge-by-res';
import { group_by_time_period } from '@stock/packages-com/dist/tick/merge-by-res';
import { filter, forEach, map, round, sortBy, values } from 'lodash-es';
import moment from 'moment/moment';

export type MarketIntraDayTickInfo = IntraDayTickInfo;

function resolveChartTicks(
  historyTicks: any[],
  tradeValue: number,
  timeRes: TimeResolution,
  tickDays: number,
) {
  const date = moment.utc();
  let historyData: Record<number, MarketIntraDayTickInfo> = {};
  const historyDataByTick: Record<
    string,
    Record<number, MarketIntraDayTickInfo>
  > = {};
  forEach(historyTicks, (tickDate: any) => {
    const meta = tickDate?.meta ?? [];
    const symbol = tickDate.symbol;

    if (!historyDataByTick.hasOwnProperty(symbol)) {
      historyDataByTick[symbol] = {};
    }

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

      if (!historyDataByTick[symbol].hasOwnProperty(ts)) {
        historyDataByTick[symbol][ts] = {
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
        const _value = tick.vol * tick.p;
        if (_value > tradeValue * 10 ** 6) {
          historyData[ts].shark_sell += _value;
          historyDataByTick[symbol][ts].shark_sell += _value;
        } else {
          historyData[ts].sheep_sell += _value;
          historyDataByTick[symbol][ts].sheep_sell += _value;
        }
      } else if (tick.a === 'B') {
        const _value = tick.vol * tick.p;
        if (_value > tradeValue * 10 ** 6) {
          historyData[ts].shark_buy += _value;
          historyDataByTick[symbol][ts].shark_buy += _value;
        } else {
          historyData[ts].sheep_buy += _value;
          historyDataByTick[symbol][ts].sheep_buy += _value;
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

  /* cộng dồn history data dần theo ts */
  historyData = sortBy(values(historyData), 'ts');
  forEach(historyData, (tickTime) => {
    sum_sheep_buy += tickTime.sheep_buy;
    sum_sheep_sell += tickTime.sheep_sell;
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

  historyData = map(historyData, (d) => {
    return {
      ts: d.ts,
      sheep_buy: round(d.sheep_buy / tickDays),
      sheep_sell: round(d.sheep_sell / tickDays),
      shark_buy: round(d.shark_buy / tickDays),
      shark_sell: round(d.shark_sell / tickDays),

      sum_sheep_buy: round(d.sum_sheep_buy / tickDays),
      sum_sheep_sell: round(d.sum_sheep_sell / tickDays),
      diff_sum_sheep: round(d.diff_sum_sheep / tickDays),
      sum_shark_buy: round(d.sum_shark_buy / tickDays),
      sum_shark_sell: round(d.sum_shark_sell / tickDays),
      diff_sum_shark: round(d.diff_sum_shark / tickDays),
    };
  });

  return { historyData, historyDataByTick };
}

export const calTickIntraDayData = (data: {
  ticks: {
    symbol: string;
    ticks: any;
  }[];
  timeRes: TimeResolution;
  tradeValue: number;
  date: string;
}) => {
  if (!Array.isArray(data.ticks) || data.ticks.length === 0) {
    return undefined;
  }

  const tickDays = data.ticks[0].ticks.length;

  const currentDate = moment(data.date);
  const historyTicks: any[] = [];
  const currentTicks: any[] = [];
  forEach(data.ticks, (symbolTick) => {
    const _hisTicks = filter(
      symbolTick.ticks,
      (_d) => !moment(_d.date).isSame(currentDate, 'day'),
    );

    historyTicks.push(..._hisTicks);

    const _currentTicks = filter(symbolTick.ticks, (_d) =>
      moment(_d.date).isSame(currentDate, 'day'),
    );

    currentTicks.push(..._currentTicks);
  });

  const historyIntraDayData = resolveChartTicks(
    historyTicks,
    data.tradeValue,
    data.timeRes,
    tickDays - 1,
  );

  const currentIntraDayData = resolveChartTicks(
    currentTicks,
    data.tradeValue,
    data.timeRes,
    1,
  );

  return {
    tradeValue: data.tradeValue,
    timeRes: data.timeRes,
    historyIntraDayData: historyIntraDayData.historyData,
    historyIntraDayDataByTick: historyIntraDayData.historyDataByTick,
    currentIntraDayData: currentIntraDayData.historyData,
    currentIntraDayDataByTick: currentIntraDayData.historyDataByTick,
  };
};
