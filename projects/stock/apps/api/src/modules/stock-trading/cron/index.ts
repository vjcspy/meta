import { AlertsJob } from '@modules/stock-trading/cron/alerts.job';
import { TickActionJob } from '@modules/stock-trading/cron/tick-action.job';

export const STOCK_TRADING_CRONS = [AlertsJob, TickActionJob];
