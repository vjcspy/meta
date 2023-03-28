import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { graphqlFetchForCustomer } from '@modules/account/util/graphqlFetchForCustomer';
import {
  applyCouponToCartAction,
  applyCouponToCartAfterAction,
  applyCouponToCartErrorAction,
  removeCouponFromCartAction,
  removeCouponFromCartAfterAction,
  removeCouponFromCartErrorAction,
} from '@modules/checkout/store/cart/actions/coupon.actions';
import CartDetail from '@modules/graphql/schema/CartDetail';
import { RuntimeError } from 'chitility/dist/lib/error/RuntimeError';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import {from} from "rxjs";

const whenApplyCoupon$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(applyCouponToCartAction),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout?.cart]),
    switchMap(([action, _cart]) =>
      from(
        graphqlFetchForCustomer({
          query: `mutation applyCouponToCart($cart_id: String!, $coupon_code: String!) {
            applyCouponToCart(input: {
              cart_id: $cart_id,
              coupon_code: $coupon_code
            }) {
              cart {
                ${CartDetail.r('query')}
               }
              } 
          }
`,
          variables: {
            cart_id: action.payload.cart_id,
            coupon_code: action.payload.coupon_code,
          },
        })
      ).pipe(
        map((data) => {
          if (!!data?.applyCouponToCart && !!data?.applyCouponToCart?.cart) {
            return applyCouponToCartAfterAction({
              cart: data?.applyCouponToCart?.cart,
            });
          } else {
            return applyCouponToCartErrorAction({
              error: new RuntimeError('Wrong apply coupon to cart'),
            });
          }
        })
      )
    )
  )
);

const whenRemoveCoupon$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(removeCouponFromCartAction),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout?.cart]),
    switchMap(([action, _cart]) =>
      from(
        graphqlFetchForCustomer({
          query: `mutation removeCouponFromCart($cart_id: String!) {
            removeCouponFromCart(input: {
              cart_id: $cart_id
            }) {
              cart {
                  ${CartDetail.r('query')}
              }
            }
          }
`,
          variables: {
            cart_id: action.payload.cart_id,
          },
        })
      ).pipe(
        map((data) => {
          if (
            !!data.removeCouponFromCart &&
            !!data?.removeCouponFromCart?.cart
          ) {
            return removeCouponFromCartAfterAction({
              cart: data.removeCouponFromCart.cart,
            });
          } else {
            return removeCouponFromCartErrorAction({
              error: new RuntimeError('Wrong remove coupon from cart'),
            });
          }
        })
      )
    )
  )
);

export const CHECKOUT_CART_COUPON = [whenApplyCoupon$, whenRemoveCoupon$];
