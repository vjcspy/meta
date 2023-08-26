import { CoreModule } from '@modules/core/core.module';
import { CorController } from '@modules/stock-info/controller/cor.controller';
import { StockPriceController } from '@modules/stock-info/controller/stock-price.controller';
import { CRONJOB_SERVICES } from '@modules/stock-info/cronjob';
import { MODELS } from '@modules/stock-info/model';
import { OBSERVER_SERVICES } from '@modules/stock-info/observers';
import { QUEUE_CONSUMERS, QUEUE_PUBLISHER } from '@modules/stock-info/queue';
import { STOCK_INFO_REPOS } from '@modules/stock-info/repo';
import { StockPriceRequest } from '@modules/stock-info/requests/bsc/price.request';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { RabbitMQModule } from '@nest/rabbitmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    CoreModule,
    RabbitMQModule.register({
      exchanges: [
        {
          name: SyncValues.EXCHANGE_KEY,
          type: 'topic',
        },
      ],
      handlers: [...QUEUE_CONSUMERS],
    }),
  ],
  providers: [
    ...OBSERVER_SERVICES,
    ...QUEUE_PUBLISHER,
    ...CRONJOB_SERVICES,
    ...MODELS,
    ...STOCK_INFO_REPOS,
    StockPriceRequest,
  ],
  controllers: [CorController, StockPriceController],
  exports: [...STOCK_INFO_REPOS],
})
export class StockInfoModule {}
