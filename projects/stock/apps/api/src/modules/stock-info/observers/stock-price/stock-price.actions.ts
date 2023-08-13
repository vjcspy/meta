import { actionFactory } from '@nest/base/dist/util/event-manager-rx/event-rx.factory';
import type * as moment from 'moment';

export const STOCK_PRICE_SYNC = actionFactory<{
  code: string;
  resolve: any;
}>('STOCK_PRICE_SYNC');

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
