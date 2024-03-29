import { SlackHelper } from '@modules/core/helper/slack.helper';
import { prisma } from '@modules/core/util/prisma';
import { StockPricePublisher } from '@modules/stock-info/queue/publisher/stock-price.publisher';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess, XLogger } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { filter, find, forEach } from 'lodash';
import * as moment from 'moment/moment';

@Injectable()
export class SyncPricesJob {
  private readonly logger = new XLogger(SyncPricesJob.name);

  constructor(
    private syncPricePublisher: StockPricePublisher,
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
    this.syncPricePublisher.publishOne(StockInfoValue.VNINDEX_CODE, true);
    this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
      text: 'Triggered sync stock prices',
    });
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

  @Cron('0 16 9-14 * * 1-5', {
    name: `${SyncValues.JOB_SYNC_PRICE_KEY}_EVERY_60_MINS`,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async syncPrice() {
    if (!isMainProcess()) return;
    // VNINDEX
    await this.syncPricePublisher.publishOne(StockInfoValue.VNINDEX_CODE);

    const size = await this.syncPricePublisher.publish([
      StockInfoValue.HOSE_EXCHANGE,
      StockInfoValue.HNX_EXCHANGE,
    ]);
    this.logger.info(
      `Published sync stock price current day with size ${size.size}`,
    );
    this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
      text: 'Triggered sync stock prices',
    });
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

    const activatedAlerts = filter(alerts, (a) => a.state !== 0);

    forEach(activatedAlerts, (a) => {
      if (a.symbol && find(cors, (c) => c.code === a.symbol)) {
        this.syncPricePublisher.publishOne(a.symbol);
      }
    });
  }
}
