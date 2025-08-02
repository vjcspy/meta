import { StockPriceHelper } from '@modules/stock-info/helper/stock-price.helper';
import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import {
  STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_JOB_KEY,
  STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
  STOCK_TRADING_ANALYSIS_JOB_KEY,
  STOCK_TRADING_WORKER_ANALYSIS_KEY,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base';
import { AmqpConnectionManager } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';
import { forEach } from 'lodash';
import * as moment from 'moment/moment';

@Injectable()
export class StockTradingAnalysisPublisher {
  private readonly logger = new XLogger(StockTradingAnalysisPublisher.name);

  constructor(
    private readonly connectionManager: AmqpConnectionManager,
    private readonly corRepo: CorRepo,
    private priceHelper: StockPriceHelper,
  ) {}

  async publish(symbol?: string) {
    if (symbol) {
      this.connectionManager.getConnection().publish(
        STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
        STOCK_TRADING_ANALYSIS_JOB_KEY,
        {
          job_id: STOCK_TRADING_WORKER_ANALYSIS_KEY,
          payload: {
            symbol,
          },
        },
        {},
      );
      return {
        size: 1,
      };
    }
    const cors = await this.getCors();

    for (let i = 0; i < cors.length; i++) {
      const cor = cors[i];
      if (cor.exchange !== 'HOSE' && cor.exchange !== 'HNX') {
        continue;
      }
      this.connectionManager.getConnection().publish(
        STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
        STOCK_TRADING_ANALYSIS_JOB_KEY,
        {
          job_id: STOCK_TRADING_WORKER_ANALYSIS_KEY,
          payload: {
            symbol: cor.code,
          },
        },
        {},
      );
    }

    return {
      size: cors.length,
    };
  }

  async publishNodeJsGenerateAnalysisForDate(date: string) {
    this.logger.info(
      `publishing generate analysis history data for date ${date}`,
    );
    this.connectionManager
      .getConnection()
      .publish(
        STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
        STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_JOB_KEY,
        date,
        {},
      );
  }

  async publishNodeJsGenerateAnalysisHistory() {
    this.logger.info(
      `Start publish stock trading analysis for default category run in nodejs from 2023-09-15`,
    );
    const prices = await this.priceHelper.getSimpleHistory(
      StockInfoValue.VNINDEX_CODE,
      moment.utc('2023-09-15').toDate(),
      moment.utc().toDate(),
    );

    forEach(prices, (price) => {
      this.connectionManager
        .getConnection()
        .publish(
          STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
          STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_JOB_KEY,
          moment.utc(price.date).format('YYYY-MM-DD'),
          {},
        );
    });

    return {
      size: prices.length,
    };
  }

  private async getCors() {
    return this.corRepo.getAll();
  }
}
