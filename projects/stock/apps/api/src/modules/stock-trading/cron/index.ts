import { AlertsJob } from '@modules/stock-trading/cron/alerts.job';
import { StockTradingAnalysisJob } from '@modules/stock-trading/cron/stock-trading-analysis.job';

export const STOCK_TRADING_CRONS = [AlertsJob, StockTradingAnalysisJob];
