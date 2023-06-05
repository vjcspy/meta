import { OrderMatchingHistoryConsumer } from '@modules/stock-info/queue/consumer/order-matching-history.consumer';
import { OrderMatchingInvestorConsumer } from '@modules/stock-info/queue/consumer/order-matching-investor.consumer';
import { OrderMatchingPublisher } from '@modules/stock-info/queue/publisher/order-matching.publisher';

export const QUEUE_PUBLISHER = [OrderMatchingPublisher];

export const QUEUE_CONSUMERS = [
  OrderMatchingHistoryConsumer,
  OrderMatchingInvestorConsumer,
];
