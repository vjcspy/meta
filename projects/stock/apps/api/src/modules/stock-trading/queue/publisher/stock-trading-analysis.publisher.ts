import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
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

@Injectable()
export class StockTradingAnalysisPublisher {
  private readonly logger = new XLogger(StockTradingAnalysisPublisher.name);

  constructor(
    private readonly connectionManager: AmqpConnectionManager,
    private readonly corRepo: CorRepo,
    private tickActionAnalyzeHelper: TickActionAnalyzeHelper,
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
        // eslint-disable-next-line no-continue
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

  async publishForDefaultCatRunInApi(symbol?: string) {
    if (symbol) {
      this.connectionManager
        .getConnection()
        .publish(
          STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
          STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_JOB_KEY,
          symbol,
          {},
        );
      return {
        size: 1,
      };
    }
    this.logger.info(
      'Publish stock trading analysis for default category run in nodejs',
    );
    const defaultCat = await this.tickActionAnalyzeHelper.getDefaultCat();

    if (Array.isArray(defaultCat.symbols)) {
      forEach(defaultCat.symbols, (s: string) => {
        this.connectionManager
          .getConnection()
          .publish(
            STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
            STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_JOB_KEY,
            s,
            {},
          );
      });

      return {
        size: defaultCat.symbols,
      };
    }
  }

  private async getCors() {
    return this.corRepo.getAll();
  }
}
