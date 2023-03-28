import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { graphqlFetchForCustomer } from '@modules/account/util/graphqlFetchForCustomer';
import { checkoutCartAddressSetBillingAddressAfter } from '@modules/checkout/store/cart/actions/address.actions';
import {
  getPaymentMethod,
  getPaymentMethodAfter,
  getPaymentMethodError,
  setPaymentMethod,
  setPaymentMethodAfter,
  setPaymentMethodError,
} from '@modules/checkout/store/cart/actions/payment-method.actions';
import { UnknownResponseError } from 'chitility/dist/lib/error/UnknownResponseError';
import { from, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  mapTo,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import CartDetail from '../../../../graphql/schema/CartDetail';

const getPaymentMethod$ = createEffect((action$) =>
  action$.pipe(
    ofType(checkoutCartAddressSetBillingAddressAfter),
    mapTo(getPaymentMethod({}))
  )
);

const whenGetPaymentMethod$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(getPaymentMethod),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart]),
    filter(([_action, cartState]) => typeof cartState.cart.id === 'string'),
    switchMap(([_action, cartState]) => {
      return from(
        graphqlFetchForCustomer({
          query: `query getAvailablePaymentMethod($cartId:String!){
    cart(cart_id: $cartId) {
        available_payment_methods {
            code
            title
        }
    }
}
`,
          variables: {
            cartId: cartState.cart.id,
          },
        })
      ).pipe(
        map((res: any) => {
          if (res?.cart) {
            return getPaymentMethodAfter({ cart: res.cart });
          } else {
            return getPaymentMethodError({
              error: new UnknownResponseError(
                'when get available payment method'
              ),
            });
          }
        }),
        catchError((error) => of(getPaymentMethodError({ error })))
      );
    })
  )
);

const whenSetPaymentMethod$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(setPaymentMethod),
    debounceTime(200),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart]),
    filter(([_action, cartState]) => typeof cartState.cart.id === 'string'),
    switchMap(([action, cartState]) => {
      return from(
        graphqlFetchForCustomer({
          query: `
          mutation setPaymentMethod($cartId: String!, $code: String!){
    setPaymentMethodOnCart(input: {
        cart_id: $cartId
        payment_method: {
            code: $code
        }
    }) {
        cart {
            ${CartDetail.r('query')}
        }
    }
}

          `,
          variables: {
            cartId: cartState.cart.id,
            code: action.payload.methodCode,
          },
        })
      ).pipe(
        map((res: any) => {
          if (
            typeof res.setPaymentMethodOnCart?.cart?.selected_payment_method
              ?.code === 'string'
          ) {
            return setPaymentMethodAfter({
              cart: res.setPaymentMethodOnCart!.cart,
            });
          } else {
            return setPaymentMethodError({
              error: new UnknownResponseError('when set payment'),
            });
          }
        }),
        catchError((error) =>
          of(
            setPaymentMethodError({
              error,
            })
          )
        )
      );
    })
  )
);

export const CHECKOUT_CART_PAYMENT_METHOD = [
  getPaymentMethod$,
  whenGetPaymentMethod$,
  whenSetPaymentMethod$,
];
