import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import {
  MARKET_ACTION_HISTORY_ANALYZE_JOB_KEY,
  MARKET_ACTION_INFO_EXCHANGE,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base/dist';
import { AmqpConnectionManager } from '@nest/rabbitmq/dist';
import { Injectable } from '@nestjs/common';
import { forEach, uniq } from 'lodash';
import * as moment from 'moment/moment';

@Injectable()
export class MarketTickHistoryAnalyzePublisher {
  private readonly logger = new XLogger(MarketTickHistoryAnalyzePublisher.name);

  constructor(
    private readonly connectionManager: AmqpConnectionManager,
    private readonly priceHelper: StockPriceHelper,
    private readonly tickActionAnalyzeHelper: TickActionAnalyzeHelper,
  ) {}

  public async publish() {
    const prices = await this.priceHelper.getHistory(
      StockInfoValue.VNINDEX_CODE,
      '2023-09-15',
    );

    const days = prices.map((p) => moment.utc(p.date).format('YYYY-MM-DD'));
    this.logger.info(
      `Start publish ${days.length} days for calculate Market Action Info`,
    );
    forEach(uniq(days), (date) => {
      this.connectionManager
        .getConnection()
        .publish(
          MARKET_ACTION_INFO_EXCHANGE,
          MARKET_ACTION_HISTORY_ANALYZE_JOB_KEY,
          date,
        );
    });
  }

  public async publishCurrentDay() {
    const currentDate = moment.utc().format('YYYY-MM-DD');
    const prices = await this.priceHelper.getHistory(
      StockInfoValue.VNINDEX_CODE,
      currentDate,
      currentDate,
    );

    const days = prices.map((p) => moment.utc(p.date).format('YYYY-MM-DD'));
    this.logger.info(
      `Start publish current ${days.length} days for calculate Market Action Info`,
    );
    forEach(uniq(days), (date) => {
      this.connectionManager
        .getConnection()
        .publish(
          MARKET_ACTION_INFO_EXCHANGE,
          MARKET_ACTION_HISTORY_ANALYZE_JOB_KEY,
          date,
        );
    });
  }
}
