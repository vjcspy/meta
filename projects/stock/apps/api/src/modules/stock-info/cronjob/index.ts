import { SyncPricesJob } from '@modules/stock-info/cronjob/sync-prices.job';
import { SyncTicksJob } from '@modules/stock-info/cronjob/sync-ticks.job';

export const CRONJOB_SERVICES = [SyncTicksJob, SyncPricesJob];
