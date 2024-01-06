import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { TickActionDayAnalyze } from '@modules/stock-trading/helper/tick-action-day-analyze';
import { TradingStrategyHelper } from '@modules/stock-trading/helper/trading-strategy.helper';

export const STOCK_TRADING_HELPERS = [
  TradingStrategyHelper,
  TickActionAnalyzeHelper,
  TickActionDayAnalyze,
];
