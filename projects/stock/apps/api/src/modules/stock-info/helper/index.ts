import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { SyncTicksHelper } from '@modules/stock-info/helper/sync-ticks.helper';
import { TickHelper } from '@modules/stock-info/helper/tick.helper';

export const STOCK_INFO_HELPERS = [
  SyncTicksHelper,
  StockPriceHelper,
  TickHelper,
];
