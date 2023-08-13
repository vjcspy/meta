import { actionFactory } from '@nest/base/dist/util/event-manager-rx/event-rx.factory';
import type * as moment from 'moment';

const STOCK_PRICES_START = 'STOCK_PRICES_START';
export const stockPricesStartAction = actionFactory<{
  code: string;
  resolve: any;
}>(STOCK_PRICES_START);

export const GET_STOCK_PRICE = actionFactory<{
  code: string;
  lastDate: moment.Moment;
  endDate: moment.Moment;
}>('GET_STOCK_PRICES');

export const SAVE_STOCK_PRICE =
  actionFactory<Record<string, any>>('SAVE_STOCK_PRICE');

export const STOCK_PRICE_FINISHED = actionFactory<{
  code: string;
}>('STOCK_PRICE_FINISHED');
