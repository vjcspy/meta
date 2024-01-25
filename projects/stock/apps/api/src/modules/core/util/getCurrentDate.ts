import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import * as momentTimezone from 'moment-timezone';

export const getCurrentDate = () => {
  return momentTimezone().tz(StockInfoValue.TIMEZONE).format('YYYY-MM-DD');
};
