import {
  OrderMatching,
  OrderMatchingType,
} from '@modules/stock-info/model/OrderMatching';
import { SyncStatus } from '@modules/stock-info/model/SyncStatus';
import {
  ORDER_MATCHING_SAVE_ERROR,
  ORDER_MATCHING_SAVE_SUCCESS,
  SYNC_ORDER_MATCHING,
  SYNC_ORDER_MATCHING_FINISH,
  SYNC_ORDER_MATCHING_LOAD_PAGE,
  SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER,
  SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR,
} from '@modules/stock-info/observers/order-matching/om.actions';
import { SyncValues } from '@modules/stock-info/values/sync.values';
import { Effect } from '@nest/base/dist/util/event-manager-rx/event-rx.decorator';
import { EffectHandler } from '@nest/base/dist/util/event-manager-rx/event-rx.types';
import { Nack } from '@nest/rabbitmq/dist/model/amqp/handler-response';
import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import moment from 'moment';
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
                return EMPTY;
              } else if (
                syncStatus.is_success === true &&
                date.isSame(curDate, 'day')
              ) {
                this.logger.log(`[${action.payload.code}|${type}] UPDATED`);
                return SYNC_ORDER_MATCHING_FINISH({
                  code,
                  type,
                });
              }
            }

            return SYNC_ORDER_MATCHING_LOAD_PAGE({
              code,
              type,
              page: 1,
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

        const url =
          type === OrderMatchingType.INVESTOR
            ? `https://apipubaws.tcbs.com.vn/stock-insight/v1/intraday/${code}/investor/his/paging?page=0&size=${SyncValues.MAX_PAGE_SIZE}`
            : `https://apipubaws.tcbs.com.vn/stock-insight/v1/intraday/${code}/his/paging?page=0&size=${SyncValues.MAX_PAGE_SIZE}`;

        return this.httpService.get(url).pipe(
          map((res) => {
            if (res?.data?.size !== SyncValues.MAX_PAGE_SIZE) {
              this.logger.error(
                `[${action.payload.code}|${type}] API nguồn đã có sự thay đổi, không support lấy full`
              );
              return SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR({
                code,
                type,
                error: new Error(
                  'API nguồn đã có sự thay đổi, không support lấy full'
                ),
              });
            }

            if (Array.isArray(res.data.data)) {
              const total = res?.data?.total;
              if (total === 0 || res.data.data.length === 0) {
                // this.log.log({
                //   source: 'fi',
                //   group: 'sync_om',
                //   group1: code,
                //   group2: type,
                //   message: `[${action.payload.code}|${type}] Không có dữ liệu giao dịch ${page}`,
                // });
                this.logger.log(
                  `[${action.payload.code}|${type}] Không có dữ liệu giao dịch ${page}`
                );
                return SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER({
                  code,
                  page,
                  type,
                  data: res.data,
                });
              }

              if (total > 0 && total < res?.data?.size) {
                // this.log.log({
                //   source: 'fi',
                //   group: 'sync_om',
                //   group1: code,
                //   group2: type,
                //   message: `[${action.payload.code}|${type}] Lấy dữ liệu page ${page} successful`,
                // });
                this.logger.log(
                  `[${action.payload.code}|${type}] Lấy dữ liệu page ${page} successful`
                );
                return SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER({
                  code,
                  page,
                  type,
                  data: res.data,
                });
              } else if (total > res?.data?.size) {
                // this.log.log({
                //   level: Levels.error,
                //   source: 'fi',
                //   group: 'sync_om',
                //   group1: code,
                //   group2: type,
                //   message: `[${action.payload.code}|${type}] Số lượng bản ghi nhiều hơn page size`,
                // });
                this.logger.error(
                  `[${action.payload.code}|${type}] Số lượng bản ghi nhiều hơn page size`
                );
                return SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR({
                  code,
                  type,
                  error: new Error(
                    'Số lượng bản ghi nhiều hơn page size, không hỗ trợ nhiều page'
                  ),
                });
              }

              // this.log.log({
              //   level: Levels.error,
              //   source: 'fi',
              //   group: 'sync_om',
              //   group1: code,
              //   group2: type,
              //   message: `[${action.payload.code}|${type}] Unknown Error`,
              // });
              this.logger.error(
                `[${action.payload.code}|${type}] Unknown Error`
              );
              return SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR({
                code,
                type,
                error: new Error('Unknown Error'),
              });
            } else {
              // this.log.log({
              //   level: Levels.error,
              //   source: 'fi',
              //   group: 'sync_om',
              //   group1: code,
              //   group2: type,
              //   message: `[${action.payload.code}|${type}] Response data wrong format`,
              // });
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
    type: SYNC_ORDER_MATCHING_LOAD_PAGE_AFTER,
  })
  whenLoadPageSuccess(): EffectHandler {
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
  whenSaveSuccess() {
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
    type: [ORDER_MATCHING_SAVE_ERROR, SYNC_ORDER_MATCHING_LOAD_PAGE_ERROR],
  })
  whenSaveError() {
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
