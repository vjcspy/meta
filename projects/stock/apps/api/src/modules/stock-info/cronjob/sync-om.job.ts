import { OrderMatchingPublisher } from '@modules/stock-info/queue/publisher/order-matching.publisher';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SyncOmJob {
  constructor(private syncOmPublisher: OrderMatchingPublisher) {}

  @Cron('* */15 17-23 * * *', {
    name: SyncValues.JOB_SYNC_OM_KEY,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  sync() {
    if (!isMainProcess()) return;
    this.syncOmPublisher.publish();
  }
}
