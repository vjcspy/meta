import { SlackHelper } from '@modules/core/helper/slack.helper';
import { prisma } from '@modules/core/util/prisma';
import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import { SimplizeRequest } from '@modules/stock-info/requests/simplize/simplize.request';
import { SimpleStockPriceDTO } from '@modules/stock-info/requests/simplize/simplize-response.dto';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, maxBy } from 'lodash';
import * as moment from 'moment';
import { firstValueFrom, retry } from 'rxjs';

@Injectable()
export class SyncSimpleStockPrice {
  private readonly logger = new XLogger(SyncSimpleStockPrice.name);

  constructor(
    private simplizeRequest: SimplizeRequest,
    private syncStatus: SyncStatus,
    private slackHelper: SlackHelper,
  ) {}

  async syncSimpleStockPrice(symbol: string, forceSyncFromBeginning = false) {
    const syncDate = moment.utc().startOf('day');
    const syncStatus = await this.syncStatus.getStatusByKey(
      this.getKey(symbol),
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
          text: `Too many sync simple stock price failures ${symbol} date ${syncDate.format(
            'YYYY-MM-DD',
          )}`,
        });
        return;
      }

      this.logger.info(
        `Try sync again for ${symbol} with number_of_try ${syncStatus.number_of_try}`,
      );
    }

    const isSyncFromBeginning =
      !syncStatus || forceSyncFromBeginning || !syncStatus.is_success;

    // Vì stock sync hằng ngày nên nếu đã có syncStatus thì chỉ cần lấy dữ liệu cuối cùng update vào
    try {
      this.logger.info(
        `Will get simple stock price data from downstream for stock ${symbol}`,
      );
      const res = await firstValueFrom(
        this.simplizeRequest
          .getStockPrice(symbol, !isSyncFromBeginning ? 30 : 500)
          .pipe(retry(3)),
      );

      if (isSyncFromBeginning) {
        this.logger.info(
          `Sync simple stock price from beginning for symbol ${symbol}, will delete all record if existed`,
        );
        await prisma.simpleStockPrice.deleteMany({
          where: {
            symbol,
          },
        });
      }

      if (res && Array.isArray(res?.data?.data)) {
        const prices: SimpleStockPriceDTO[] = plainToInstance(
          SimpleStockPriceDTO,
          res.data.data as any[],
          {
            excludeExtraneousValues: true,
            exposeUnsetFields: false,
          },
        );
        const latest_price = maxBy(prices, (value) => value.date);
        if (isSyncFromBeginning) {
          this.logger.info(
            `Will save simple stock price for symbol ${symbol} with ${prices.length} records`,
          );
          await prisma.simpleStockPrice.createMany({
            data: map(prices, (d) => ({ ...d, symbol })),
          });
        } else {
          this.logger.info(
            `Will update latest simple stock price for symbol ${symbol} with date ${moment(latest_price.date).format('YYYY-MM-DD')}`,
          );
          const data: any = {
            ...latest_price,
            symbol,
          };
          await prisma.simpleStockPrice.upsert({
            where: {
              symbol_date: {
                symbol,
                date: latest_price.date,
              },
            },
            create: data,
            update: data,
          });
        }

        await this.syncStatus.saveSuccessStatus(this.getKey(symbol), {
          key: this.getKey(symbol),
          is_success: true,
          date: latest_price.date,
        });
        this.logger.info(
          `Successfully sync simple stock price for symbol ${symbol}`,
        );
      }
    } catch (e) {
      await this.syncStatus.saveErrorStatus(this.getKey(symbol), e);
      this.logger.error(`Error sync simple stock price for ${symbol}`, e);
    }
  }

  private getKey(symbol: string) {
    return `sync_simple_stock_price_${symbol}`;
  }
}
