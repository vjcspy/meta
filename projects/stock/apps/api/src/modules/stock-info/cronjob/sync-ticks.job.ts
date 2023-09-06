import { SlackHelper } from '@modules/core/helper/slack.helper';
import { CronScheduleModel } from '@modules/core/model/CronSchedule.model';
import { prisma } from '@modules/core/util/prisma';
import { SyncTicksPublisher } from '@modules/stock-info/queue/publisher/sync-ticks.publisher';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess, XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class SyncTicksJob {
  private readonly logger = new XLogger(SyncTicksJob.name);

  constructor(
    private syncTicksPublisher: SyncTicksPublisher,
    private cronScheduleModel: CronScheduleModel,
    private slackHelper: SlackHelper,
  ) {}

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)
  @Cron('0 0 18,22,23 * * *', {
    name: SyncValues.SYNC_TICKS_JOB_KEY,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  sync() {
    if (!isMainProcess()) return;
    this.cronScheduleModel.runOneTimePerDay(
      SyncValues.SYNC_TICKS_JOB_KEY,
      () => this.syncTicksPublisher.publish(),
      async (schedule) => {
        if (schedule?.meta) {
          const meta: any =
            typeof schedule?.meta === 'object'
              ? schedule.meta
              : JSON.parse(schedule.meta as any);
          if (meta?.isPostSlack) {
            // do nothing
            return undefined;
          }
          // process and post slack
          if (await this.isFinishSync(meta?.size)) {
            this.logger.log('Sync Ticks fully success');
            this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
              text: 'Sync Ticks fully success',
            });

            return {
              isPostSlack: true,
            };
          }
        } else {
          this.logger.error(
            'Please return number records when publish sync ticks',
            new Error('Please return number records when publish sync ticks'),
          );
        }
      },
    );
  }

  private async isFinishSync(totalCor: number) {
    // dua vao sync status
    const syncDate = moment().startOf('day');
    const numberSyncSuccess = await prisma.syncStatus.count({
      where: {
        key: {
          contains: 'sync_ticks_',
        },
        date: {
          gte: syncDate.toDate(),
        },
        is_success: true,
      },
    });
    return numberSyncSuccess === totalCor;
  }
}
