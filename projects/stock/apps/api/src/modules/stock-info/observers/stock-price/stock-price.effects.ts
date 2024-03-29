import { SlackHelper } from '@modules/core/helper/slack.helper';
import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import {
  STOCK_PRICE_ERROR,
  STOCK_PRICE_FINISHED,
  STOCK_PRICE_LOAD,
  STOCK_PRICE_SAVE,
  STOCK_PRICE_SYNC,
} from '@modules/stock-info/observers/stock-price/stock-price.actions';
import { StockPriceRepo } from '@modules/stock-info/repo/StockPriceRepo';
import { StockPriceRequest } from '@modules/stock-info/requests/bsc/price.request';
import { getStockPriceJobId } from '@modules/stock-info/util/stock-price/getStockPriceJobId';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { Effect, EffectHandler, EventRxError, XLogger } from '@nest/base';
import { Injectable } from '@nestjs/common';
import { DataObject } from 'chitility';
import * as moment from 'moment/moment';
import {
  catchError,
  concatMap,
  delay,
  EMPTY,
  from,
  mergeMap,
  of,
  pipe,
} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StockPriceEffects {
  private readonly logger = new XLogger(StockPriceEffects.name);

  constructor(
    private readonly syncStatusService: SyncStatus,
    private stockPriceRequest: StockPriceRequest,
    private readonly stockPriceRepo: StockPriceRepo,
    private readonly slackHelper: SlackHelper,
  ) {}

  @Effect({
    type: STOCK_PRICE_SYNC,
  })
  startSync(): EffectHandler<typeof STOCK_PRICE_SYNC> {
    return pipe(
      mergeMap((action) => {
        const { code, resolve } = action.payload;
        const jobId = getStockPriceJobId(code);
        this.syncStatusService.saveInfo(jobId, {
          resolve,
        });

        this.logger.log(`Checking current status sync price of ${code}`, {
          action,
        });

        return from(this.syncStatusService.getStatusByKey(jobId)).pipe(
          map((syncStatus) => {
            let lastDate: any;
            if (syncStatus && action.payload?.fromBeginning !== true) {
              lastDate = moment(syncStatus.date);
            }

            this.logger.log(
              `Will sync symbol ${code} from lastDate ${
                lastDate ? lastDate.format('YYYY-MM-DD') : 'beginning'
              }`,
              {
                action,
              },
            );

            return STOCK_PRICE_LOAD({
              code,
              lastDate,
            });
          }),
        );
      }),
    );
  }

  @Effect({
    type: STOCK_PRICE_LOAD,
  })
  loadStockPrice(): EffectHandler {
    return pipe(
      delay(200),
      mergeMap((action) => {
        const { code, lastDate } = action.payload;
        return this.stockPriceRequest.getPrice(code, lastDate).pipe(
          map((res) => {
            if (res?.status === 200 && Array.isArray(res.data)) {
              return STOCK_PRICE_SAVE({
                code,
                data: new DataObject(res.data).setDisableToJson(true),
              });
            }
            return STOCK_PRICE_ERROR({
              code,
              error: new EventRxError(
                `Could not get stock price from downstream for ${code}`,
              ),
            });
          }),
          catchError((error) => {
            this.logger.error(
              `Could not get stock price from downstream for ${code}`,
              error,
            );
            return of(STOCK_PRICE_ERROR({ code, error }));
          }),
        );
      }),
    );
  }

  @Effect({
    type: STOCK_PRICE_SAVE,
  })
  saveStockPrice(): EffectHandler {
    return pipe(
      concatMap((action) => {
        const { code, data } = action.payload;
        return from(this.stockPriceRepo.saveMany(code, data)).pipe(
          map(() => {
            return STOCK_PRICE_FINISHED({
              code,
            });
          }),
          catchError((error) => {
            this.logger.error(`Error: save stock price for ${code}`, error);
            return of(STOCK_PRICE_ERROR({ code, error }));
          }),
        );
      }),
    );
  }

  @Effect({
    type: STOCK_PRICE_FINISHED,
  })
  whenSyncFinish(): EffectHandler {
    return pipe(
      map((action: any) => {
        const { code } = action.payload;
        const info = this.syncStatusService.getInfo(getStockPriceJobId(code));

        if (info && typeof info?.meta?.resolve === 'function') {
          info.meta.resolve();
          this.logger.log(`Sync stock price for ${code} successfully`, {
            action,
          });
        } else {
          this.logger.error(
            `COULD NOT ACK QUEUE, NOT FOUND INFO OF: ${code}`,
            new Error(`COULD NOT ACK QUEUE, NOT FOUND INFO OF: ${code}`),
          );
        }

        return EMPTY;
      }),
    );
  }

  @Effect({
    type: STOCK_PRICE_ERROR,
  })
  whenSyncError() {
    return pipe(
      map((action: any) => {
        const { code, error } = action.payload;
        const info = this.syncStatusService.getInfo(getStockPriceJobId(code));
        this.logger.error(`Error save stock price for ${code}`, error, {
          action,
        });
        this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
          text: `ERROR sync stock price for ${code}`,
        });
        if (info && typeof info?.meta?.resolve === 'function') {
          info.meta.resolve();
        } else {
          this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
            text: `COULD NOT ACK QUEUE WHEN SYNC STOCK PRICE, NOT FOUND INFO OF: ${code}`,
          });
          this.logger.error(
            `COULD NOT ACK QUEUE, NOT FOUND INFO OF: ${code}`,
            new Error(`COULD NOT ACK QUEUE, NOT FOUND INFO OF: ${code}`),
          );
        }

        return EMPTY;
      }),
    );
  }
}
