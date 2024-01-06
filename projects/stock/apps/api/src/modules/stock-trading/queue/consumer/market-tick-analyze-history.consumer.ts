import { SlackHelper } from '@modules/core/helper/slack.helper';
import { prisma } from '@modules/core/util/prisma';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { TickActionAnalyzeHelper } from '@modules/stock-trading/helper/tick-action-analyze.helper';
import { MARKET_TICK_HISTORY_ANALYZE_TYPE } from '@modules/stock-trading/value/market-tick-action.value';
import {
  MARKET_ACTION_HISTORY_ANALYZE_JOB_KEY,
  MARKET_ACTION_HISTORY_ANALYZE_QUEUE,
  MARKET_ACTION_INFO_EXCHANGE,
} from '@modules/stock-trading/value/stock-trading-queue.value';
import { XLogger } from '@nest/base';
import { Nack, RabbitSubscribe } from '@nest/rabbitmq';
import { Injectable } from '@nestjs/common';
import * as moment from 'moment/moment';

@Injectable()
export class MarketTickAnalyzeHistoryConsumer {
  private readonly logger = new XLogger(MarketTickAnalyzeHistoryConsumer.name);

  constructor(
    private readonly marketTickAnalyzeHelper: TickActionAnalyzeHelper,
    private slackHelper: SlackHelper,
  ) {}

  @RabbitSubscribe({
    exchange: MARKET_ACTION_INFO_EXCHANGE,
    routingKey: MARKET_ACTION_HISTORY_ANALYZE_JOB_KEY,
    queue: MARKET_ACTION_HISTORY_ANALYZE_QUEUE,
    queueOptions: {
      durable: true,
    },
  })
  async handler(msg: any) {
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
          type: MARKET_TICK_HISTORY_ANALYZE_TYPE,
          symbol: StockInfoValue.VNINDEX_CODE,
        },
      },
    });

    try {
      if (!existed) {
        this.logger.info(`First run for date ${msg}`);
        existed = await prisma.marketTickJobInfo.create({
          data: {
            try_count: 1,
            date,
            type: MARKET_TICK_HISTORY_ANALYZE_TYPE,
            symbol: StockInfoValue.VNINDEX_CODE,
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
        this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
          text: `Error max try when generate tick history avg data for date ${msg}`,
        });
        return;
      }

      await this.marketTickAnalyzeHelper.analyzeHistoryDataForDate(msg);
      await prisma.marketTickJobInfo.update({
        where: {
          date_type_symbol: {
            date,
            type: MARKET_TICK_HISTORY_ANALYZE_TYPE,
            symbol: StockInfoValue.VNINDEX_CODE,
          },
        },
        data: {
          isSuccess: true,
          last_error: null,
        },
      });
    } catch (e) {
      this.logger.error(
        `Error when generate tick history avg data for date ${msg}`,
        e,
      );
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `Error when generate tick history avg data for date ${msg}, will retry, error: ${e?.toString()}`,
      });
      await prisma.marketTickJobInfo.update({
        where: {
          date_type_symbol: {
            date,
            type: MARKET_TICK_HISTORY_ANALYZE_TYPE,
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
