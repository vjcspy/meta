import { forEach } from 'lodash';
import type { Moment } from 'moment';
import moment from 'moment';

export enum TimeResolution {
  '1M' = 1,
  '3M' = 3,
  '5M' = 5,
  '15M' = 15,
  '30M' = 30,
}

const group_by_time_period = (
  time: Moment,
  timeResolution: TimeResolution,
): Moment => {
  const timeMinute = time.minutes();
  // eslint-disable-next-line no-bitwise
  const roundedMinute =
    parseInt(`${timeMinute / timeResolution}`) * timeResolution;
  time.set({
    minute: roundedMinute,
  });
  return time;
};

const isValidTradeValue = (tick: any, tradeValue?: number) => {
  return !tradeValue || tick.p * tick.vol * 10 ** 6 >= tradeValue;
};

export const mergeByRes = (
  ticks,
  date: Moment,
  res: TimeResolution = TimeResolution['1M'],
  tradeValue?: number,
): any[] => {
  const mergedRes = {};
  forEach(ticks, (tick: any) => {
    const timeString = tick.time;
    date.set({
      hour: moment(timeString, 'HH:mm:ss').hour(),
      minute: moment(timeString, 'HH:mm:ss').minute(),
      second: moment(timeString, 'HH:mm:ss').second(),
    });
    const roundedTime = group_by_time_period(date, res);
    const ts = roundedTime.unix();
    if (mergedRes[ts]) {
      if (isValidTradeValue(tick, tradeValue)) {
        return;
      }

      // eslint-disable-next-line prefer-const
      let { buy, sell, oc, buyVal, sellVal, ocVal } = mergedRes[ts];
      if (tick.a === 'B') {
        buy += tick.vol;
        buyVal += tick.vol * tick.p;
      } else if (tick.a === 'S') {
        sell += tick.vol;
        sellVal += tick.vol * tick.p;
      } else if (tick.a === 'Undefined') {
        oc += tick.vol;
        ocVal += tick.vol * tick.p;
      } else {
        throw new Error('Wrong format tick data');
      }
      mergedRes[ts] = {
        buy,
        sell,
        oc,
        ts,
        buyVal,
        sellVal,
        ocVal,
      };
    } else {
      mergedRes[ts] = {
        open: tick.p,
        buy:
          tick.a === 'B' && isValidTradeValue(tick, tradeValue) ? tick.vol : 0,
        sell:
          tick.a === 'S' && isValidTradeValue(tick, tradeValue) ? tick.vol : 0,
        oc:
          tick.a === 'Undefined' && isValidTradeValue(tick, tradeValue)
            ? tick.vol
            : 0,
        ts,
        buyVal:
          tick.a === 'B' && isValidTradeValue(tick, tradeValue)
            ? tick.vol * tick.p
            : 0,
        sellVal:
          tick.a === 'S' && isValidTradeValue(tick, tradeValue)
            ? tick.vol * tick.p
            : 0,
        ocVal:
          tick.a === 'Undefined' && isValidTradeValue(tick, tradeValue)
            ? tick.vol * tick.p
            : 0,
      };
    }
  });

  return Object.values(mergedRes);
};
