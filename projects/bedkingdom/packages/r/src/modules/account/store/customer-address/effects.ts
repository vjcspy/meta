import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { graphqlFetchForCustomer } from '@modules/account/util/graphqlFetchForCustomer';
import CustomerDetail from '@modules/graphql/schema/CustomerDetail';
import { RuntimeError } from 'chitility/dist/lib/error/RuntimeError';
import { from, of } from 'rxjs';
import { catchError, map, mapTo, switchMap } from 'rxjs/operators';

import {
  createNewCustomerAddressAfterAction,
  deleteCustomerAddressAfterAction,
  getCustomerAddressAction,
  getCustomerAddressAfterAction,
  getCustomerAddressErrorAction,
  updateCustomerAddressAfterAction,
} from './actions';

const whenGetCustomerAddress$ = createEffect((action$) =>
  action$.pipe(
    ofType(getCustomerAddressAction),
    switchMap(() =>
      from(
        graphqlFetchForCustomer({
          query: `
          query getCustomer {
    customer {
        ${CustomerDetail()}
    }
}
          `,
        })
      ).pipe(
        map((data: any) => {
          if (data && data.customer) {
            return getCustomerAddressAfterAction({
              addresses: data.customer.addresses,
              customer: data.customer,
            });
          }

          return getCustomerAddressErrorAction({
            error: new RuntimeError('customer response invalid'),
          });
        }),
        catchError((error) =>
          of(
            getCustomerAddressErrorAction({
              error,
            })
          )
        )
      )
    )
  )
);

const updateCustomerDetailAfterUpdateAdd$ = createEffect((action$) =>
  action$.pipe(
    ofType(
      updateCustomerAddressAfterAction,
      createNewCustomerAddressAfterAction,
      deleteCustomerAddressAfterAction
    ),
    mapTo(getCustomerAddressAction())
  )
);

export const R_CUSTOMER_ADDRESS_EFFECTS = [
  whenGetCustomerAddress$,
  updateCustomerDetailAfterUpdateAdd$,
];
