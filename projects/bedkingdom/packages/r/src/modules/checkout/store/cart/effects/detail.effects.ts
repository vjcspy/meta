import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { graphqlFetchForCustomer } from '@modules/account/util/graphqlFetchForCustomer';
import { appRunTimeError } from '@modules/app/store/app.actions';
import {
  checkoutCartDetailAddCouponCodeAction,
  checkoutCartDetailAddCouponCodeAfterAction,
  checkoutCartDetailAddCouponCodeErrorAction,
  checkoutCartDetailRemoveCouponCodeAction,
  checkoutCartDetailRemoveCouponCodeAfterAction,
  checkoutCartDetailRemoveCouponCodeErrorAction,
  checkoutCartDetailRemoveItemAction,
  checkoutCartDetailRemoveItemAfterAction,
  checkoutCartDetailRemoveItemErrorAction,
  updateCartItemAction,
  updateCartItemAfterAction,
  updateCartItemError,
  updateMultiCartItemAction,
  updateMultiCartItemAfterAction,
} from '@modules/checkout/store/cart/actions/detail.actions';
import {
  getCartDetail,
  getCartDetailAfter,
  getCartDetailError,
} from '@modules/checkout/store/cart/actions/init.actions';
import { clearDataWhenError } from '@modules/checkout/util/cart/clearDataWhenError';
import CartDetail from '@modules/graphql/schema/CartDetail';
import { RuntimeError } from 'chitility/dist/lib/error/RuntimeError';
import { from, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

const whenGetCartDetail$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(...[getCartDetail, updateCartItemError]),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout?.cart]),
    switchMap(([action, cart]) =>
      from(
        graphqlFetchForCustomer({
          // Lấy từ queries graphql. Nếu muốn sửa thì phải sửa trong folder queries trước
          query: `query getCartDetails($cartId: String!) {
    cart(cart_id: $cartId) {
        ${CartDetail.r('query')}
    }
}
`,
          variables: {
            cartId:
              cart?.customerCartId ?? action.payload.cartId ?? cart.cart?.id,
          },
        })
      ).pipe(
        /*
         * TODO: handle khi get cart detail error
         * @see https://chiaki.atlassian.net/browse/KP-139
         * */
        map((data) => {
          if (data && data?.cart) {
            return getCartDetailAfter({
              cart: data.cart,
            });
          } else {
            return appRunTimeError({
              error: new RuntimeError('Wrong data format when get cart detail'),
            });
          }
        }),
        catchError((error: any) => {
          if (error?.response?.data?.cart?.id) {
            return from([
              getCartDetailAfter({
                cart: error?.response?.data?.cart,
              }),
              getCartDetailError({
                error,
              }),
            ]);
          }

          clearDataWhenError();
          return of(
            getCartDetailError({
              error,
            })
          );
        })
      )
    )
  )
);

const whenUpdateCartItem$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(updateCartItemAction),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout?.cart]),
    switchMap(([action, cart]) =>
      from(
        graphqlFetchForCustomer({
          query: `
         mutation updateItemInCart($cartId: String!, $itemId: Int!, $quantity: Float!) {
    updateCartItems(
        input: {
            cart_id: $cartId
            cart_items: [{ cart_item_id: $itemId, quantity: $quantity }]
        }
    ) {
        cart {
           ${CartDetail.r('query')}
        }
    }
}
          `,
          variables: {
            cartId: cart?.customerCartId ?? action.payload.cartId,
            itemId: action.payload.cartItemId,
            quantity: action.payload.qty,
          },
        })
      ).pipe(
        map((data) => {
          if (data.updateCartItems?.cart) {
            return updateCartItemAfterAction({
              cart: data.updateCartItems.cart,
            });
          } else {
            return updateCartItemError({
              error: new RuntimeError('Wrong update cart item response data'),
              cartItemId: action.payload.cartItemId,
            });
          }
        }),
        catchError((error: any) =>
          of(
            updateCartItemError({
              error,
              cartItemId: action.payload.cartItemId,
            })
          )
        )
      )
    )
  )
);

