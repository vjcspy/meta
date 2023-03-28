import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import {
  checkCustomerIsLogged,
  clearCustomerToken,
  clearCustomerTokenAfter,
  clearDataCustomerAfterLogout,
  emptyCustomerTokenInStorage,
  generateCustomerTokenAction,
  generateCustomerTokenFail,
  generateCustomerTokenSuccessAction,
  getCustomerDetail,
  getCustomerDetailFailDueToToken,
  getCustomerReviewAction,
  getCustomerReviewAfterAction,
  getRewardPointAction,
  getRewardPointAfterAction,
  getStoreCreditAction,
  getStoreCreditAfterAction,
  gotCustomerDetail,
  gotCustomerTokenInStorage,
  persistentCustomerTokenSuccess,
  refreshCustomerSessionError,
  registerCustomerByEmailPassword,
  registerCustomerByEmailPasswordFail,
  registerCustomerByEmailPasswordSuccess,
  socialLoginAction,
} from '@modules/account/store/account.actions';
import { R_CUSTOMER_ADDRESS_EFFECTS } from '@modules/account/store/customer-address/effects';
import { PHONE_EFFECTS } from '@modules/account/store/phone/phone.effects';
import { AccountPersistent } from '@modules/account/util/account-persistent';
import { AccountConstant } from '@modules/account/util/constant';
import { graphqlFetchForCustomer as graphqlFetch } from '@modules/account/util/graphqlFetchForCustomer';
import { appRunTimeError } from '@modules/app/store/app.actions';
import CustomerDetail from '@modules/graphql/schema/CustomerDetail';
import { proxyFetch } from '@util/proxy-fetch';
import { RuntimeError } from 'chitility/dist/lib/error/RuntimeError';
import { EMPTY, flatMap, from, interval, of, retry, throttleTime } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  mapTo,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

const checkCustomerIsLogged$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(checkCustomerIsLogged, clearCustomerTokenAfter),
    debounceTime(500),
    withLatestFrom(state$, (action, state: any) => [
      action,
      state.account?.isResolvedCustomerState,
    ]),
    filter((data: any) => data[1] === false),
    switchMap(() => {
      return from(AccountPersistent.getItem(AccountConstant.TOKEN_KEY)).pipe(
        map((token: any) => {
          return token
            ? gotCustomerTokenInStorage({
                token,
              })
            : emptyCustomerTokenInStorage({});
        })
      );
    })
  )
);

const whenGenerateToken$ = createEffect((action$) =>
  action$.pipe(
    ofType(generateCustomerTokenAction),
    filter((action: any) => action.payload?.isUsername !== true),
    switchMap((value: any) => {
      return from(
        proxyFetch({
          type: 'generate-customer-token',
          payload: {
            email: value.payload.email,
            password: value.payload.password,
          },
        })
      ).pipe(
        switchMap((res: any) => {
          if (res && res.hasOwnProperty('token')) {
            return from([
              generateCustomerTokenSuccessAction({
                token: res.token,
              }),
            ]);
          } else {
            return of(
              generateCustomerTokenFail({
                error: new RuntimeError('Wrong data response format'),
              })
            );
          }
        }),
        catchError((error) =>
          of(
            generateCustomerTokenFail({
              error,
            })
          )
        )
      );
    })
  )
);

const saveCustomerTokenToStorage$ = createEffect((action$) =>
  action$.pipe(
    ofType(generateCustomerTokenSuccessAction),
    switchMap((action: any) =>
      from(
        AccountPersistent.saveItem(
          AccountConstant.TOKEN_KEY,
          action.payload['token'],
          2592000
        )
      ).pipe(
        map(() => {
          return persistentCustomerTokenSuccess({
            token: action.payload['token'],
          });
        }),
        catchError(() =>
          of(
            appRunTimeError({
              error: new RuntimeError(
                'Could not save customer token to storage'
              ),
            })
          )
        )
      )
    )
  )
);

/**
 * Lưu ý đây là nơi duy nhất để lấy và save customer token vào state
 * @type {(action$: ActionsObservable<{type: string}>, stateObservable: StateObservable<any>) => Observable<{type: string}>}
 */
