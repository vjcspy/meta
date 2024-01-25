import { OrderMatchingType } from '@modules/stock-info/model/OrderMatching';
import { SYNC_ORDER_MATCHING } from '@modules/stock-info/observers/order-matching/om.actions';
import {
  STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_JOB_KEY,
  STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_QUEUE,
  STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { EventManagerReactive } from '@nest/base/dist';
import { RabbitSubscribe } from '@nest/rabbitmq/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AnalysisConsumer {
  constructor(private readonly eventManager: EventManagerReactive) {}

  @RabbitSubscribe({
    exchange: STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
    routingKey: STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_JOB_KEY,
    queue: STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_QUEUE,
    queueOptions: {
      durable: true,
    },
  })
  public async pubSubHandler(msg: any) {
    return new Promise((resolve) => {
      if (typeof msg === 'string') {
        this.eventManager.dispatch(
          SYNC_ORDER_MATCHING({
            code: msg,
            type: OrderMatchingType.HISTORY,
            force: true,
            resolve,
          }),
        );
      }
    });
  }
}
