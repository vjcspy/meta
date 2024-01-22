import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { TickActionDayAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-day-analyze.helper';
import { TradingStrategyHelper } from '@modules/stock-trading/helper/trading-strategy.helper';

export const STOCK_TRADING_HELPERS = [
  TradingStrategyHelper,
  TickActionAnalyzeHelper,
  TickActionDayAnalyzeHelper,
];
