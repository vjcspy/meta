import { SlackHelper } from '@modules/core/helper/slack.helper';
import { CorController } from '@modules/stock-info/controller/cor.controller';
import { FlagController } from '@modules/stock-info/controller/flag.controller';
import { MarketCatController } from '@modules/stock-info/controller/market-cat.controller';
import { StockPriceController } from '@modules/stock-info/controller/stock-price.controller';
import { TickController } from '@modules/stock-info/controller/tick.controller';
import { CRONJOB_SERVICES } from '@modules/stock-info/cronjob';
import { STOCK_INFO_HELPERS } from '@modules/stock-info/helper';
import { MODELS } from '@modules/stock-info/model';
import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import { OBSERVER_SERVICES } from '@modules/stock-info/observers';
import { QUEUE_CONSUMERS, QUEUE_PUBLISHER } from '@modules/stock-info/queue';
import { RefreshTickConsumer } from '@modules/stock-info/queue/consumer/refresh-tick.consumer';
import { SyncTicksConsumer } from '@modules/stock-info/queue/consumer/sync-ticks.consumer';
import { STOCK_INFO_REPOS } from '@modules/stock-info/repo';
import { StockPriceRequest } from '@modules/stock-info/requests/bsc/price.request';
import { FireantRequest } from '@modules/stock-info/requests/fireant/fireant.request';
import { SimplizeRequest } from '@modules/stock-info/requests/simplize/simplize.request';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess } from '@nest/base';
import { RabbitMQModule } from '@nest/rabbitmq';
import type { OnModuleInit } from '@nestjs/common';
import { Global, Module } from '@nestjs/common';

@Global()
@Module({
  imports: [
    RabbitMQModule.register({
      exchanges: [
        {
          name: SyncValues.EXCHANGE_KEY,
          type: 'topic',
        },
        {
          name: SyncValues.SYNC_TICKS_EXCHANGE_KEY,
          type: 'topic',
        },
        {
          name: SyncValues.REFRESH_TICK_EXCHANGE,
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
    ...STOCK_INFO_HELPERS,
    StockPriceRequest,
    SimplizeRequest,
    FireantRequest,
    // must to manually handle cause use DI
    SyncTicksConsumer,
    RefreshTickConsumer,
  ],
  controllers: [
    CorController,
    StockPriceController,
    TickController,
    MarketCatController,
    FlagController,
  ],
  exports: [...STOCK_INFO_REPOS, ...STOCK_INFO_HELPERS, SyncStatus],
})
export class StockInfoModule implements OnModuleInit {
  constructor(private slackHelper: SlackHelper) {}

  onModuleInit(): any {
    /**
     * @todo: temporary add consumer related to DI issue
     * */
    RabbitMQModule.addHandler([SyncTicksConsumer]);

    if (isMainProcess()) {
      // only run 1 consumer for refresh tick
      RabbitMQModule.addHandler([RefreshTickConsumer]);
    }
  }
}
