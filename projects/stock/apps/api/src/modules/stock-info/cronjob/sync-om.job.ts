import { CronScheduleModel } from '@modules/core/model/CronSchedule.model';
import { OrderMatchingPublisher } from '@modules/stock-info/queue/publisher/order-matching.publisher';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class SyncOmJob {
  constructor(
    private syncOmPublisher: OrderMatchingPublisher,
    private cronScheduleModel: CronScheduleModel
  ) {}

  @Cron('* */15 17-23 * * *', {
    name: SyncValues.JOB_SYNC_OM_KEY,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  sync() {
    if (!isMainProcess()) return;
    this.cronScheduleModel.runOneTimePerDay(
      SyncValues.JOB_SYNC_OM_KEY,
      () => this.syncOmPublisher.publish(),
      async (schedule) => {
        if (schedule?.meta) {
          const meta: any = JSON.parse(schedule.meta as any);
          if (meta?.isPostSlack) {
            // do nothing

            return undefined;
          } else {
            // process and post slack
            return {
              isPostSlack: true,
            };
          }
        }

        // process and post slack
        return {
          isPostSlack: true,
        };
      }
    );
  }
}
