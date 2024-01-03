import { forEach, keys, sortBy, values } from 'lodash-es';
import moment from 'moment';

import type { TimeResolution } from './merge-by-res';
import { group_by_time_period } from './merge-by-res';

const dataKeys = {
  shark_buy_count: 0,
  shark_sell_count: 0,
  sheep_buy_count: 0,
  sheep_sell_count: 0,
  shark_buy_value: 0,
  shark_sell_value: 0,
  sheep_buy_value: 0,
  sheep_sell_value: 0,
  buy_count: 0,
  sell_count: 0,
  buy_value: 0,
  sell_value: 0,
};

export const mergeTickActionInfo = (
  infoData: any[],
  timeRes: TimeResolution,
) => {
  let groupedData = {};
  forEach(infoData, (d: any) => {
    const groupedTime = group_by_time_period(moment.unix(d.ts), timeRes);
    const ts = groupedTime.unix();
    if (!groupedData.hasOwnProperty(ts)) {
      groupedData[ts] = {
        ts,
        price: d.price,

        shark_buy_count: 0,
        shark_sell_count: 0,
        sheep_buy_count: 0,
        sheep_sell_count: 0,
        shark_buy_value: 0,
        shark_sell_value: 0,
        sheep_buy_value: 0,
        sheep_sell_value: 0,
        buy_count: 0,
        sell_count: 0,
        buy_value: 0,
        sell_value: 0,
      };
    }

    forEach(keys(dataKeys), (value) => {
      groupedData[ts][value] += d[value];
    });
  });

  groupedData = sortBy(values(groupedData), 'ts');

  return groupedData;
};
