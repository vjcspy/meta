import { SyncTicksHelper } from '@modules/stock-info/helper/sync-ticks.helper';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { XLogger } from '@nest/base/dist';
import { RabbitSubscribe } from '@nest/rabbitmq';
import { Nack } from '@nest/rabbitmq/dist/model/amqp/handler-response';
import { Injectable } from '@nestjs/common';

@Injectable()
export class SyncTicksConsumer {
  private readonly logger = new XLogger(SyncTicksConsumer.name);

  constructor(private syncTicksHelper: SyncTicksHelper) {}

  @RabbitSubscribe({
    exchange: SyncValues.SYNC_TICKS_EXCHANGE_KEY,
    routingKey: SyncValues.SYNC_TICKS_ROUTING_KEY,
    queue: SyncValues.SYNC_TICKS_QUEUE,
    queueOptions: {
      durable: true,
    },
  })
  public async pubSubHandler(msg: any) {
    try {
      if (typeof msg === 'string') {
        await this.syncTicksHelper.syncTicks(msg);
      }
    } catch (e) {
      this.logger.info(`Requeue for ${msg}`);
      return new Nack(true);
    }
  }
}
