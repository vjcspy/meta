import { SlackHelper } from '@modules/core/helper/slack.helper';
import {
  OrderMatching,
  OrderMatchingType,
} from '@modules/stock-info/model/OrderMatching';
import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import {
  ORDER_MATCHING_LOAD_LAST_PAGE,
  ORDER_MATCHING_NO_TRANSACTION,
  ORDER_MATCHING_SAVE_ERROR,
  ORDER_MATCHING_SAVE_SUCCESS,
  SYNC_ORDER_MATCHING,
  SYNC_ORDER_MATCHING_ERROR,
  SYNC_ORDER_MATCHING_FINISH,
  SYNC_ORDER_MATCHING_LOAD_PAGE,
  SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER,
  SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR,
  SYNC_ORDER_MATCHING_MAX_RETRY,
} from '@modules/stock-info/observers/order-matching/om.actions';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { Effect, EffectHandler, XLogger } from '@nest/base';
import { Nack } from '@nest/rabbitmq';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { DataObject } from 'chitility';
import * as moment from 'moment';
import { catchError, delay, EMPTY, from, map, mergeMap, of, pipe } from 'rxjs';

@Injectable()
export class OmEffects {
  private readonly logger = new XLogger(OmEffects.name);

  constructor(
    private syncStatusService: SyncStatus,
    private httpService: HttpService,
    private orderMatching: OrderMatching,
    private slackHelper: SlackHelper,
  ) {}

  @Effect({
    type: SYNC_ORDER_MATCHING,
  })
  startSync(): EffectHandler {
    return pipe(
      mergeMap((action) => {
        const { code, type, resolve } = action.payload;
        const syncStatusKey = this.orderMatching.getJobIdInfo(code, type);

        this.syncStatusService.saveInfo(syncStatusKey, {
          resolve,
        });
        this.logger.log(
          `_________ [${action.payload.code}|${type}] START _________`,
        );
        return from(this.syncStatusService.getStatus(syncStatusKey)).pipe(
          map((syncStatus) => {
            if (syncStatus) {
              this.logger.log(
                `[${action.payload.code}|${type}] Found sync status`,
              );
              // check current date
              const date = moment(syncStatus.date);
              const curDate = moment();

              if (
                syncStatus.is_success === false &&
                date.isSame(curDate, 'day') &&
                syncStatus.number_of_try > 3
              ) {
                this.logger.error(
                  `[${action.payload.code}|${type}] Sync fail quá nhiều`,
                  new Error(
                    `[${action.payload.code}|${type}] Sync fail quá nhiều`,
                  ),
                );

                return SYNC_ORDER_MATCHING_MAX_RETRY({
                  code,
                  type,
                });
              }
              if (
                syncStatus.is_success === true &&
                date.isSame(curDate, 'day')
              ) {
                this.logger.log(
                  `[${action.payload.code}|${type}] ALREADY SYNCED`,
                );
                return SYNC_ORDER_MATCHING_FINISH({
                  code,
                  type,
                });
              }
            }

            return SYNC_ORDER_MATCHING_LOAD_PAGE({
              code,
              type,
              page: syncStatus?.page || 0,
            });
          }),
        );
      }),
    );
  }

  @Effect({
    type: SYNC_ORDER_MATCHING_LOAD_PAGE,
  })
  loadPage(): EffectHandler {
    return pipe(
      delay(2000),
      mergeMap((action: any) => {
        const { code } = action.payload;
        const page = action.payload.page ?? 0;
        const { type } = action.payload;
        const headIndex = action?.payload?.data?.headIndex ?? -1;

        const url =
          type === OrderMatchingType.INVESTOR
            ? `https://apipubaws.tcbs.com.vn/stock-insight/v1/intraday/${code}/investor/his/paging?page=${page}&size=${SyncValues.PAGE_SIZE}&headIndex=${headIndex}`
            : `https://apipubaws.tcbs.com.vn/stock-insight/v1/intraday/${code}/his/paging?page=${page}&size=${SyncValues.PAGE_SIZE}&headIndex=${headIndex}`;

        // const url =
        //   type === OrderMatchingType.INVESTOR
        //     ? `https://api.bluestone.systems/proxy/tcbs/stock-insight/v1/intraday/${code}/investor/his/paging?page=${page}&size=${SyncValues.PAGE_SIZE}&headIndex=${headIndex}`
        //     : `https://api.bluestone.systems/proxy/tcbs/stock-insight/v1/intraday/${code}/his/paging?page=${page}&size=${SyncValues.PAGE_SIZE}&headIndex=${headIndex}`;

        return this.httpService.get(url).pipe(
          map((res) => {
            if (Array.isArray(res.data.data)) {
              const total = res?.data?.total;
              if (total === 0) {
                this.logger.log(
                  `[${action.payload.code}|${type}] Không có dữ liệu giao dịch`,
                );

                return ORDER_MATCHING_NO_TRANSACTION({
                  code,
                  type,
                  data: res.data,
                });
              }

              if (res.data.data.length === 0) {
                return ORDER_MATCHING_LOAD_LAST_PAGE({
                  code,
                  type,
                  page,
                });
              }

              this.logger.log(
                `[${action.payload.code}|${type}] Lấy dữ liệu page ${page} successful`,
              );
              return SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER({
                code,
                page,
                type,
                data: new DataObject(res.data),
              });
            }
            this.logger.error(
              `[${action.payload.code}|${type}] Response data wrong format`,
              new Error(
                `[${action.payload.code}|${type}] Response data wrong format`,
              ),
            );
            return SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR({
              code,
              page,
              type,
              error: new Error('Response data wrong format'),
            });
          }),
          catchError((error) => {
            this.logger.error(
              `[${action.payload.code}|${type}] Load data from tcbs error`,
              error,
            );
            return of(
              SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR({
                code,
                page,
                type,
                error,
              }),
            );
          }),
        );
      }),
    );
  }

