import { SlackHelper } from '@modules/core/helper/slack.helper';
import { getCurrentDate } from '@modules/core/util/getCurrentDate';
import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { StockTradingAnalysisPublisher } from '@modules/stock-trading/queue/publisher/stock-trading-analysis.publisher';
import { isMainProcess } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class StockTradingAnalysisJob {
  constructor(
    private slackHelper: SlackHelper,
    private priceHelper: StockPriceHelper,
    private stockTradingAnalysisPublisher: StockTradingAnalysisPublisher,
  ) {}

  /**
   * Chạy job để cập nhật vào bảng stock_trading_analysis_history vào cuối ngày.
   *
   * Table này làm nhiệm vụ tính toán các chỉ số trong ngày hôm đó
   * @returns {Promise<void>}
   */
  @Cron('0 30 20 * * *', {
    name: 'StockTradingAnalysisJob.generateNodeJSAnalysisHistory',
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async generateNodeJSAnalysisHistory(): Promise<void> {
    if (!isMainProcess()) {
      return;
    }

    const date = getCurrentDate();
    const prices = await this.priceHelper.getSimpleHistory(
      StockInfoValue.VNINDEX_CODE,
      date,
      date,
    );

    if (prices.length === 1) {
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `Start generate stock trading analysis data for date ${date}`,
      });

      await this.stockTradingAnalysisPublisher.publishNodeJsGenerateAnalysisForDate(
        date,
      );
    } else {
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `skipping generate stock trading analysis because not found VNINDEX price for ${date}`,
      });
    }
  }
}
