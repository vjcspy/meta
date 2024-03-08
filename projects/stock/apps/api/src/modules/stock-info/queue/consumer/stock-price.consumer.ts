import { SyncSimpleStockPrice } from '@modules/stock-info/helper/sync-simple-stock-price';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { EventManagerReactive, XLogger } from '@nest/base';
import { RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockPriceConsumer {
  private readonly logger = new XLogger(StockPriceConsumer.name);

  constructor(
    private readonly eventManager: EventManagerReactive,
    private readonly syncSimpleStockPrice: SyncSimpleStockPrice,
  ) {}

  // @RabbitSubscribe({
  //   exchange: SyncValues.EXCHANGE_KEY,
  //   routingKey: SyncValues.STOCK_PRICE_SYNC_KEY,
  //   queue: `${SyncValues.STOCK_PRICE_SYNC_KEY}_QUEUE`,
  //   queueOptions: {
  //     durable: true,
  //   },
  // })
  // public async pubSubHandler(msg: any) {
  //   this.logger.info(`Got message ${JSON.stringify(msg)}`);
  //   return new Promise((resolve) => {
  //     if (typeof msg === 'object') {
  //       this.eventManager.dispatch(
  //         STOCK_PRICE_SYNC({
  //           code: msg.code,
  //           fromBeginning: msg.fromBeginning,
  //           resolve,
  //         }),
  //       );
  //       this.syncSimpleStockPrice.syncSimpleStockPrice(
  //         msg.code,
  //         msg.fromBeginning,
  //       );
  //     }
  //   });
  // }

  @RabbitSubscribe({
    exchange: SyncValues.EXCHANGE_KEY,
    routingKey: SyncValues.STOCK_PRICE_SYNC_KEY,
    queue: `${SyncValues.STOCK_PRICE_SYNC_KEY}_SIMPLE_QUEUE`,
    queueOptions: {
      durable: true,
    },
  })
  public async simpleSubHandler(msg: any) {
    this.logger.info(`Got message ${JSON.stringify(msg)}`);
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      if (typeof msg === 'object') {
        await this.syncSimpleStockPrice.syncSimpleStockPrice(
          msg.code,
          msg.fromBeginning,
        );
      }
      resolve(undefined);
    });
  }
}
