import { COR_START_SYNC_ACTION } from '@modules/stock-info/observers/cor/cor.actions';
import { EventManagerReactive } from '@nest/base/dist/util/event-manager-rx/EventManager';
import { Controller, Get } from '@nestjs/common';

@Controller('cor')
export class CorController {
  constructor(private readonly eventManager: EventManagerReactive) {}

  @Get('sync')
  syncCor(): string {
    this.eventManager.dispatch(COR_START_SYNC_ACTION);

    return 'ok';
  }
}
