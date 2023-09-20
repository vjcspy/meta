import { actionFactory } from '@nest/base';
import type { DataObject } from 'chitility';
import type * as moment from 'moment';

export const STOCK_PRICE_SYNC = actionFactory<{
  code: string;
  resolve: any;
}>('STOCK_PRICE_SYNC');

export const STOCK_PRICE_LOAD = actionFactory<{
  code: string;
  lastDate?: moment.Moment;
  endDate?: moment.Moment;
}>('STOCK_PRICE_LOAD');

export const STOCK_PRICE_SAVE = actionFactory<{
  code: string;
  data: DataObject;
}>('STOCK_PRICE_SAVE');

export const STOCK_PRICE_FINISHED = actionFactory<{
  code: string;
}>('STOCK_PRICE_FINISHED');

export const STOCK_PRICE_ERROR = actionFactory<{
  code: string;
  error: Error;
}>('STOCK_PRICE_ERROR');
