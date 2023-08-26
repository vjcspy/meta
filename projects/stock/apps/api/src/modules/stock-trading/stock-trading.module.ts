import { StockInfoModule } from '@modules/stock-info/stock-info.module';
import { STOCK_TRADING_CONTROLLERS } from '@modules/stock-trading/controller';
import { STOCK_TRADING_HELPERS } from '@modules/stock-trading/helper';
import { STOCK_TRADING_REPO } from '@modules/stock-trading/repo';
import { Module } from '@nestjs/common';

@Module({
  imports: [StockInfoModule],
  controllers: [...STOCK_TRADING_CONTROLLERS],
  providers: [...STOCK_TRADING_HELPERS, ...STOCK_TRADING_REPO],
  exports: [...STOCK_TRADING_HELPERS, ...STOCK_TRADING_REPO],
})
export class StockTradingModule {}
