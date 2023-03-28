import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { graphqlFetchForCustomer } from '@modules/account/util/graphqlFetchForCustomer';
import { checkoutCartSetShippingAddressAfter } from '@modules/checkout/store/cart/actions/address.actions';
import { getCartDetailAfter } from '@modules/checkout/store/cart/actions/init.actions';
import {
  setShippingMethod,
  setShippingMethodAfter,
  setShippingMethodError,
} from '@modules/checkout/store/cart/actions/shipping-method.actions';
import { UnknownResponseError } from 'chitility/dist/lib/error/UnknownResponseError';
import {from, of} from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import CartDetail from '../../../../graphql/schema/CartDetail';

const whenSetShippingMethod$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(setShippingMethod),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart]),
    switchMap(([action, cartState]) => {
      return from(
        graphqlFetchForCustomer({
          query: `
        mutation setShippingMethodOnCart($cartId: String!, $carrierCode: String!, $methodCode:String!){
    setShippingMethodsOnCart(input: {
        cart_id: $cartId
        shipping_methods: [
            {
                carrier_code: $carrierCode
                method_code: $methodCode
            }
        ]
    }) {
        cart {
            ${CartDetail.r('query')}
        }
    }
}
`,
          variables: {
            cartId: cartState.cart.id,
            carrierCode: action.payload.carrierCode,
            methodCode: action.payload.methodCode,
          },
        })
      ).pipe(
        map((res: any) => {
          if (res?.setShippingMethodsOnCart?.cart) {
            return setShippingMethodAfter({
              cart: res!.setShippingMethodsOnCart!.cart,
            });
          } else {
            return setShippingMethodError({
              error: new UnknownResponseError('when set shipping method'),
            });
          }
        }),
        catchError((error) =>
          of(
            setShippingMethodError({
              error,
            })
          )
        )
      );
    })
  )
);

// Do L4L không có phương thức vận chuyển nào khác free nên cứ sau khi set shipping address thì tự động chọn shipping method: freeshipping
const whenUpdateShippingAddress$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(checkoutCartSetShippingAddressAfter, getCartDetailAfter),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart]),
    filter((action) => {
      if (
        Array.isArray(action) &&
        action[0].type === '+CHECKOUT_CART_INIT/GET_CART_DETAIL_AFTER'
      ) {
        const cart = action[1].cart;
        if (
          cart?.id &&
          cart?.shipping_addresses[0]?.selected_shipping_method == null
        ) {
          if (
            Array.isArray(
              cart?.shipping_addresses[0]?.available_shipping_methods
            ) &&
            cart?.shipping_addresses[0]?.available_shipping_methods.length === 1
          ) {
            return true;
          }
        }
      }

      return false;
    }),
    switchMap(([action, cartState]) => {
      return from(
        graphqlFetchForCustomer({
          query: `
        mutation setShippingMethodOnCart($cartId: String!, $carrierCode: String!, $methodCode:String!){
    setShippingMethodsOnCart(input: {
        cart_id: $cartId
        shipping_methods: [
            {
                carrier_code: $carrierCode
                method_code: $methodCode
            }
        ]
    }) {
        cart {
            ${CartDetail.r('query')}
        }
    }
}
`,
          variables: {
            cartId: cartState.cart?.id,
            carrierCode:
              cartState?.cart?.shipping_addresses[0]
                ?.available_shipping_methods[0]?.carrier_code,
            methodCode:
              cartState?.cart?.shipping_addresses[0]
                ?.available_shipping_methods[0]?.method_code,
          },
        })
      ).pipe(
        map((res: any) => {
          if (res?.setShippingMethodsOnCart?.cart) {
            return setShippingMethodAfter({
              cart: res!.setShippingMethodsOnCart!.cart,
            });
          } else {
            return setShippingMethodError({
              error: new UnknownResponseError('when set shipping method'),
            });
          }
        }),
        catchError((error) =>
          of(
            setShippingMethodError({
              error,
            })
          )
        )
      );
    })
  )
);
export const CHECKOUT_CART_SHIPPING_METHOD_EFFECTS = [
  whenSetShippingMethod$,
  whenUpdateShippingAddress$,
];
