import { SlackHelper } from '@modules/core/helper/slack.helper';
import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { MarketTickActionAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-action-analyze.publisher';
import { MarketTickHistoryAnalyzePublisher } from '@modules/stock-trading/queue/publisher/market-tick-history-analyze.publisher';
import { isMainProcess, XLogger } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import * as moment from 'moment';

@Injectable()
export class TickActionJob {
  private readonly logger = new XLogger(TickActionJob.name);

  private _cache_is_trade_today = {};

  constructor(
    private slackHelper: SlackHelper,
    private priceHelper: StockPriceHelper,
    private tickActionAnalyzeHelper: TickActionAnalyzeHelper,
    private marketTickHistoryAnalyzePublisher: MarketTickHistoryAnalyzePublisher,
    private marketTickActionAnalyzePublisher: MarketTickActionAnalyzePublisher,
  ) {}

  /**
   * Run tick analyze vào cuối ngày và cập nhật vào job status
   * @returns {Promise<void>}
   */
  @Cron('0 15 20 * * *', {
    name: 'TickActionJob.generateTickActionInfo',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async generateTickActionInfo() {
    if (!isMainProcess()) {
      return;
    }

    const date = moment.utc().format('YYYY-MM-DD');
    const prices = await this.priceHelper.getSimpleHistory(
      StockInfoValue.VNINDEX_CODE,
      date,
      date,
    );

    if (prices.length === 1) {
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `Start generate tick action (minute) data for date ${date}`,
      });

      await this.marketTickActionAnalyzePublisher.publish();
    } else {
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `skipping generate tick action (minute) info because not found VNINDEX price for ${date}`,
      });
    }
  }

  /**
   * Run avg data history cho ngày hôm nay
   * @returns {Promise<void>}
   */
  @Cron('0 25 20 * * *', {
    name: 'TickActionJob.createHistory',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async createHistory() {
    if (!isMainProcess()) {
      return;
    }

    const date = moment.utc().format('YYYY-MM-DD');
    const prices = await this.priceHelper.getSimpleHistory(
      StockInfoValue.VNINDEX_CODE,
      date,
      date,
    );

    if (prices.length === 1) {
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `Start generate tick history avg data for date ${date}`,
      });

      await this.marketTickHistoryAnalyzePublisher.publishCurrentDay();
    } else {
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `skipping generate history analyze tick action(AVG) because not found VNINDEX price for ${date}`,
      });
    }
  }

  private async hasTradeToDay(date: string) {
    if (!this._cache_is_trade_today.hasOwnProperty(date)) {
      const prices = await this.priceHelper.getSimpleHistory(
        StockInfoValue.VNINDEX_CODE,
        date,
        date,
      );

      this._cache_is_trade_today[date] = prices.length === 1;
    }

    return this._cache_is_trade_today[date];
  }

  /**
   * Run analyze tick action từng phút cho market (default category)
   * @returns {Promise<void>}
   */
  @Cron('0 * 9-14 * * 1-5', {
    name: 'TickActionJob.generateTickActionToDay',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async generateTickActionToDay() {
    if (!isMainProcess()) {
      return;
    }
    const currentDate = moment.utc();
    const targetTime = moment.utc().set({
      hour: 2,
      minute: 18,
      second: 0,
      millisecond: 0,
    });
    try {
      if (
        currentDate.isAfter(targetTime) &&
        !(await this.hasTradeToDay(currentDate.format('YYYY-MM-DD')))
      ) {
        this.logger.log(
          `Skipping generateTickActionToDay because no trade for date ${currentDate.format(
            'YYYY-MM-DD',
          )}`,
        );
        return;
      }

      // Call directly helper to refresh data
      TickActionAnalyzeHelper.NEED_FETCH_DATA = false;
      await this.tickActionAnalyzeHelper.runForDate(
        currentDate.format('YYYY-MM-DD'),
      );
    } catch (e) {
      // swallow error
      this.logger.error('Error when generateTickActionToDay (every minute)', e);
    }
  }
}
