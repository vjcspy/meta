import { OmMigrationHelper } from '@modules/migration/helper/om-migration.helper';
import {
  MIGRATE_EXCHANGE_KEY,
  MIGRATION_QUEUE_ROUTING_KEY,
} from '@modules/migration/values/queue.value';
import { AmqpConnectionManager } from '@nest/rabbitmq';
import { Controller, Get } from '@nestjs/common';

@Controller('migration')
export class MigrationController {
  constructor(
    private readonly omMigrationHelper: OmMigrationHelper,
    private readonly connectionManager: AmqpConnectionManager,
  ) {}

  @Get('test')
  test() {
    this.omMigrationHelper.doMigrationOM();
  }

  @Get('test1')
  test1() {
    this.connectionManager
      .getConnection()
      .publish(MIGRATE_EXCHANGE_KEY, MIGRATION_QUEUE_ROUTING_KEY, {
        symbol: 'TNG',
        date: '2023-01-10',
      });
  }
}
