import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import {
  MARKET_ACTION_INFO_EXCHANGE,
  MARKET_ACTION_INFO_JOB_KEY,
  MARKET_ACTION_INFO_QUEUE,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base/dist';
import { Nack, RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketTickActionConsumer {
  private readonly logger = new XLogger(MarketTickActionConsumer.name);

  constructor(
    private readonly marketTickAnalyzeHelper: TickActionAnalyzeHelper,
  ) {}

  @RabbitSubscribe({
    exchange: MARKET_ACTION_INFO_EXCHANGE,
    routingKey: MARKET_ACTION_INFO_JOB_KEY,
    queue: MARKET_ACTION_INFO_QUEUE,
    queueOptions: {
      durable: true,
    },
  })
  public async pubSubHandler(msg: any) {
    try {
      if (typeof msg === 'string') {
        await this.marketTickAnalyzeHelper.runForDate(msg);
      }
    } catch (e) {
      this.logger.info(`Requeue for ${msg}`);
      return new Nack(true);
    }
  }
}
