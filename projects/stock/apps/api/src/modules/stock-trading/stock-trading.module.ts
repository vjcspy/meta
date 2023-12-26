import { STOCK_TRADING_CONTROLLERS } from '@modules/stock-trading/controller';
import { STOCK_TRADING_CRONS } from '@modules/stock-trading/cron';
import { STOCK_TRADING_HELPERS } from '@modules/stock-trading/helper';
import { TRADING_QUEUE } from '@modules/stock-trading/queue';
import { MarketTickActionConsumer } from '@modules/stock-trading/queue/consumer/market-tick-action.consumer';
import { STOCK_TRADING_REPO } from '@modules/stock-trading/repo';
import { LiveRequest } from '@modules/stock-trading/requests/live/live.request';
import {
  MARKET_ACTION_INFO_EXCHANGE,
  STOCK_TRADING_EXCHANGE_KEY,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { RabbitMQModule } from '@nest/rabbitmq';
import { Module, type OnModuleInit } from '@nestjs/common';

@Module({
  imports: [
    RabbitMQModule.register({
      exchanges: [
        {
          name: STOCK_TRADING_EXCHANGE_KEY,
          type: 'topic',
        },
        {
          name: MARKET_ACTION_INFO_EXCHANGE,
          type: 'topic',
        },
      ],
      handlers: [],
    }),
  ],
  controllers: [...STOCK_TRADING_CONTROLLERS],
  providers: [
    ...STOCK_TRADING_HELPERS,
    ...STOCK_TRADING_REPO,
    ...TRADING_QUEUE,
    ...STOCK_TRADING_CRONS,
    LiveRequest,
  ],
  exports: [...STOCK_TRADING_HELPERS, ...STOCK_TRADING_REPO],
})
export class StockTradingModule implements OnModuleInit {
  onModuleInit() {
    RabbitMQModule.addHandler([MarketTickActionConsumer]);
  }
}
