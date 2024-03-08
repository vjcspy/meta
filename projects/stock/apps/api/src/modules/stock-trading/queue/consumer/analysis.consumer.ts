import { TradingAnalysisHelper } from '@modules/stock-trading/helper/trading-analysis.helper';
import {
  STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_JOB_KEY,
  STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_QUEUE,
  STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base/dist';
import { RabbitSubscribe } from '@nest/rabbitmq/dist';
import { Injectable } from '@nestjs/common';
import { date } from 'yup';

@Injectable()
export class AnalysisConsumer {
  private readonly logger = new XLogger(AnalysisConsumer.name);

  constructor(private readonly tradingAnalysisHelper: TradingAnalysisHelper) {}

  @RabbitSubscribe({
    exchange: STOCK_TRADING_ANALYSIS_EXCHANGE_KEY,
    routingKey: STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_JOB_KEY,
    queue: STOCK_TRADING_ANALYSIS_DEFAULT_CAT_NODEJS_QUEUE,
    queueOptions: {
      durable: true,
    },
  })
  public async pubSubHandler(msg: any) {
    try {
      await this.tradingAnalysisHelper.analysisHistoryForDate(msg);
    } catch (e) {
      this.logger.error(
        `Error when run consumer to generate analysis history for date ${date}`,
        e,
      );
    }
  }
}
