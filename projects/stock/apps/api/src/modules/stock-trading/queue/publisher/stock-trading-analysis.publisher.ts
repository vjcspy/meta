import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import {
  STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
  STOCK_TRADING_ANALYSIS_JOB_KEY,
  STOCK_TRADING_WORKER_ANALYSIS_KEY,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { AmqpConnectionManager } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockTradingAnalysisPublisher {
  constructor(
    private readonly connectionManager: AmqpConnectionManager,
    private readonly corRepo: CorRepo,
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
      if (cor.exchange !== 'HOSE') {
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

  private async getCors() {
    return this.corRepo.getAll();
  }
}
