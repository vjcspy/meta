import { OmMigrationHelper } from '@modules/migration/helper/om-migration.helper';
import {
  MIGRATE_EXCHANGE_KEY,
  MIGRATION_QUEUE_KEY,
  MIGRATION_QUEUE_ROUTING_KEY,
} from '@modules/migration/values/queue.value';
import { CorrelationType, xAppContext, XLogger } from '@nest/base';
import { RabbitSubscribe } from '@nest/rabbitmq/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OmMigrateConsumer {
  private readonly logger = new XLogger(OmMigrateConsumer.name);

  constructor(private readonly omMigrationHelper: OmMigrationHelper) {}

  @RabbitSubscribe({
    exchange: MIGRATE_EXCHANGE_KEY,
    routingKey: MIGRATION_QUEUE_ROUTING_KEY,
    queue: MIGRATION_QUEUE_KEY,
    queueOptions: {
      durable: true,
    },
  })
  async migrate(msg: any) {
    if (typeof msg === 'object') {
      try {
        xAppContext()
          .markAsUserContext(false)
          .refreshXCorrelationId(CorrelationType.CONSUMER);
        await this.omMigrationHelper.migrate(msg.symbol, msg.date);
      } catch (e) {
        this.logger.error('Error: migrate', e);
      }
    }
  }
}
