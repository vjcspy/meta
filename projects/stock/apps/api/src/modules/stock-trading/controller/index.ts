import { AlertController } from '@modules/stock-trading/controller/alert.controller';
import { AnalysisController } from '@modules/stock-trading/controller/analysis.controller';
import { MarketTickActionController } from '@modules/stock-trading/controller/market-tick-action.controller';
import { StrategyController } from '@modules/stock-trading/controller/strategy.controller';

export const STOCK_TRADING_CONTROLLERS = [
  StrategyController,
  AnalysisController,
  AlertController,
  MarketTickActionController,
];
