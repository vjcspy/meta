import { OrderMatchingHistoryConsumer } from '@modules/stock-info/queue/consumer/order-matching-history.consumer';
import { OrderMatchingInvestorConsumer } from '@modules/stock-info/queue/consumer/order-matching-investor.consumer';
import { StockPriceConsumer } from '@modules/stock-info/queue/consumer/stock-price.consumer';
import { OrderMatchingPublisher } from '@modules/stock-info/queue/publisher/order-matching.publisher';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { SyncTicksPublisher } from '@modules/stock-info/queue/publisher/sync-ticks.publisher';

export const QUEUE_PUBLISHER = [
  OrderMatchingPublisher,
  StockPricePublisher,
  SyncTicksPublisher,
];

export const QUEUE_CONSUMERS = [
  OrderMatchingHistoryConsumer,
  OrderMatchingInvestorConsumer,
  StockPriceConsumer,
];
