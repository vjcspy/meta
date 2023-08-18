import { STOCK_PRICE_SYNC } from '@modules/stock-info/observers/stock-price/stock-price.actions';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { EventManagerReactive } from '@nest/base/dist/util/event-manager-rx/EventManager';
import { Controller, Get } from '@nestjs/common';

@Controller('stock-price')
export class StockPriceController {
  constructor(
    private readonly eventManager: EventManagerReactive,
    private readonly stockPricePublisher: StockPricePublisher,
  ) {}

  @Get('test')
  test() {
    this.eventManager.dispatch(
      STOCK_PRICE_SYNC({
        code: 'BFC',
        resolve: () => {},
      }),
    );

    return 'ok';
  }

  @Get('sync-all')
  syncAll() {
    this.stockPricePublisher.publish();

    return 'ok';
  }
}