const gotCustomerToken$ = createEffect((action$) =>
  action$.pipe(
    ofType(persistentCustomerTokenSuccess),
    map((action: any) =>
      gotCustomerTokenInStorage({
        token: action.payload.token,
      })
    )
  )
);

const getCustomerDetail$ = createEffect((action$) =>
  action$.pipe(
    ofType(gotCustomerTokenInStorage, getCustomerDetail),
    debounceTime(100),
    switchMap(() =>
      from(
        graphqlFetch({
          query: `# expects bearer header to be set via context to return data
query getCustomer {
    customer {
        ${CustomerDetail()}
    }
}

`,
        })
      ).pipe(
        map((data: any) => {
          return gotCustomerDetail({
            customer: data.customer,
          });
        }),
        catchError((error: any) => {
          // trường hợp token hết hạn hoặc invalid
          if (
            error?.response?.data?.customer === null &&
            error?.response?.status === 200
          ) {
            console.warn(
              'Customer token invalid. Will clear customer token data'
            );
            return of(getCustomerDetailFailDueToToken({}));
          }
          console.log(error);
          return of(
            appRunTimeError({
              error,
            })
          );
        })
      )
    )
  )
);

const clearCustomerToken$ = createEffect((action$) =>
  action$.pipe(
    ofType(getCustomerDetailFailDueToToken),
    mapTo(clearCustomerToken({}))
  )
);

const doClearCustomerToken$ = createEffect((action$) =>
  action$.pipe(
    ofType(clearCustomerToken),
    map(() => {
      AccountPersistent.removeItem(AccountConstant.TOKEN_KEY);

      return clearCustomerTokenAfter({});
    })
  )
);

const triggerEmptyToken$ = createEffect((action$) =>
  action$.pipe(
    ofType(clearCustomerTokenAfter),
    mergeMap(() =>
      from([emptyCustomerTokenInStorage(), clearDataCustomerAfterLogout()])
    )
  )
);

const registerByEmailPass$ = createEffect((action$) =>
  action$.pipe(
    ofType(registerCustomerByEmailPassword),
    debounceTime(250),
    switchMap((action: any) =>
      from(
        proxyFetch({
          type: 'create-customer-account',
          payload: action.payload,
        })
      ).pipe(
        flatMap((data: any) => {
          if (typeof data?.customer?.token !== 'string') {
            return of(
              registerCustomerByEmailPasswordFail({
                error: new RuntimeError('wrong data format'),
              })
            );
          }
          return from([
            registerCustomerByEmailPasswordSuccess({ customer: data }),
            generateCustomerTokenSuccessAction({
              token: data.customer.token,
            }),
          ]);
        }),
        catchError((error) =>
          of(registerCustomerByEmailPasswordFail({ error }))
        )
      )
    )
  )
);

const whenSocialLogin$ = createEffect((action$) =>
  action$.pipe(
    ofType(socialLoginAction),
    switchMap((value: any) => {
      return from(
        proxyFetch({
          type: 'social-login',
          payload: {
            provider: value.payload.provider,
            token: value.payload.token,
            expires_in: 2592000,
          },
        })
      ).pipe(
        switchMap((res: any) => {
          if (res && res.hasOwnProperty('token')) {
            return from([
              generateCustomerTokenSuccessAction({
                token: res.token,
              }),
            ]);
          } else {
            return of(
              generateCustomerTokenFail({
                error: new RuntimeError('Wrong data response format'),
              })
            );
          }
        }),
        catchError((error) => {
          return of(
            generateCustomerTokenFail({
              error,
            })
          );
        })
      );
    })
  )
);

const whenGetRewardPoint$ = createEffect((action$) =>
  action$.pipe(
    ofType(getRewardPointAction),
    debounceTime(100),
    switchMap(() =>
      from(
        graphqlFetch({
          query: `
          query {
            customer {
                reward_points{
                    balance{
                        points
                        money{
                            currency
                            value
                        }
                    }
                }
            }
        }
`,
        })
      ).pipe(
        map((data: any) => {
          return getRewardPointAfterAction({
            reward_points: data,
          });
        }),
        catchError((error: any) => {
          // trường hợp token hết hạn hoặc invalid
          if (
            error?.response?.data?.customer === null &&
            error?.response?.status === 200
          ) {
            console.warn(
              'Customer token invalid. Will clear customer token data'
            );
            return of(getCustomerDetailFailDueToToken({}));
          }
          return of(
            appRunTimeError({
              error,
            })
          );
        })
      )
    )
  )
);

