import { prisma } from '@modules/core/util/prisma';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import {
  MARKET_ACTION_INFO_EXCHANGE,
  MARKET_ACTION_INFO_JOB_KEY,
  MARKET_ACTION_INFO_QUEUE,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base';
import { Nack, RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment';

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
    this.logger.info(`Received msg ${msg}`);
    if (typeof msg !== 'string') {
      this.logger.error('Msg not valid', new Error());
      return;
    }
    const date = moment(msg).toDate();
    let existed = await prisma.marketTickActionJobInfo.findUnique({
      where: {
        date,
      },
    });

    if (!existed) {
      this.logger.info(`First run for date ${msg}`);
      existed = await prisma.marketTickActionJobInfo.create({
        data: {
          try_count: 1,
          date,
          isSuccess: false,
        },
      });
    }

    if (existed.isSuccess) {
      this.logger.info(`Skipping run for date ${msg} due to isSuccess`);
      return;
    }

    if (existed.try_count > 2) {
      this.logger.error(
        `Max try for date ${msg}`,
        new Error(`Max try for date ${msg}`),
      );

      return;
    }

    try {
      await this.marketTickAnalyzeHelper.runForDate(msg);
      await prisma.marketTickActionJobInfo.update({
        where: {
          date,
        },
        data: {
          isSuccess: true,
          last_error: null,
        },
      });
    } catch (e) {
      await prisma.marketTickActionJobInfo.update({
        where: {
          date,
        },
        data: {
          isSuccess: false,
          last_error: e?.toString(),
          try_count: existed.try_count + 1,
        },
      });

      this.logger.info(`Requeue for ${msg}`);
      return new Nack(true);
    }
  }
}
