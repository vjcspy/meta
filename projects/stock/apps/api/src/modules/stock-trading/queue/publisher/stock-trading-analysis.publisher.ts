import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import {
  STOCK_TRADING_EXCHANGE_KEY,
  STOCK_TRADING_JOB_KEY,
  STOCK_TRADING_WORKER_ANALYSIS_KEY,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { AmqpConnectionManager } from '@nest/rabbitmq/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class StockTradingAnalysisPublisher {
  constructor(
    private readonly connectionManager: AmqpConnectionManager,
    private readonly corRepo: CorRepo,
  ) {}

  async publish() {
    const cors = await this.corRepo.getAll();

    for (let i = 0; i < cors.length; i++) {
      const cor = cors[i];
      this.connectionManager.getConnection().publish(
        STOCK_TRADING_EXCHANGE_KEY,
        STOCK_TRADING_JOB_KEY,
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
}
