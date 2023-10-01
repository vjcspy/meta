import { SlackHelper } from '@modules/core/helper/slack.helper';
import { gte } from '@modules/core/util/json-rule-engine/operator/gte';
import { lte } from '@modules/core/util/json-rule-engine/operator/lte';
import { prisma } from '@modules/core/util/prisma';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { isJSON } from 'chitility/dist/util/isJSON';
import { Engine } from 'json-rules-engine';
import { forEach } from 'lodash';

@Injectable()
export class AlertsJob {
  private readonly logger = new XLogger(AlertsJob.name);

  constructor(private slackHelper: SlackHelper) {}

  // * * * * * *
  // | | | | | |
  // | | | | | day of week
  // | | | | months
  // | | | day of month
  // | | hours
  // | minutes
  // seconds (optional)
  @Cron('*/20 * * * * *', {
    name: SyncValues.JOB_SYNC_PRICE_KEY,
    timeZone: 'Asia/Ho_Chi_Minh',
  })
  async checkAlert() {
    const alerts = await prisma.stockAlert.findMany({});

    forEach(alerts, async (alert) => {
      if (alert.state !== 1) {
        return true;
      }

      if (alert.symbol) {
        const price = await prisma.stockPrice.findFirst({
          where: {
            symbol: alert.symbol,
          },
          orderBy: [
            {
              date: 'desc',
            },
          ],
        });

        if (price && isJSON(alert.conditions)) {
          try {
            const engine = new Engine();
            [lte, gte].forEach((o) => engine.addOperator(o));
            const condition = JSON.parse(alert.conditions as any);
            engine
              .addRule(condition)
              .addFact('price', price)
              .run(price)
              .then((res) => {
                if (Array.isArray(res.results) && res.results.length > 0) {
                  const passRule = res.results[0];
                  const message = passRule?.event?.params?.message;
                  if (message) {
                    this.logger.info(`rule pass with message: ${message}`);
                    this.slackHelper.postMessage(
                      SyncValues.SLACK_ALERT_CHANNEL_NAME,
                      {
                        blocks: [
                          {
                            type: 'header',
                            text: {
                              type: 'plain_text',
                              text: alert.name,
                            },
                          },
                          {
                            type: 'section',
                            fields: [
                              {
                                type: 'mrkdwn',
                                text: `Symbol: *${alert?.symbol}*`,
                              },
                              {
                                type: 'mrkdwn',
                                text: 'Created by:*meta*',
                              },
                            ],
                          },
                          {
                            type: 'section',
                            text: {
                              type: 'mrkdwn',
                              text: `<https://stock.ngocdiep.top/stock-trading/alert-disable/${alert.id}|Disable alert>`,
                            },
                          },
                        ],
                      },
                    );
                  }
                }
              });
          } catch (e) {
            this.logger.error('process rule error', e);
          }
        }
      }
    });
  }
}
