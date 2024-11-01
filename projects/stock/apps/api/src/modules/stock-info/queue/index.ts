import { StockPriceConsumer } from '@modules/stock-info/queue/consumer/stock-price.consumer';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { SyncTicksPublisher } from '@modules/stock-info/queue/publisher/sync-ticks.publisher';

export const QUEUE_PUBLISHER = [StockPricePublisher, SyncTicksPublisher];

export const QUEUE_CONSUMERS = [StockPriceConsumer];
