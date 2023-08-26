import { STOCK_PRICE_SYNC } from '@modules/stock-info/observers/stock-price/stock-price.actions';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { EventManagerReactive } from '@nest/base';
import { RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockPriceConsumer {
  constructor(private readonly eventManager: EventManagerReactive) {}

  @RabbitSubscribe({
    exchange: SyncValues.EXCHANGE_KEY,
    routingKey: SyncValues.STOCK_PRICE_SYNC_KEY,
    queue: `${SyncValues.STOCK_PRICE_SYNC_KEY}_QUEUE`,
    queueOptions: {
      durable: true,
    },
  })
  public async pubSubHandler(msg: any) {
    return new Promise((resolve) => {
      if (typeof msg === 'string') {
        this.eventManager.dispatch(
          STOCK_PRICE_SYNC({
            code: msg,
            resolve,
          }),
        );
      }
    });
  }
}