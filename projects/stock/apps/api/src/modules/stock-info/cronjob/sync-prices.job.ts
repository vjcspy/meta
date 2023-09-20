import { SlackHelper } from '@modules/core/helper/slack.helper';
import { CronScheduleModel } from '@modules/core/model/CronSchedule.model';
import { prisma } from '@modules/core/util/prisma';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess } from '@nest/base';
import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment/moment';

@Injectable()
export class SyncPricesJob {
  private readonly logger = new Logger(SyncPricesJob.name);

  constructor(
    private syncPricePublisher: StockPricePublisher,
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
  @Cron('0 0 16,17,21 * * *', {
    name: SyncValues.JOB_SYNC_PRICE_KEY,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  sync() {
    if (!isMainProcess()) return;
    this.cronScheduleModel.runOneTimePerDay(
      SyncValues.JOB_SYNC_PRICE_KEY,
      () => this.syncPricePublisher.publish(),
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
            this.logger.log('Sync stock prices fully success');
            this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
              text: 'Sync stock prices fully success',
            });

            return {
              isPostSlack: true,
            };
          }
        } else {
          this.logger.error(
            'Please return number records when publish sync om',
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
          contains: 'sync_om',
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
