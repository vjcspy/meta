import { SyncTicksHelper } from '@modules/stock-info/helper/sync-ticks.helper';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { XLogger } from '@nest/base';
import { RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';
import { concatMap, delay, of, ReplaySubject } from 'rxjs';
import { fromPromise } from 'rxjs/internal/observable/innerFrom';

interface SyncTicksMessage {
  msg: any;
  resolve: (value: any) => void;
  reject: (error: any) => void;
}

@Injectable()
export class SyncTicksConsumer {
  private readonly logger = new XLogger(SyncTicksConsumer.name);

  private readonly messageQueue$ = new ReplaySubject<SyncTicksMessage>(500);

  constructor(private syncTicksHelper: SyncTicksHelper) {
    this.messageQueue$
      .pipe(
        concatMap((messageWrapper: SyncTicksMessage) =>
          fromPromise(this.processMessage(messageWrapper.msg)).pipe(
            delay(500),
            concatMap((result) => {
              messageWrapper.resolve(result);
              return of(result);
            }),
          ),
        ),
      )
      .subscribe({
        error: (error) => {
          this.logger.error('Error in message processing stream', error);
        },
      });
  }

  @RabbitSubscribe({
    exchange: SyncValues.SYNC_TICKS_EXCHANGE_KEY,
    routingKey: SyncValues.SYNC_TICKS_ROUTING_KEY,
    queue: SyncValues.SYNC_TICKS_QUEUE,
    queueOptions: {
      durable: true,
    },
  })
  public async pubSubHandler(msg: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.messageQueue$.next({
        msg,
        resolve,
        reject,
      });
    });
  }

  private processMessage(msg: any) {
    return new Promise<any>((resolve, reject) => {
      this.handleMessage(msg).then(resolve).catch(reject);
    });
  }

  private async handleMessage(msg: any): Promise<any> {
    try {
      if (typeof msg === 'string') {
        await this.syncTicksHelper.syncTicks(msg);
      }
    } catch (e) {
      this.logger.error(`Sync tick fail for ${msg}`, e);
    }
  }
}
