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
import { Effect } from '@nest/base/dist/util/event-manager-rx/event-rx.decorator';
import { EffectHandler } from '@nest/base/dist/util/event-manager-rx/event-rx.types';
import { Nack } from '@nest/rabbitmq/dist/model/amqp/handler-response';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import * as moment from 'moment';
import { catchError, EMPTY, from, map, mergeMap, of, pipe } from 'rxjs';

@Injectable()
export class OmEffects {
  private readonly logger = new Logger(OmEffects.name);
  constructor(
    private syncStatusService: SyncStatus,
    private httpService: HttpService,
    private orderMatching: OrderMatching
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

        return from(this.syncStatusService.getStatus(syncStatusKey)).pipe(
          map((syncStatus) => {
            this.logger.log(
              `_________ [${action.payload.code}|${type}] START _________`
            );

            //TODO: not appropriate
            if (syncStatus) {
              // check current date
              const date = moment(syncStatus.date);
              const curDate = moment();

              if (
                syncStatus.is_success === false &&
                date.isSame(curDate, 'day') &&
                syncStatus.number_of_try > 3
              ) {
                this.logger.error(
                  `[${action.payload.code}|${type}] Sync fail quá nhiều`
                );

                return SYNC_ORDER_MATCHING_MAX_RETRY({
                  code,
                  type,
                });
              } else if (
                syncStatus.is_success === true &&
                date.isSame(curDate, 'day')
              ) {
                this.logger.log(
                  `[${action.payload.code}|${type}] ALREADY SYNCED`
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
          })
        );
      })
    );
  }

  @Effect({
    type: SYNC_ORDER_MATCHING_LOAD_PAGE,
  })
  loadPage(): EffectHandler {
    return pipe(
      mergeMap((action: any) => {
        const code = action.payload.code;
        const page = action.payload.page ?? 0;
        const type = action.payload.type;
        const headIndex = action?.payload?.meta?.headIndex ?? -1;

        const url =
          type === OrderMatchingType.INVESTOR
            ? `https://apipubaws.tcbs.com.vn/stock-insight/v1/intraday/${code}/investor/his/paging?page=${page}&size=${SyncValues.PAGE_SIZE}&headIndex=${headIndex}`
            : `https://apipubaws.tcbs.com.vn/stock-insight/v1/intraday/${code}/his/paging?page=${page}&size=${SyncValues.PAGE_SIZE}&headIndex=${headIndex}`;

        return this.httpService.get(url).pipe(
          map((res) => {
            if (Array.isArray(res.data.data)) {
              const total = res?.data?.total;
              if (total === 0) {
                this.logger.log(
                  `[${action.payload.code}|${type}] Không có dữ liệu giao dịch ${page}`
                );

                return ORDER_MATCHING_NO_TRANSACTION({
                  code,
                  type,
                  meta: res.data,
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
                `[${action.payload.code}|${type}] Lấy dữ liệu page ${page} successful`
              );
              return SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER({
                code,
                page,
                type,
                data: res.data,
              });
            } else {
              this.logger.error(
                `[${action.payload.code}|${type}] Response data wrong format`
              );
              return SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR({
                code,
                page,
                type,
                error: new Error('Response data wrong format'),
              });
            }
          })
        );
      })
    );
  }

  @Effect({
    type: ORDER_MATCHING_NO_TRANSACTION,
  })
  whenHaveNoTransaction(): EffectHandler {
    return pipe(
      mergeMap((action: any) => {
        const { code, type, meta } = action.payload;
        const _day = meta.d;
        if (typeof _day !== 'string') {
          return of(
            SYNC_ORDER_MATCHING_ERROR({
              code,
              type,
              error: new Error(
                'Dữ liệu trả về bị lỗi, không parse được ngày hiện tại'
              ),
            })
          );
        }
        const date = moment.utc(`${moment().year()}/${_day}`, 'YYYY/DD/MM');
        return from(
          this.syncStatusService.saveSuccessStatus(
            this.orderMatching.getJobIdInfo(code, type),
            {
              is_success: true,
              date,
              meta: {
                message: 'No transactions',
              },
            }
          )
        ).pipe(
          map(() =>
            SYNC_ORDER_MATCHING_FINISH({
              code,
              type,
            })
          )
        );
      })
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
            true
          )
        ).pipe(
          map(() =>
            SYNC_ORDER_MATCHING_FINISH({
              code,
              type,
            })
          )
        );
      })
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
          this.orderMatching.saveByCodeAndType(code, type, data)
        ).pipe(
          map(() => {
            this.logger.log(`[${action.payload.code}|${type}] Save data OK`);
            return ORDER_MATCHING_SAVE_SUCCESS({
              code,
              page,
              type,
              meta: {
                headIndex: data?.headIndex,
              },
            });
          }),
          catchError((error: any) => {
            this.logger.error(
              `[${action.payload.code}|${type}] ${error?.toString()}`
            );
            return from(
              of(
                ORDER_MATCHING_SAVE_ERROR({
                  code,
                  type,
                  error,
                })
              )
            );
          })
        );
      })
    );
  }

  @Effect({
    type: ORDER_MATCHING_SAVE_SUCCESS,
  })
  triggerLoadNextPage() {
    return pipe(
      map((action: any) => {
        const { code, page, type, meta } = action.payload;

        return SYNC_ORDER_MATCHING_LOAD_PAGE({
          code,
          page: page + 1,
          type,
          meta,
        });
      })
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
          this.orderMatching.getJobIdInfo(code, type)
        );

        if (info && typeof info?.meta?.resolve === 'function') {
          info.meta.resolve();
          this.logger.log(
            `_________ [${action.payload.code}|${type}] DONE _________`
          );
        } else {
          this.logger.error(
            `[${action.payload.code}|${type}] COULD NOT ACK QUEUE, NOT FOUND INFO`
          );
        }

        return EMPTY;
      })
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
          this.orderMatching.getJobIdInfo(code, type)
        );

        // TODO: implement slack
        // this.slackService.postMessage(SLACK_CHANNEL.JOB_MONITORING_OM, {
        //   text: `sync om error code|type ${code}|${type} `,
        // });

        return from(
          this.syncStatusService.saveErrorStatus(
            this.orderMatching.getJobIdInfo(code, type),
            error
          )
        ).pipe(
          map(() => {
            if (info && typeof info?.meta?.resolve === 'function') {
              this.logger.log(`[${action.payload.code}|${type}] RETRY`);
              info.meta.resolve(new Nack(true));
            } else {
              this.logger.error(
                `[${action.payload.code}|${type}] COULD NOT NACK QUEUE, NOT FOUND INFO`
              );
            }

            return EMPTY;
          }),
          catchError((e) => {
            this.logger.error(
              `[${
                action.payload.code
              }|${type}] Không thể xử lý lỗi ${e?.toString()}`
            );
            return from(of(EMPTY));
          })
        );
      })
    );
  }
}