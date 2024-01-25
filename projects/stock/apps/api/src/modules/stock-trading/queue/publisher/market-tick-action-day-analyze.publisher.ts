import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import {
  MARKET_ACTION_DAY_ANALYZE_JOB_KEY,
  MARKET_ACTION_INFO_EXCHANGE,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base';
import { AmqpConnectionManager } from '@nest/rabbitmq/dist';
import { Injectable } from '@nestjs/common';
import { forEach, uniq } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class MarketTickActionDayAnalyzePublisher {
  private readonly logger = new XLogger(
    MarketTickActionDayAnalyzePublisher.name,
  );

  constructor(
    private readonly connectionManager: AmqpConnectionManager,
    private readonly priceHelper: StockPriceHelper,
    private readonly tickActionAnalyzeHelper: TickActionAnalyzeHelper,
  ) {}

  public async publish() {
    const prices = await this.priceHelper.getSimpleHistory(
      StockInfoValue.VNINDEX_CODE,
      '2023-09-18',
    );

    const days = prices.map((p) => moment.utc(p.date).format('YYYY-MM-DD'));
    this.logger.info(
      `Start publish ${days.length} days for calculate market action day analyze`,
    );
    forEach(uniq(days), (date) => {
      this.connectionManager
        .getConnection()
        .publish(
          MARKET_ACTION_INFO_EXCHANGE,
          MARKET_ACTION_DAY_ANALYZE_JOB_KEY,
          date,
        );
    });
  }
}
