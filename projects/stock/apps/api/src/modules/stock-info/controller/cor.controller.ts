import { COR_START_SYNC_ACTION } from '@modules/stock-info/observers/cor/cor.actions';
import { OrderMatchingPublisher } from '@modules/stock-info/queue/publisher/order-matching.publisher';
import { StockPriceRequest } from '@modules/stock-info/requests/bsc/price.request';
import { EventManagerReactive } from '@nest/base/dist/util/event-manager-rx/EventManager';
import { EventRxContext } from '@nest/base/dist/util/event-manager-rx/EventRxContext';
import { Controller, Get } from '@nestjs/common';

@Controller('cor')
export class CorController {
  constructor(
    private readonly eventManager: EventManagerReactive,
    private readonly omPublisher: OrderMatchingPublisher,
    private readonly stockPriceRequest: StockPriceRequest,
    private readonly eventRxContext: EventRxContext,
  ) {}

  @Get('sync')
  syncCor(): string {
    this.eventManager.dispatch(COR_START_SYNC_ACTION);

    return 'ok';
  }

  @Get('sync-om')
  async syncOM() {
    await this.omPublisher.publishOne('YTC');

    return 'ok';
  }

  @Get('sync-om-all')
  async syncOMAll() {
    await this.omPublisher.publish();

    return 'ok';
  }

  @Get('test')
  async test() {
    // const { data } = await firstValueFrom(
    //   this.stockPriceRequest.getPrice('BFC')
    // );

    return this.eventManager.dispatch({
      type: 'FOO_EVENT_1',
    });
  }
}
