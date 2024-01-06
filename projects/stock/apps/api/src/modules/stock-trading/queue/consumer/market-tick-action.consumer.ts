import { SlackHelper } from '@modules/core/helper/slack.helper';
import { prisma } from '@modules/core/util/prisma';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { MARKET_TICK_ACTION_TYPE } from '@modules/stock-trading/value/market-tick-action.value';
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
    private slackHelper: SlackHelper,
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
    const date = moment.utc(msg).toDate();

    let existed = await prisma.marketTickJobInfo.findUnique({
      where: {
        date_type_symbol: {
          date,
          type: MARKET_TICK_ACTION_TYPE,
          symbol: StockInfoValue.VNINDEX_CODE,
        },
      },
    });

    try {
      if (!existed) {
        this.logger.info(`First run generate tick action for date ${msg}`);
        existed = await prisma.marketTickJobInfo.create({
          data: {
            try_count: 1,
            date,
            type: MARKET_TICK_ACTION_TYPE,
            symbol: StockInfoValue.VNINDEX_CODE,
            isSuccess: false,
          },
        });
      }

      if (existed.isSuccess && !moment.utc().isSame(date, 'date')) {
        this.logger.info(`Skipping run for date ${msg} due to isSuccess`);
        return;
      }

      if (existed.try_count > 2) {
        this.logger.error(
          `Max try for date ${msg}`,
          new Error(`Max try for date ${msg}`),
        );

        this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
          text: `Error max try when generate tick minute data for date ${msg}`,
        });
        return;
      }

      await this.marketTickAnalyzeHelper.runForDate(msg);
      await prisma.marketTickJobInfo.update({
        where: {
          date_type_symbol: {
            date,
            type: MARKET_TICK_ACTION_TYPE,
            symbol: StockInfoValue.VNINDEX_CODE,
          },
        },
        data: {
          isSuccess: true,
          last_error: null,
        },
      });
    } catch (e) {
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `Error when generate tick minute data for date ${msg}, will retry, error: ${e?.toString()}`,
      });
      this.logger.error(
        `Error when generate tick minute data for date ${msg}`,
        e,
      );
      await prisma.marketTickJobInfo.update({
        where: {
          date_type_symbol: {
            date,
            type: MARKET_TICK_ACTION_TYPE,
            symbol: StockInfoValue.VNINDEX_CODE,
          },
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
