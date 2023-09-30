import { SlackHelper } from '@modules/core/helper/slack.helper';
import { CronScheduleModel } from '@modules/core/model/CronSchedule.model';
import { prisma } from '@modules/core/util/prisma';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess, XLogger } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment/moment';

@Injectable()
export class SyncPricesJob {
  private readonly logger = new XLogger(SyncPricesJob.name);

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
  @Cron('0 30 16,17 * * *', {
    name: SyncValues.JOB_SYNC_PRICE_KEY,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  sync() {
    if (!isMainProcess()) return;
    this.syncPricePublisher.publish([], true);
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

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)
  @Cron('0 */5 9-14 * * 1-6', {
    name: SyncValues.JOB_SYNC_PRICE_KEY,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async syncPrice() {
    if (!isMainProcess()) return;
    const size = await this.syncPricePublisher.publish(['HOSE']);
    this.logger.info(
      `Published sync stock price current day with size ${size.size}`,
    );
  }
}
