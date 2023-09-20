import { StockInfoModule } from '@modules/stock-info/stock-info.module';
import { STOCK_TRADING_CONTROLLERS } from '@modules/stock-trading/controller';
import { STOCK_TRADING_HELPERS } from '@modules/stock-trading/helper';
import { TRADING_QUEUE } from '@modules/stock-trading/queue';
import { STOCK_TRADING_REPO } from '@modules/stock-trading/repo';
import { STOCK_TRADING_EXCHANGE_KEY } from '@modules/stock-trading/value/stock-trading-queue.value';
import { RabbitMQModule } from '@nest/rabbitmq';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    RabbitMQModule.register({
      exchanges: [
        {
          name: STOCK_TRADING_EXCHANGE_KEY,
          type: 'topic',
        },
      ],
      handlers: [],
    }),
    StockInfoModule,
  ],
  controllers: [...STOCK_TRADING_CONTROLLERS],
  providers: [
    ...STOCK_TRADING_HELPERS,
    ...STOCK_TRADING_REPO,
    ...TRADING_QUEUE,
  ],
  exports: [...STOCK_TRADING_HELPERS, ...STOCK_TRADING_REPO],
})
export class StockTradingModule {}
