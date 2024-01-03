import { SlackHelper } from '@modules/core/helper/slack.helper';
import { CronScheduleModel } from '@modules/core/model/CronSchedule.model';
import { prisma } from '@modules/core/util/prisma';
import { MarketCatHelper } from '@modules/stock-info/helper/market-cat.helper';
import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { SyncTicksPublisher } from '@modules/stock-info/queue/publisher/sync-ticks.publisher';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { isMainProcess, XLogger } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { forEach } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class SyncTicksJob {
  private readonly logger = new XLogger(SyncTicksJob.name);

  constructor(
    private syncTicksPublisher: SyncTicksPublisher,
    private cronScheduleModel: CronScheduleModel,
    private slackHelper: SlackHelper,
    private catHelper: MarketCatHelper,
    private priceHelper: StockPriceHelper,
  ) {}

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)
  @Cron('0 0 16,17,23 * * *', {
    name: 'SyncTicksJob.sync',
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

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)
  @Cron('0 * 9-14 * * 1-5', {
    name: `SyncTicksJob.syncDefaultCat`,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async syncDefaultCat() {
    try {
      if (isMainProcess()) {
        // check has price for VNINDEX today
        const prices = await this.priceHelper.getHistory(
          StockInfoValue.VNINDEX_CODE,
          moment().format('YYYY-MM-DD'),
        );

        if (prices.length !== 1) {
          return;
        }

        const defaultCat = await this.catHelper.getDefaultCat();

        if (
          Array.isArray(defaultCat?.symbols) &&
          defaultCat.symbols.length > 0
        ) {
          forEach(defaultCat.symbols, (symbol) => {
            this.syncTicksPublisher.publishRefreshTick(symbol);
          });
        }
      }
    } catch (e) {
      this.logger.error('Failed when refresh tick for default category', e);
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `Failed when refresh tick for default category ${e?.message}`,
      });
    }
  }
}