const whenUpdateMultiCartItem$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(updateMultiCartItemAction),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout?.cart]),
    switchMap(([action, cart]) =>
      from(
        graphqlFetchForCustomer({
          query: `
         mutation updateItemInCart($cartId: String!, $cartItems: [CartItemUpdateInput]!) {
    updateCartItems(
        input: {
            cart_id: $cartId
            cart_items: $cartItems
        }
    ) {
        cart {
           ${CartDetail.r('query')}
        }
    }
}
          `,
          variables: {
            cartId: cart?.customerCartId ?? action.payload.cartId,
            cartItems: action.payload.dataItemsCart,
          },
        })
      ).pipe(
        map((data) => {
          if (data.updateCartItems?.cart) {
            return updateMultiCartItemAfterAction({
              cart: data.updateCartItems.cart,
            });
          } else {
            return updateCartItemError({
              error: new RuntimeError('Wrong update cart item response data'),
              cartItemId: action.payload.cartItemId,
            });
          }
        }),
        catchError((error: any) =>
          of(
            updateCartItemError({
              error,
              cartItemId: action.payload.cartItemId,
            })
          )
        )
      )
    )
  )
);

const whenRemoveItemOnCart$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(checkoutCartDetailRemoveItemAction),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout?.cart]),
    switchMap(([action, cart]) =>
      from(
        graphqlFetchForCustomer({
          query: `mutation removeItemFromCart($cartId: String!, $itemId: Int!) {
    removeItemFromCart(input: { cart_id: $cartId, cart_item_id: $itemId })
    {
        cart{
             ${CartDetail.r('query')}
        }
    }
}
`,
          variables: {
            cartId: cart?.customerCartId ?? action.payload.cartId,
            itemId: action.payload.cartItemId,
          },
        })
      ).pipe(
        map((data) => {
          if (data.removeItemFromCart?.cart) {
            return checkoutCartDetailRemoveItemAfterAction({
              cart: data.removeItemFromCart.cart,
            });
          } else {
            return checkoutCartDetailRemoveItemErrorAction({
              error: new RuntimeError('Wrong update cart item response data'),
              cartItemId: action.payload.cartItemId,
            });
          }
        }),
        catchError((error: any) =>
          of(
            checkoutCartDetailRemoveItemErrorAction({
              error,
              cartItemId: action.payload.cartItemId,
            })
          )
        )
      )
    )
  )
);

const whenAddCouponCode$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(checkoutCartDetailAddCouponCodeAction),
    debounceTime(500),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout?.cart]),
    switchMap(([action, cart]) =>
      from(
        graphqlFetchForCustomer({
          query: `
          mutation applyCouponToCart($cartId: String!,$couponCode: String!) {
    applyCouponToCart(
        input: {
            cart_id: $cartId,
            coupon_code: $couponCode
        }
    ) {
        cart {
            ${CartDetail.r('query')}
        }
    }
}
`,
          variables: {
            cartId: cart?.customerCartId ?? action.payload.cartId,
            couponCode: action.payload.couponCode,
          },
        })
      ).pipe(
        map((data) => {
          if (data.applyCouponToCart?.cart) {
            return checkoutCartDetailAddCouponCodeAfterAction({
              cart: data.applyCouponToCart.cart,
            });
          } else {
            return checkoutCartDetailAddCouponCodeErrorAction({
              error: new RuntimeError('Wrong add coupon response data'),
            });
          }
        }),
        catchError((error: any) =>
          of(
            checkoutCartDetailAddCouponCodeErrorAction({
              error,
            })
          )
        )
      )
    )
  )
);

const whenRemoveCoupon$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(checkoutCartDetailRemoveCouponCodeAction),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout?.cart]),
    switchMap(([action, cart]) =>
      from(
        graphqlFetchForCustomer({
          query: `mutation removeCouponFromCart($cartId: String!) {
            removeCouponFromCart(input: {
              cart_id: $cartId
            }) {
              cart {
                  ${CartDetail.r('query')}
                }
              }
          }
`,
          variables: {
            cartId: cart?.customerCartId ?? action.payload.cartId,
          },
        })
      ).pipe(
        map((data) => {
          if (
            !!data.removeCouponFromCart &&
            !!data?.removeCouponFromCart?.cart
          ) {
            return checkoutCartDetailRemoveCouponCodeAfterAction({
              cart: data.removeCouponFromCart.cart,
            });
          } else {
            return checkoutCartDetailRemoveCouponCodeErrorAction({
              error: new RuntimeError('Wrong remove coupon from cart'),
            });
          }
        }),
        catchError((error: any) =>
          of(
            checkoutCartDetailRemoveCouponCodeErrorAction({
              error,
            })
          )
        )
      )
    )
  )
);

export const CHECKOUT_CART_DETAIL_EFFECTS = [
  whenGetCartDetail$,
  whenUpdateCartItem$,
  whenRemoveItemOnCart$,
  whenAddCouponCode$,
  whenRemoveCoupon$,
  whenUpdateMultiCartItem$,
];
