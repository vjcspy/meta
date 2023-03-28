import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { graphqlFetchForCustomer } from '@modules/account/util/graphqlFetchForCustomer';
import { appRunTimeError } from '@modules/app/store/app.actions';
import {
  reorderCartAction,
  reorderCartAfterAction,
  reorderCartErrorAction,
} from '@modules/checkout/store/cart/actions/reorder.actions';
import CartDetail from '@modules/graphql/schema/CartDetail';
import { RuntimeError } from 'chitility/dist/lib/error/RuntimeError';
import { from, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

const whenReorderCart$ = createEffect((action$, _state$) =>
  action$.pipe(
    ofType(reorderCartAction),
    switchMap((action) =>
      from(
        graphqlFetchForCustomer({
          query: `mutation reorderItems($orderNumber: String!) {
    reorderItems(orderNumber: $orderNumber) {
       cart{
        ${CartDetail.r('query')}
        }
    }
}
`,
          variables: {
            orderNumber: action.payload.orderNumber,
          },
        })
      ).pipe(
        map((data) => {
          if (data && data?.reorderItems?.cart) {
            return reorderCartAfterAction({
              cart: data?.reorderItems?.cart,
            });
          } else {
            return appRunTimeError({
              error: new RuntimeError('Wrong data format when get cart detail'),
            });
          }
        }),
        catchError((error: any) => {
          return of(
            reorderCartErrorAction({
              error,
            })
          );
        })
      )
    )
  )
);

export const CHECKOUT_REORDER_EFFECTS = [whenReorderCart$];
