import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import {
  MARKET_ACTION_INFO_EXCHANGE,
  MARKET_ACTION_INFO_JOB_KEY,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base';
import { AmqpConnectionManager } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';
import { forEach, uniq } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class MarketTickActionAnalyzePublisher {
  private readonly logger = new XLogger(MarketTickActionAnalyzePublisher.name);

  constructor(
    private readonly connectionManager: AmqpConnectionManager,
    private readonly priceHelper: StockPriceHelper,
    private readonly tickActionAnalyzeHelper: TickActionAnalyzeHelper,
  ) {}

  async publish() {
    const prices = await this.priceHelper.getHistory(
      StockInfoValue.VNINDEX_CODE,
      // '2023-09-05',
      '2023-12-25',
    );

    const days = prices.map((p) => moment(p.date).format('YYYY-MM-DD'));
    this.logger.info(
      `Start publish ${days.length} days for calculate Market Action Info`,
    );
    forEach(uniq(days), (date) => {
      this.connectionManager
        .getConnection()
        .publish(MARKET_ACTION_INFO_EXCHANGE, MARKET_ACTION_INFO_JOB_KEY, date);
    });
  }
}
