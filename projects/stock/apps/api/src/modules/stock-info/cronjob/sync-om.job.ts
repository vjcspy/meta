import { SlackHelper } from '@modules/core/helper/slack.helper';
import { CronScheduleModel } from '@modules/core/model/CronSchedule.model';
import { prisma } from '@modules/core/util/prisma';
import { OrderMatchingPublisher } from '@modules/stock-info/queue/publisher/order-matching.publisher';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess } from '@nest/base';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment/moment';

@Injectable()
export class SyncOmJob {
  private readonly logger = new Logger(SyncOmJob.name);
  constructor(
    private syncOmPublisher: OrderMatchingPublisher,
    private cronScheduleModel: CronScheduleModel,
    private slackHelper: SlackHelper
  ) {}

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)
  @Cron('0 */15 17,23 * * *', {
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
          const meta: any =
            typeof schedule?.meta === 'object'
              ? schedule.meta
              : JSON.parse(schedule.meta as any);
          if (meta?.isPostSlack) {
            // do nothing
            return undefined;
          } else {
            // process and post slack
            if (await this.isFinishSync(meta?.size)) {
              this.logger.log('Sync OM fully success');
              this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
                text: 'Sync OM fully success',
              });

              return {
                isPostSlack: true,
              };
            }
          }
        } else {
          this.logger.error(
            'Please return number records when publish sync om'
          );
        }
      }
    );
  }

  private async isFinishSync(totalCor: number) {
    // dua vao sync status
    const syncDate = moment().startOf('day');
    const numberSyncSuccess = await prisma.syncStatus.count({
      where: {
        key: {
          contains: 'sync_om',
        },
        date: {
          gte: syncDate.toDate(),
        },
        is_success: true,
      },
    });
    return numberSyncSuccess == 2 * totalCor;
  }
}
