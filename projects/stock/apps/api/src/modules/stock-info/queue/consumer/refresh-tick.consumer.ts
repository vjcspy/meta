import { SyncTicksHelper } from '@modules/stock-info/helper/sync-ticks.helper';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { XLogger } from '@nest/base';
import { Nack, RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';
import { auditTime, delay, groupBy, mergeMap, Subject } from 'rxjs';

@Injectable()
export class RefreshTickConsumer {
  public static refreshTick$ = new Subject<string>();

  private readonly logger = new XLogger(RefreshTickConsumer.name);

  constructor(private syncTickHelper: SyncTicksHelper) {
    RefreshTickConsumer.refreshTick$
      .pipe(
        groupBy((symbol) => symbol),
        mergeMap((group) => {
          return group.pipe(auditTime(SyncValues.REFRESH_WINDOW_TIME));
        }),
        delay(500),
      )
      .subscribe((symbol: any) => {
        this.logger.info(`refresh tick for: ${symbol}`, { symbol });
        this.syncTickHelper.syncTicks(symbol);
      });
  }

  @RabbitSubscribe({
    exchange: SyncValues.REFRESH_TICK_EXCHANGE,
    routingKey: SyncValues.REFRESH_TICK_ROUTING_KEY,
    queue: SyncValues.REFRESH_TICK_QUEUE,
    queueOptions: {
      durable: true,
    },
  })
  public async handler(msg: any) {
    try {
      if (typeof msg === 'string') {
        RefreshTickConsumer.refreshTick$.next(msg);
      }
    } catch (e) {
      this.logger.info(`Requeue for ${msg}`);
      return new Nack(true);
    }
  }
}
