import { StockTradingAnalysisRepo } from '@modules/stock-trading/repo/stock-trading-analysis.repo';
import { TradingStrategyRepo } from '@modules/stock-trading/repo/trading-strategy.repo';

export const STOCK_TRADING_REPO = [
  TradingStrategyRepo,
  StockTradingAnalysisRepo,
];
