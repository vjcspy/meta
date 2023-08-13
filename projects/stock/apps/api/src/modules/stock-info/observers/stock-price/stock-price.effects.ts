import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import { STOCK_PRICE_SYNC } from '@modules/stock-info/observers/stock-price/stock-price.actions';
import { Effect } from '@nest/base/dist/util/event-manager-rx/event-rx.decorator';
import { EffectHandler } from '@nest/base/dist/util/event-manager-rx/event-rx.types';
import { Injectable, Logger } from '@nestjs/common';
import { pipe } from 'rxjs';

@Injectable()
export class StockPriceEffects {
  private readonly logger = new Logger(StockPriceEffects.name);

  constructor(private readonly syncStatusService: SyncStatus) {}

  @Effect({
    type: STOCK_PRICE_SYNC,
  })
  startSync(): EffectHandler {
    return pipe();
  }
}
