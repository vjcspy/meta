import { forEach } from 'lodash-es';
import type { Moment } from 'moment';
import moment from 'moment';

export enum TimeResolution {
  '1M' = 1,
  '3M' = 3,
  '5M' = 5,
  '15M' = 15,
  '30M' = 30,
}

export const group_by_time_period = (
  time: Moment,
  timeResolution: TimeResolution,
): Moment => {
  let timeMinute = time.minute();
  let timeHour = time.hour();
  const roundedMinute = Math.ceil(timeMinute / timeResolution) * timeResolution;

  if (roundedMinute >= 60) {
    // Tăng giờ lên một đơn vị và đặt phút về 0
    timeHour += 1;
    timeMinute = 0;

    // Nếu giờ vượt qua 23, chuyển sang ngày hôm sau
    if (timeHour > 23) {
      timeHour = 0;
      time.add(1, 'days');
    }
  } else {
    timeMinute = roundedMinute;
  }

  time.set({
    hour: timeHour,
    minute: timeMinute,
    second: 0,
  });

  return time;
};

const isValidTradeValue = (
  tick: any,
  tradeValue?: number | { min: number; max: number },
) => {
  if (!tradeValue) {
    return true;
  }

  if (typeof tradeValue === 'number') {
    return tick.p * tick.vol * 10 ** 6 >= tradeValue;
  }

  if (typeof tradeValue === 'object') {
    if (tradeValue.max >= 1000) {
      // eslint-disable-next-line no-param-reassign
      tradeValue.max = Infinity;
    }
    return (
      tick.p * tick.vol >= tradeValue.min * 10 ** 6 &&
      tick.p * tick.vol <= tradeValue.max * 10 ** 6
    );
  }

  return true;
};

export const mergeByRes = (
  ticks,
  date: Moment,
  res: TimeResolution = TimeResolution['1M'],
  tradeValue?: number | { min: number; max: number },
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
      if (!isValidTradeValue(tick, tradeValue)) {
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
        ...mergedRes[ts],
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
