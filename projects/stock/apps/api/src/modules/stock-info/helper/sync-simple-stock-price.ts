import { SlackHelper } from '@modules/core/helper/slack.helper';
import { prisma } from '@modules/core/util/prisma';
import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import { FireantRequest } from '@modules/stock-info/requests/fireant/fireant.request';
import { FireantStockPriceDTO } from '@modules/stock-info/requests/fireant/fireant-reponse.dto';
import { StockInfoValue } from '@modules/stock-info/values/stock-info.value';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { XLogger } from '@nest/base/dist';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { map, maxBy } from 'lodash';
import * as moment from 'moment';

@Injectable()
export class SyncSimpleStockPrice {
  private readonly logger = new XLogger(SyncSimpleStockPrice.name);

  constructor(
    private fireantRequest: FireantRequest,
    private syncStatus: SyncStatus,
    private slackHelper: SlackHelper,
  ) {}

  async syncSimpleStockPrice(symbol: string, forceSyncFromBeginning = false) {
    if (symbol === StockInfoValue.VNINDEX_CODE) {
      // eslint-disable-next-line no-param-reassign
      symbol = 'VNINDEX';
    }
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
        const message = `SyncSimpleStockPrice.SyncSimpleStockPrice Too many sync failures ${symbol} date ${syncDate.format(
          'YYYY-MM-DD',
        )}`;
        this.logger.error(message, new Error(message));
        this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
          text: message,
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
      const res = await this.fireantRequest.getPriceHistory(
        symbol,
        !isSyncFromBeginning ? 20 : 300,
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

      if (res && Array.isArray(res?.data) && res.data.length > 0) {
        const prices: FireantStockPriceDTO[] = plainToInstance(
          FireantStockPriceDTO,
          res.data as any[],
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
            data: map(prices, (d) => ({ ...d, symbol })) as any,
          });
        } else {
          if (!latest_price) {
            this.logger.warn(
              'Something went wrong when update latest simple price',
            );
          }

          this.logger.info(
            `Will update latest simple stock price for symbol ${symbol} with date ${moment(latest_price.date).format('YYYY-MM-DD')}`,
          );
          await prisma.simpleStockPrice.upsert({
            where: {
              symbol_date: {
                symbol,
                date: latest_price.date,
              },
            },
            create: latest_price,
            update: latest_price,
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
      } else {
        this.logger.info(`No simple price data for ${symbol}`);
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
