import { COR_START_SYNC_ACTION } from '@modules/stock-info/observers/cor/cor.actions';
import { OrderMatchingPublisher } from '@modules/stock-info/queue/publisher/order-matching.publisher';
import { EventManagerReactive } from '@nest/base/dist/util/event-manager-rx/EventManager';
import { Controller, Get } from '@nestjs/common';

@Controller('cor')
export class CorController {
  constructor(
    private readonly eventManager: EventManagerReactive,
    private readonly omPublisher: OrderMatchingPublisher
  ) {}

  @Get('sync')
  syncCor(): string {
    this.eventManager.dispatch(COR_START_SYNC_ACTION);

    return 'ok';
  }

  @Get('sync-om')
  async syncOM() {
    await this.omPublisher.publishOne('HSG');

    return 'ok';
  }

  @Get('sync-om-all')
  async syncOMAll() {
    await this.omPublisher.publish();

    return 'ok';
  }
}
