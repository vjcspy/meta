import { SlackHelper } from '@modules/core/helper/slack.helper';
import { prisma } from '@modules/core/util/prisma';
import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import { SimplizeRequest } from '@modules/stock-info/requests/simplize/simplize.request';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { XLogger } from '@nest/base';
import { Injectable } from '@nestjs/common';
import * as _ from 'lodash';
import * as moment from 'moment/moment';
import { firstValueFrom, retry } from 'rxjs';

@Injectable()
export class SyncTicksHelper {
  private readonly force_sync_previous_date = true;

  private readonly logger = new XLogger(SyncTicksHelper.name);

  constructor(
    private simplizeRequest: SimplizeRequest,
    private syncStatus: SyncStatus,
    private slackHelper: SlackHelper,
  ) {}

  async syncTicks(symbol: string) {
    // Check sync status
    const syncDate = moment().startOf('day');
    let dateFromData: any;
    const syncStatus = await this.syncStatus.getStatusByDate(
      this.getKey(symbol),
      syncDate.toDate(),
    );

    if (syncStatus) {
      if (syncStatus.is_success) {
        this.logger.info(
          `Already synced for symbol ${symbol} date ${syncDate.format(
            'YYYY-MM-DD',
          )}`,
        );
      }

      if (syncStatus.number_of_try > 3) {
        this.logger.error(
          `Too many sync failures ${symbol} date ${syncDate.format(
            'YYYY-MM-DD',
          )}`,
          new Error(
            `Too many sync failures ${symbol} date ${syncDate.format(
              'YYYY-MM-DD',
            )}`,
          ),
        );
        this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
          text: `Too many sync failures ${symbol} date ${syncDate.format(
            'YYYY-MM-DD',
          )}`,
        });
        return;
      }

      this.logger.info(
        `Try sync again for ${symbol} with number_of_try ${syncStatus.number_of_try}`,
      );
    }

    try {
      // get request
      this.logger.info(
        `Will get ticks data from downstream for stock ${symbol}`,
      );
      const res = await firstValueFrom(
        this.simplizeRequest.getTicks(symbol).pipe(retry(3)),
      );

      if (res.status === 200 && Array.isArray(res.data.data)) {
        const tickData = res.data.data;

        if (_.size(tickData) > 0) {
          if (!Array.isArray(tickData[0]) || _.size(tickData[0]) !== 4) {
            throw new Error('Wrong data format from Simplize');
          }

          dateFromData = moment.unix(tickData[0][0]);

          if (
            this.force_sync_previous_date ||
            dateFromData.isSame(syncDate, 'day')
          ) {
            this.logger.info(
              `Will save data current day ${symbol} date ${syncDate.format(
                'YYYY-MM-DD',
              )}`,
            );

            await prisma.stockInfoTicks.deleteMany({
              where: { symbol, date: dateFromData.toDate() },
            });

            await prisma.stockInfoTicks.create({
              data: {
                symbol,
                date: dateFromData.toDate(),
                meta: tickData,
              },
            });

            this.logger.info(
              `Will save sync status current day ${symbol} date ${syncDate.format(
                'YYYY-MM-DD',
              )}`,
            );
          } else {
            this.logger.info(
              `API return data for previous day for current day ${symbol} date ${syncDate.format(
                'YYYY-MM-DD',
              )}`,
            );
          }
        } else {
          this.logger.info(
            `Not have data/transaction for current day ${symbol} date ${syncDate.format(
              'YYYY-MM-DD',
            )}`,
          );
        }

        this.logger.info(
          `Will save success sync status for  ${symbol} date ${syncDate.format(
            'YYYY-MM-DD',
          )}`,
        );
        await this.syncStatus.saveSuccessStatus(this.getKey(symbol), {
          key: this.getKey(symbol),
          is_success: true,
          date: syncDate.toDate(),
          meta: {
            date_from_data: dateFromData
              ? dateFromData.format('YYYY-MM-DD')
              : null,
            transaction_count: _.size(tickData),
          },
        });
      }
    } catch (e) {
      this.logger.error(e?.message, e);
      this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
        text: `Error: sync ticks for symbol ${symbol}: ${e?.message} `,
      });
      await this.syncStatus.saveErrorStatus(this.getKey(symbol), e);

      throw e;
    }
  }

  private getKey(symbol: string) {
    return `sync_ticks_${symbol}`;
  }
}
