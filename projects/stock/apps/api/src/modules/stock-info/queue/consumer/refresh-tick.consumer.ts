import type { SyncTicksHelper } from '@modules/stock-info/helper/sync-ticks.helper';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { XLogger } from '@nest/base/dist';
import { Nack, RabbitSubscribe } from '@nest/rabbitmq/dist';
import { auditTime, filter, groupBy, mergeMap, Subject, tap } from 'rxjs';

export class RefreshTickConsumer {
  public static refreshTick$ = new Subject<string>();

  private lastProcessedSymbol: string | null = null;

  private lastProcessedTime: number = 0;

  private readonly logger = new XLogger(RefreshTickConsumer.name);

  constructor(private syncTickHelper: SyncTicksHelper) {
    RefreshTickConsumer.refreshTick$
      .pipe(
        groupBy((symbol) => symbol),
        mergeMap((group: any) => {
          return group.pipe(
            auditTime(SyncValues.REFRESH_WINDOW_TIME),
            tap((symbol: any) => {
              this.logger.info(symbol);
              // Cập nhật thông tin cho thông điệp cuối cùng đã xử lý
              this.lastProcessedSymbol = symbol;
              this.lastProcessedTime = Date.now();
            }),
          );
        }),
        // Kiểm tra xem thông điệp có phải là thông điệp mới so với thông điệp cuối cùng đã xử lý
        filter((symbol: any) => {
          const isSameAsLastProcessed = symbol === this.lastProcessedSymbol;
          const isPastDebounce =
            Date.now() - this.lastProcessedTime >
            SyncValues.REFRESH_WINDOW_TIME;
          return !isSameAsLastProcessed || isPastDebounce;
        }),
      )
      .subscribe((symbol) => {
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
