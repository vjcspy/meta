import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import {
  clearCustomerToken,
  emptyCustomerTokenInStorage,
  gotCustomerDetail,
} from '@modules/account/store/account.actions';
import type { AccountState } from '@modules/account/store/account.state';
import { graphqlFetchForCustomer } from '@modules/account/util/graphqlFetchForCustomer';
import { appRunTimeError } from '@modules/app/store/app.actions';
import {
  checkGuestCartInStorage,
  createGuestEmptyCart,
  createGuestEmptyCartFail,
  createGuestEmptyCartSuccess,
  emptyGuestCartInStorage,
  getCartDetail,
  getCartDetailError,
  getCurrentCart,
  getCustomerCart,
  getGuestCart,
  gotCustomerCart,
  gotGuestCartInStorage,
  mergeGuestCart,
  mergeGuestCartAfter,
  mergeGuestCartError,
  saveGuestCartToStorageFail,
  saveGuestCartToStorageSuccess,
} from '@modules/checkout/store/cart/actions/init.actions';
import type { CartState } from '@modules/checkout/store/cart/cart.state';
import { CheckoutPersistent } from '@modules/checkout/util/checkout-persistent';
import { CheckoutConstant } from '@modules/checkout/util/constant';
import { RuntimeError } from 'chitility/dist/lib/error/RuntimeError';
import { EMPTY, from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mapTo,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

/**
 * Sau khi resolved customer state thì mới bắt đầu lấy thông tin cart
 *
 * @type {(action$: ActionsObservable<{type: string}>, stateObservable: StateObservable<any>) => Observable<{type: string}>}
 */
const triggerGetCurrentCart$ = createEffect((action$) =>
  action$.pipe(
    ofType(gotCustomerDetail, emptyCustomerTokenInStorage),
    mapTo(getCurrentCart({}))
  )
);

/**
 * Chỉ lấy cart khi đã resolved guest/customer
 *
 * @type {(action$: ActionsObservable<{type: string}>, stateObservable: StateObservable<any>) => Observable<{type: string}>}
 */
const whenGetCurrentCart$ = createEffect((action$, stateObservable$) =>
  action$.pipe(
    ofType(getCurrentCart),
    withLatestFrom(stateObservable$, (v1, v2) => [v1, v2.account]),
    switchMap(([_, accountState]) => {
      // Kể cả không allow guest checkout thì vẫn phải init guest cart nếu chưa đăng nhập. Sau khi đăng nhập sẽ merge cart
      // check customer trong state sẽ tránh được rất nhiều case có dữ liệu rác trong storage
      if (accountState.customer) {
        return of(getCustomerCart({ token: accountState.token }));
      } else {
        return of(getGuestCart({}));
      }
    })
  )
);

/* -------------------------------------- GUEST -------------------------------------- */

const whenGetGuestCart$ = createEffect((action$) =>
  action$.pipe(
    ofType(getGuestCart, saveGuestCartToStorageSuccess),
    mapTo(checkGuestCartInStorage({}))
  )
);

const whenCheckGuestCartInStorage$ = createEffect((action$) =>
  action$.pipe(
    ofType(checkGuestCartInStorage),
    switchMap(() =>
      from(CheckoutPersistent.getItem(CheckoutConstant.GUEST_CART_ID_KEY)).pipe(
        map((cartId) => {
          if (cartId) {
            return gotGuestCartInStorage({
              cartId,
            });
          } else {
            return emptyGuestCartInStorage({});
          }
        })
      )
    )
  )
);

const whenEmptyGuestCart$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(emptyGuestCartInStorage),
    withLatestFrom(state$, (v1, v2) => v2.account),
    filter(
      (accountState: AccountState) =>
        accountState.isResolvedCustomerState && !accountState.token
    ),
    mapTo(createGuestEmptyCart({}))
  )
);

const whenCreateEmptyCart$ = createEffect((action$) =>
  action$.pipe(
    ofType(createGuestEmptyCart),
    switchMap(() =>
      from(
        graphqlFetchForCustomer({
          query: `mutation {
  createEmptyCart
}`,
        })
      ).pipe(
        map((data) => {
          if (data && data.hasOwnProperty('createEmptyCart')) {
            return createGuestEmptyCartSuccess({
              cartId: data.createEmptyCart,
            });
          } else {
            return createGuestEmptyCartFail({
              error: new RuntimeError('Wrong data response format'),
            });
          }
        }),
        catchError((error) => of(createGuestEmptyCartFail({ error })))
      )
    )
  )
);

const saveGuestCartToStorage$ = createEffect((action$) =>
  action$.pipe(
    ofType(createGuestEmptyCartSuccess),
    switchMap((action) =>
      from(
        CheckoutPersistent.saveItem(
          CheckoutConstant.GUEST_CART_ID_KEY,
          action.payload.cartId,
          604800
        )
      ).pipe(
        map(() => {
          return saveGuestCartToStorageSuccess({
            cartId: action.payload.cartId,
          });
        }),
        catchError((error) =>
          of(
            saveGuestCartToStorageFail({
              error,
            })
          )
        )
      )
    )
  )
);

