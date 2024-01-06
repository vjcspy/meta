import { TickActionDayAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-day-analyze.helper';
import {
  MARKET_ACTION_DAY_ANALYZE_JOB_KEY,
  MARKET_ACTION_DAY_ANALYZE_QUEUE,
  MARKET_ACTION_INFO_EXCHANGE,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base/dist';
import { RabbitSubscribe } from '@nest/rabbitmq/dist';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketTickDayAnalyzeConsumer {
  private readonly logger = new XLogger(MarketTickDayAnalyzeConsumer.name);

  constructor(private marketTickActionDayHelper: TickActionDayAnalyzeHelper) {}

  @RabbitSubscribe({
    exchange: MARKET_ACTION_INFO_EXCHANGE,
    routingKey: MARKET_ACTION_DAY_ANALYZE_JOB_KEY,
    queue: MARKET_ACTION_DAY_ANALYZE_QUEUE,
    queueOptions: {
      durable: true,
    },
  })
  async handler(msg: any) {
    try {
      this.logger.info(`Received msg ${msg}`);
      await this.marketTickActionDayHelper.runWithCheckJobInfo(msg);
    } catch (e) {
      this.logger.error(`Error when consume msg ${msg}`, e);
    }
  }
}