const whenGetStoreCreditAction$ = createEffect((action$) =>
  action$.pipe(
    ofType(getStoreCreditAction),
    debounceTime(100),
    switchMap(() =>
      from(
        graphqlFetch({
          query: `
          query {
            customer {
              firstname
              lastname
              store_credit {
                enabled
                balance_history(pageSize: 10) {
                  items {
                    action
                    actual_balance {
                      currency
                      value
                    }
                    balance_change {
                      currency
                      value
                    }
                    date_time_changed
                  }
                  page_info {
                    page_size
                    current_page
                    total_pages
                  }
                  total_count
                }
                current_balance {
                  currency
                  value
                }
              }
            }
          }
`,
        })
      ).pipe(
        map((data: any) => {
          return getStoreCreditAfterAction({
            store_credit: data?.customer?.store_credit,
          });
        }),
        catchError((error: any) => {
          // trường hợp token hết hạn hoặc invalid
          if (
            error?.response?.data?.customer === null &&
            error?.response?.status === 200
          ) {
            console.warn(
              'Customer token invalid. Will clear customer token data'
            );
            return of(getCustomerDetailFailDueToToken({}));
          }
          return of(
            appRunTimeError({
              error,
            })
          );
        })
      )
    )
  )
);

const whenGetCustomerReviews$ = createEffect((action$) =>
  action$.pipe(
    ofType(getCustomerReviewAction),
    debounceTime(100),
    switchMap(() =>
      from(
        graphqlFetch({
          query: `
          query {
            customer {
                reviews(pageSize: 20, currentPage: 1) {
                    items {
                        product {
                            name
                            sku
                        }
                        summary
                        text
                        nickname
                        created_at
                        average_rating
                        ratings_breakdown {
                            name
                            value
                        }
                    }
                    page_info {
                        current_page
                        page_size
                        total_pages
                    }
                }
            }
        }
`,
        })
      ).pipe(
        map((data: any) => {
          return getCustomerReviewAfterAction({
            reviews: data,
          });
        }),
        catchError((error: any) => {
          // trường hợp token hết hạn hoặc invalid
          if (
            error?.response?.data?.customer === null &&
            error?.response?.status === 200
          ) {
            console.warn(
              'Customer token invalid. Will clear customer token data'
            );
            return of(getCustomerDetailFailDueToToken({}));
          }
          return of(
            appRunTimeError({
              error,
            })
          );
        })
      )
    )
  )
);

const refreshCustomerSession$ = createEffect((action$, state$) =>
  interval(1000).pipe(
    throttleTime(30000),
    withLatestFrom(state$, (_i, state: any) => [_i, state.account?.customer]),
    filter((d) => typeof d[1] !== 'undefined'),
    switchMap(() => {
      return from(
        graphqlFetch({
          query: `# expects bearer header to be set via context to return data
  query getCustomer {
      customer {
          email
      }
  }
  `,
        })
      ).pipe(
        retry(2),
        map(() => EMPTY)
      );
    }),
    catchError((error: any) => {
      window.location.reload();
      return of(refreshCustomerSessionError({ error }));
    })
  )
);

export const ACCOUNT_EFFECTS = [
  checkCustomerIsLogged$,
  whenGenerateToken$,
  saveCustomerTokenToStorage$,
  registerByEmailPass$,
  gotCustomerToken$,
  getCustomerDetail$,
  clearCustomerToken$,
  doClearCustomerToken$,
  whenSocialLogin$,
  whenGetRewardPoint$,
  whenGetCustomerReviews$,
  whenGetStoreCreditAction$,
  triggerEmptyToken$,
  refreshCustomerSession$,

  ...R_CUSTOMER_ADDRESS_EFFECTS,
  ...PHONE_EFFECTS,
];
