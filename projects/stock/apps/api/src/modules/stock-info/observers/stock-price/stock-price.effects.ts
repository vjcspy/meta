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
import { EventRxError } from '@nest/base';
import { Effect } from '@nest/base/dist/util/event-manager-rx/event-rx.decorator';
import { EffectHandler } from '@nest/base/dist/util/event-manager-rx/event-rx.types';
import { Injectable, Logger } from '@nestjs/common';
import { DataObject } from 'chitility';
import * as moment from 'moment/moment';
import {
  catchError,
  concatMap,
  EMPTY,
  from,
  mergeMap,
  of,
  pipe,
  retry,
} from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class StockPriceEffects {
  private readonly logger = new Logger(StockPriceEffects.name);

  constructor(
    private readonly syncStatusService: SyncStatus,
    private stockPriceRequest: StockPriceRequest,
    private readonly stockPriceRepo: StockPriceRepo,
    private slackHelper: SlackHelper,
  ) {}

  @Effect({
    type: STOCK_PRICE_SYNC,
  })
  startSync(): EffectHandler {
    return pipe(
      mergeMap((action) => {
        const { code, resolve } = action.payload;
        const jobId = getStockPriceJobId(code);
        this.syncStatusService.saveInfo(jobId, {
          resolve,
        });

        this.logger.log('Checking current status of price sync', { action });

        return from(this.syncStatusService.getStatusByKey(jobId)).pipe(
          map((syncStatus) => {
            let lastDate: any;
            if (syncStatus) {
              lastDate = moment(syncStatus.date);
            }

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
      mergeMap((action) => {
        const { code, lastDate } = action.payload;
        return this.stockPriceRequest.getPrice(code, lastDate).pipe(
          retry(2),
          map((res) => {
            if (res?.status === 200 && Array.isArray(res.data)) {
              return STOCK_PRICE_SAVE({
                code,
                data: new DataObject(res.data).setDisableToJson(true),
              });
            }
            return STOCK_PRICE_ERROR({
              code,
              error: new EventRxError('Could not get data from downstream'),
            });
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
            console.log(error);
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
          this.logger.error(`COULD NOT ACK QUEUE, NOT FOUND INFO OF: ${code}`);
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
        this.logger.error(`Error save stock price for ${code}`, {
          error,
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
          this.logger.error(`COULD NOT ACK QUEUE, NOT FOUND INFO OF: ${code}`);
        }

        return EMPTY;
      }),
    );
  }
}
