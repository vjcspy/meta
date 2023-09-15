import { CorRepo } from '@modules/stock-info/repo/cor.repo';
import {
  STOCK_TRADING_ANALYSIS_ROUTING_KEY,
  STOCK_TRADING_EXCHANGE_KEY,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { AmqpConnectionManager } from '@nest/rabbitmq/dist';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';

@Injectable()
export class StockTradingAnalysisPublisher {
  constructor(
    private readonly connectionManager: AmqpConnectionManager,
    private readonly corRepo: CorRepo,
  ) {}

  async publish() {
    const cors = await this.corRepo.getAll();
    _.forEach(cors, (cor) => {
      this.connectionManager
        .getConnection()
        .publish(
          STOCK_TRADING_EXCHANGE_KEY,
          STOCK_TRADING_ANALYSIS_ROUTING_KEY,
          cor.code,
          {},
        );
    });

    for (let i = 0; i < cors.length; i++) {
      const cor = cors[i];
      this.connectionManager
        .getConnection()
        .publish(
          STOCK_TRADING_EXCHANGE_KEY,
          STOCK_TRADING_ANALYSIS_ROUTING_KEY,
          cor.code,
          {},
        );
    }

    return {
      size: cors.length,
    };
  }
}
