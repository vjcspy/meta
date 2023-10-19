import { SlackHelper } from '@modules/core/helper/slack.helper';
import { CronScheduleModel } from '@modules/core/model/CronSchedule.model';
import { prisma } from '@modules/core/util/prisma';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess, XLogger } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { find, forEach } from 'lodash';
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
  @Cron('0 30 17 * * *', {
    name: SyncValues.JOB_SYNC_PRICE_KEY,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  sync() {
    if (!isMainProcess()) return;
    this.logger.info(`Published sync stock price for all symbols`);
    this.syncPricePublisher.publish([], true);
    this.syncPricePublisher.publishOne('HOSTC', true);
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

  @Cron('0 */30 9-14 * * 1-5', {
    name: `${SyncValues.JOB_SYNC_PRICE_KEY}_EVERY_5_MINS`,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async syncPrice() {
    if (!isMainProcess()) return;
    const size = await this.syncPricePublisher.publish(['HOSE']);

    // VNINDEX
    await this.syncPricePublisher.publishOne('HOSTC');
    this.logger.info(
      `Published sync stock price current day with size ${size.size}`,
    );
  }

  /*
   * Sync price for alerting every 1 min
   * */
  @Cron(CronExpression.EVERY_MINUTE, {
    name: `${SyncValues.JOB_SYNC_PRICE_KEY}_FOR_ALERT`,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async syncAlertPrice() {
    if (!isMainProcess()) return;
    const alerts = await prisma.stockAlert.findMany({});
    const cors = await prisma.cor_entity.findMany({});
    forEach(alerts, (a) => {
      if (a.symbol && find(cors, (c) => c.code === a.symbol)) {
        this.syncPricePublisher.publishOne(a.symbol);
      }
    });
  }
}
