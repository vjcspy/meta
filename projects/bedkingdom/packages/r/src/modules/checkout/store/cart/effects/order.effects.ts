import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { getCustomerDetail } from '@modules/account/store/account.actions';
import { graphqlFetchForCustomer } from '@modules/account/util/graphqlFetchForCustomer';
import { getCurrentCart } from '@modules/checkout/store/cart/actions/init.actions';
import {
  getUrlAction,
  getUrlAfterAction,
  getUrlErrorAction,
  placeOrder,
  placeOrderAfter,
  placeOrderError,
} from '@modules/checkout/store/cart/actions/order.actions';
import { proxyFetch } from '@util/proxy-fetch';
import { UnknownResponseError } from 'chitility/dist/lib/error/UnknownResponseError';
import { from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

const whenPlaceOrder$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(placeOrder),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart]),
    filter(
      ([action, cartState]) =>
        action.payload.resolveByEffect && typeof cartState.cart.id === 'string'
    ),
    switchMap(([_action, cartState]) => {
      return from(
        graphqlFetchForCustomer({
          query: `
          mutation placeOrder($cartId: String!) {
    placeOrder(input: {cart_id: $cartId}) {
        order {
            order_number
        }
    }
}
`,
          variables: {
            cartId: cartState.cart.id,
          },
        })
      ).pipe(
        map((res) => {
          if (res?.placeOrder?.order) {
            return placeOrderAfter({
              order: res!.placeOrder!.order,
            });
          } else {
            return placeOrderError({
              error: new UnknownResponseError('when place Order'),
            });
          }
        }),
        catchError((error) => of(placeOrderError({ error })))
      );
    })
  )
);

const whenGetPayUrl$ = createEffect((action$) =>
  action$.pipe(
    ofType(getUrlAction),
    switchMap((value) =>
      from(
        proxyFetch({
          type: 'get-pay-url',
          payload: {
            order_number: value.payload.order_number,
          },
        })
      ).pipe(
        map((url) => {
          console.log('url', url);
          return getUrlAfterAction({ url });
        }),
        catchError((error) => of(getUrlErrorAction({ error })))
      )
    )
  )
);

const afterPlaceOrder$ = createEffect((action$) =>
  action$.pipe(
    ofType(placeOrderAfter),
    switchMap(() => from([getCurrentCart(), getCustomerDetail()]))
  )
);

export const CHECKOUT_ORDER_EFFECTS = [
  whenPlaceOrder$,
  afterPlaceOrder$,
  whenGetPayUrl$,
];