const beforeGetGuestCartDetail$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(gotGuestCartInStorage),
    withLatestFrom(state$, (v1, v2) => [v1, v2.account]),
    filter(
      ([_, accountState]) =>
        accountState.isResolvedCustomerState && !accountState.token
    ),
    map(([action, _]) => getCartDetail({ cartId: action.payload.cartId }))
  )
);

/* -------------------------------------- CUSTOMER -------------------------------------- */

/**
 * Khi customer token invalid cũng cần phải xoá luôn guest cart để tạo new empty guest cart
 * @type {(action$: ActionsObservable<{type: string}>, stateObservable: StateObservable<any>) => Observable<{type: string}>}
 */
const whenClearGuestCartToken$ = createEffect((action$) =>
  action$.pipe(
    ofType(clearCustomerToken),
    switchMap(() =>
      from(
        CheckoutPersistent.removeItem(CheckoutConstant.GUEST_CART_ID_KEY)
      ).pipe(map(() => EMPTY))
    )
  )
);

const whenGetCustomerCart$ = createEffect((action$) =>
  action$.pipe(
    ofType(getCustomerCart),
    switchMap(() =>
      from(
        graphqlFetchForCustomer({
          query: `{
  customerCart{
    id
  }
}`,
        })
      ).pipe(
        map((data) => {
          if (data && data?.customerCart?.id) {
            return gotCustomerCart({
              cartId: data.customerCart.id,
            });
          } else {
            return appRunTimeError({
              error: new RuntimeError(
                'wrong data format when get customer cart'
              ),
            });
          }
        }),
        catchError((error) => {
          return of(getCartDetailError({ error }));
        })
      )
    )
  )
);

const beforeMergeGuestCartDueToGotCustomerCart$ = createEffect((action$) =>
  action$.pipe(ofType(gotCustomerCart), mapTo(mergeGuestCart({})))
);

const whenMergeGuestCart$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(mergeGuestCart),
    withLatestFrom(state$, (v1, v2) => v2.checkout.cart),
    filter(
      (cartState: CartState) =>
        !!cartState.customerCartId &&
        cartState.customerCartId !== cartState?.cart?.id
    ),
    switchMap((cartState: CartState) => {
      if (cartState.guestCartId) {
        return from(
          graphqlFetchForCustomer({
            query: `mutation mergeCarts($sourceCartId: String!, $destinationCartId: String!) {
    mergeCarts(
        source_cart_id: $sourceCartId
        destination_cart_id: $destinationCartId
    ) {
        id
        # TODO: Create/use MiniCartFragment, etc.
        items {
            id
            product {
                id
                small_image {
                    label
                }
                price {
                    regularPrice {
                        amount {
                            value
                        }
                    }
                }
            }
        }
    }
}
`,
            variables: {
              sourceCartId: cartState.guestCartId,
              destinationCartId: cartState.customerCartId,
            },
          })
        ).pipe(
          map((data) => {
            if (data?.mergeCarts?.id) {
              CheckoutPersistent.removeItem(CheckoutConstant.GUEST_CART_ID_KEY);
              return mergeGuestCartAfter({
                cartId: data?.mergeCarts?.id,
              });
            } else {
              return mergeGuestCartError({
                error: new RuntimeError(
                  'wrong data format when merge guest cart'
                ),
              });
            }
          }),
          catchError((error: any) => {
            if (error?.response?.data?.mergeCarts?.id) {
              CheckoutPersistent.removeItem(CheckoutConstant.GUEST_CART_ID_KEY);
              return from([
                mergeGuestCartAfter({
                  cartId: error?.response?.data?.mergeCarts?.id,
                }),
                mergeGuestCartError({
                  error,
                }),
              ]);
            }

            return of(
              mergeGuestCartError({
                error,
              })
            );
          })
        );
      } else {
        CheckoutPersistent.removeItem(CheckoutConstant.GUEST_CART_ID_KEY);
        return of(
          mergeGuestCartAfter({
            cartId: cartState.customerCartId!,
          })
        );
      }
    })
  )
);

const beforeGetCartDetailDueToMergeCart$ = createEffect((action$) =>
  action$.pipe(
    ofType(mergeGuestCartAfter),
    map((action) =>
      getCartDetail({
        cartId: action.payload.cartId,
      })
    )
  )
);

export const CHECKOUT_CART_INIT_EFFECTS = [
  /*GUEST*/
  triggerGetCurrentCart$,
  whenGetCurrentCart$,
  whenGetGuestCart$,
  whenCheckGuestCartInStorage$,
  whenEmptyGuestCart$,
  whenCreateEmptyCart$,
  saveGuestCartToStorage$,
  beforeGetGuestCartDetail$,
  /*CUSTOMER*/
  whenClearGuestCartToken$,
  whenGetCustomerCart$,
  beforeMergeGuestCartDueToGotCustomerCart$,
  whenMergeGuestCart$,
  beforeGetCartDetailDueToMergeCart$,
];
