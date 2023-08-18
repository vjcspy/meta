import { OrderMatchingType } from '@modules/stock-info/model/OrderMatching';
import { SYNC_ORDER_MATCHING } from '@modules/stock-info/observers/order-matching/om.actions';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { EventManagerReactive } from '@nest/base/dist/util/event-manager-rx/EventManager';
import { RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderMatchingInvestorConsumer {
  constructor(private readonly eventManager: EventManagerReactive) {}

  @RabbitSubscribe({
    exchange: SyncValues.EXCHANGE_KEY,
    routingKey: SyncValues.ORDER_MATCHING_KEY,
    queue: `${SyncValues.ORDER_MATCHING_KEY}_INVESTOR_QUEUE`,
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
            type: OrderMatchingType.INVESTOR,
            force: true,
            resolve,
          }),
        );
      }
    });
  }
}
