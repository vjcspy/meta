import { MigrationController } from '@modules/migration/controller/migration.controller';
import { HELPERS } from '@modules/migration/helper';
import { OmMigrateConsumer } from '@modules/migration/queue/consumer/om-migrate.consumer';
import { MIGRATE_EXCHANGE_KEY } from '@modules/migration/values/queue.value';
import { StockInfoModule } from '@modules/stock-info/stock-info.module';
import { RabbitMQModule } from '@nest/rabbitmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    StockInfoModule,
    RabbitMQModule.register({
      exchanges: [
        {
          name: MIGRATE_EXCHANGE_KEY,
          type: 'topic',
        },
      ],
      handlers: [],
    }),
  ],
  controllers: [MigrationController],
  providers: [...HELPERS, OmMigrateConsumer],
})
export class MigrationModule {
  onModuleInit(): any {
    /*
     * TODO: temporary add consumer related to DI issue
     * */
    RabbitMQModule.addHandler([OmMigrateConsumer]);
  }
}