  @Effect({
    type: ORDER_MATCHING_NO_TRANSACTION,
  })
  whenHaveNoTransaction(): EffectHandler {
    return pipe(
      mergeMap((action: any) => {
        const { code, type } = action.payload;
        return from(
          this.syncStatusService.saveSuccessStatus(
            this.orderMatching.getJobIdInfo(code, type),
            {
              key: this.orderMatching.getJobIdInfo(code, type),
              is_success: true,
              date: moment().startOf('day').toDate(),
              meta: {
                message: 'No transactions',
              },
            },
          ),
        ).pipe(
          map(() =>
            SYNC_ORDER_MATCHING_FINISH({
              code,
              type,
            }),
          ),
        );
      }),
    );
  }

  @Effect({
    type: ORDER_MATCHING_LOAD_LAST_PAGE,
  })
  whenLoadLastPage(): EffectHandler {
    return pipe(
      mergeMap((action: any) => {
        const { code, type } = action.payload;
        return from(
          this.syncStatusService.saveSuccessStatus(
            this.orderMatching.getJobIdInfo(code, type),
            {
              is_success: true,
            },
            true,
          ),
        ).pipe(
          map(() =>
            SYNC_ORDER_MATCHING_FINISH({
              code,
              type,
            }),
          ),
        );
      }),
    );
  }

  @Effect({
    type: SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER,
  })
  saveDataAfterLoadPageSuccess(): EffectHandler {
    return pipe(
      mergeMap((action: any) => {
        const { code, type, page, data } = action.payload;

        return from(
          this.orderMatching.saveByCodeAndType(code, type, data),
        ).pipe(
          map(() => {
            this.logger.log(`[${action.payload.code}|${type}] Save data OK`);
            return ORDER_MATCHING_SAVE_SUCCESS({
              code,
              page,
              type,
              data: {
                headIndex: data?.headIndex,
              },
            });
          }),
          catchError((error: any) => {
            this.logger.error(
              `[${action.payload.code}|${type}] ${error?.toString()}`,
              error,
            );
            return from(
              of(
                ORDER_MATCHING_SAVE_ERROR({
                  code,
                  type,
                  error,
                }),
              ),
            );
          }),
        );
      }),
    );
  }

  @Effect({
    type: ORDER_MATCHING_SAVE_SUCCESS,
  })
  triggerLoadNextPage() {
    return pipe(
      map((action: any) => {
        const { code, page, type, data } = action.payload;

        return SYNC_ORDER_MATCHING_LOAD_PAGE({
          code,
          page: page + 1,
          type,
          data,
        });
      }),
    );
  }

  @Effect({
    type: [SYNC_ORDER_MATCHING_FINISH, SYNC_ORDER_MATCHING_MAX_RETRY],
  })
  whenSyncFinish() {
    return pipe(
      map((action: any) => {
        const { code, type } = action.payload;
        const info = this.syncStatusService.getInfo(
          this.orderMatching.getJobIdInfo(code, type),
        );

        if (info && typeof info?.meta?.resolve === 'function') {
          info.meta.resolve();
          this.logger.log(
            `_________ [${action.payload.code}|${type}] DONE _________`,
          );
        } else {
          this.logger.error(
            `[${action.payload.code}|${type}] COULD NOT ACK QUEUE, NOT FOUND INFO`,
            new Error(
              `[${action.payload.code}|${type}] COULD NOT ACK QUEUE, NOT FOUND INFO`,
            ),
          );
        }

        return EMPTY;
      }),
    );
  }

  @Effect({
    type: [
      ORDER_MATCHING_SAVE_ERROR,
      SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR,
      SYNC_ORDER_MATCHING_ERROR,
    ],
  })
  whenSyncError() {
    return pipe(
      mergeMap((action: any) => {
        const { code, type, error } = action.payload;
        const info = this.syncStatusService.getInfo(
          this.orderMatching.getJobIdInfo(code, type),
        );

        if (type === SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR().type) {
          // Do tcbs chan nen auto retry den duoc thi thoi
          if (info && typeof info?.meta?.resolve === 'function') {
            this.logger.log(`[${action.payload.code}|${type}] RETRY`);
            info.meta.resolve(new Nack(true));
          }
          return of(EMPTY);
        }

        this.logger.error(
          `sync om error code|type ${code}|${type} `,
          action?.payload?.error,
        );

        this.slackHelper.postMessage(SyncValues.SLACK_CHANNEL_NAME, {
          text: `sync om error code|type ${code}|${type} `,
        });

        return from(
          this.syncStatusService.saveErrorStatus(
            this.orderMatching.getJobIdInfo(code, type),
            error,
          ),
        ).pipe(
          map(() => {
            if (info && typeof info?.meta?.resolve === 'function') {
              this.logger.log(`[${action.payload.code}|${type}] RETRY`);
              info.meta.resolve(new Nack(true));
            } else {
              this.logger.error(
                `[${action.payload.code}|${type}] COULD NOT NACK QUEUE, NOT FOUND INFO`,
                new Error(
                  `[${action.payload.code}|${type}] COULD NOT NACK QUEUE, NOT FOUND INFO`,
                ),
              );
            }

            return EMPTY;
          }),
          catchError((e) => {
            this.logger.error(
              `[${
                action.payload.code
              }|${type}] Không thể xử lý lỗi ${e?.toString()}`,
              new Error(
                `[${
                  action.payload.code
                }|${type}] Không thể xử lý lỗi ${e?.toString()}`,
              ),
            );
            return from(of(EMPTY));
          }),
        );
      }),
    );
  }
}
