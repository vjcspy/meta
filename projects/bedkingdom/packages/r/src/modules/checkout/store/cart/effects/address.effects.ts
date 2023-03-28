import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { gotCustomerDetail } from '@modules/account/store/account.actions';
import {
  createNewCustomerAddressAfterAction,
  updateCustomerAddressAfterAction,
} from '@modules/account/store/customer-address/actions';
import { graphqlFetchForCustomer } from '@modules/account/util/graphqlFetchForCustomer';
import {
  checkoutCartAddressSetBillingAddress,
  checkoutCartAddressSetBillingAddressAfter,
  checkoutCartAddressSetBillingAddressError,
  checkoutCartSetShippingAddress,
  checkoutCartSetShippingAddressAfter,
  checkoutCartSetShippingAddressError,
} from '@modules/checkout/store/cart/actions/address.actions';
import { getCartDetailAfter } from '@modules/checkout/store/cart/actions/init.actions';
import { CheckoutConstant } from '@modules/checkout/util/constant';
import { UnknownResponseError } from 'chitility/dist/lib/error/UnknownResponseError';
import isEmpty from 'lodash/isEmpty';
import { from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import CartDetail from '../../../../graphql/schema/CartDetail';

const whenSetNewShippingAddress$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(checkoutCartSetShippingAddress),
    filter(
      (action) =>
        typeof action.payload.address === 'object' &&
        !CheckoutConstant.BILLING_SAME_AS_SHIPPING
    ),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart]),
    filter(([_action, cartState]) => {
      return typeof cartState.cart.id === 'string';
    }),
    switchMap(([action, cartState]) => {
      return from(
        graphqlFetchForCustomer({
          query: `mutation setShippingAddress(
    $cartId: String!
    $firstname: String!
    $lastname: String!
    $street: [String]!
    $telephone: String!
    $province: String!
    $district: String!
    $ward: String!,
    $saveInAddressBook: Boolean!
    $customerNotes: String!
) {
    setShippingAddressesOnCart(
        input: {
            cart_id: $cartId
            shipping_addresses: [
                {
                    address: {
                        firstname: $firstname
                        lastname: $lastname
                        street: $street
                        region: $province
                        postcode: "000000"
                        iz_address_province: $province
                        iz_address_district: $district
                        iz_address_ward: $ward
                        telephone: $telephone
                        country_code: "vn"
                        save_in_address_book: $saveInAddressBook
                    }
                    customer_notes: $customerNotes
                }
            ]
        }
    ) {
        cart {
            ${CartDetail.r('query')}
        }
    }
}
`,
          variables: {
            cartId: cartState.cart.id,
            firstname: action.payload.address.firstname,
            lastname: action.payload.address.lastname,
            telephone: action.payload.address.telephone,
            province: action.payload.address.province,
            district: action.payload.address.district,
            ward: action.payload.address.ward,
            street:
              typeof action.payload.address.street === 'string'
                ? [action.payload.address.street]
                : action.payload.address.street,
            saveInAddressBook:
              action.payload.address.save_in_address_book ?? true,
            customerNotes: action.payload.customerNotes ?? '',
          },
        })
      ).pipe(
        map((res) => {
          if (res?.setShippingAddressesOnCart?.cart) {
            return checkoutCartSetShippingAddressAfter({
              cart: res!.setShippingAddressesOnCart!.cart,
            });
          } else {
            return checkoutCartSetShippingAddressError({
              error: new UnknownResponseError(
                'setShippingAddress response error'
              ),
            });
          }
        }),
        catchError((error) =>
          of(checkoutCartSetShippingAddressError({ error }))
        )
      );
    })
  )
);

const whenSetShippingAddress$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(checkoutCartSetShippingAddress),
    filter(
      (action) =>
        !!action.payload.customerAddressId &&
        !CheckoutConstant.BILLING_SAME_AS_SHIPPING
    ),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart]),
    filter(([_action, cartState]) => {
      return typeof cartState.cart.id === 'string';
    }),
    switchMap(([action, cartState]) => {
      return from(
        graphqlFetchForCustomer({
          query: `
          mutation setExistedShippingAddress(
    $cartId: String!
    $customerAddressId: Int!
    $customerNotes: String!
) {
    setShippingAddressesOnCart(
        input: {
            cart_id: $cartId
            shipping_addresses: [
                {
                    customer_address_id: $customerAddressId
                    customer_notes: $customerNotes
                }
            ]
        }
    ) {
        cart {
           ${CartDetail.r('query')}
        }
    }
}
`,
          variables: {
            cartId: cartState?.customerCartId ?? cartState.cart.id,
            customerNotes: action.payload.customerNotes ?? '',
            customerAddressId: parseInt(action.payload.customerAddressId),
          },
        })
      ).pipe(
        map((res) => {
          if (res?.setShippingAddressesOnCart?.cart) {
            return checkoutCartSetShippingAddressAfter({
              cart: res!.setShippingAddressesOnCart!.cart,
            });
          } else {
            return checkoutCartSetShippingAddressError({
              error: new UnknownResponseError(
                'setShippingAddress response error'
              ),
            });
          }
        }),
        catchError((error) =>
          of(checkoutCartSetShippingAddressError({ error }))
        )
      );
    })
  )
);

const whenSetNewBillingAddress$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(checkoutCartAddressSetBillingAddress),
    filter((action) => action.payload.address),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart]),
    filter(([_action, cartState]) => {
      return typeof cartState.cart.id === 'string';
    }),
    switchMap(([action, cartState]) => {
      return from(
        graphqlFetchForCustomer({
          query: `mutation setBillingAddress(
    $cartId: String!
    $firstname: String!
    $lastname: String!
    $street: [String]!
    $telephone: String!
    $province: String!
    $district: String!
    $ward: String!
    $saveInAddressBook: Boolean!
){
    setBillingAddressOnCart(
        input: {
            cart_id: $cartId
            billing_address: {
                address: {
                    firstname: $firstname
                    lastname: $lastname
                    street: $street
                    region: $province
                    postcode: "000000"
                    iz_address_province: $province
                    iz_address_district: $district
                    iz_address_ward: $ward
                    telephone: $telephone
                    country_code: "vn"
                    save_in_address_book: $saveInAddressBook
                }
            }
        }
    ) {
        cart {
           ${CartDetail.r('query')}
        }
    }
}
`,
          variables: {
            cartId: cartState?.customerCartId ?? cartState.cart.id,
            firstname: action.payload.address.firstname,
            lastname: action.payload.address.lastname,
            telephone: action.payload.address.telephone,
            province: action.payload.address.province,
            district: action.payload.address.district,
            ward: action.payload.address.ward,
            street:
              typeof action.payload.address.street === 'string'
                ? [action.payload.address.street]
                : action.payload.address.street,
            saveInAddressBook:
              action.payload.address.save_in_address_book ?? true,
          },
        })
      ).pipe(
        map((res) => {
          if (res?.setBillingAddressOnCart?.cart) {
            return checkoutCartAddressSetBillingAddressAfter({
              cart: res!.setBillingAddressOnCart!.cart,
            });
          } else {
            return checkoutCartAddressSetBillingAddressError({
              error: new UnknownResponseError(
                'setBillingAddress response error'
              ),
            });
          }
        }),
        catchError((error) =>
          of(checkoutCartAddressSetBillingAddressError({ error }))
        )
      );
    })
  )
);

const whenSetBillingAddress$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(checkoutCartAddressSetBillingAddress),
    filter((action) => action.payload.customerAddressId),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart]),
    filter(([_action, cartState]) => {
      return cartState.cart && typeof cartState.cart.id === 'string';
    }),
    switchMap(([action, cartState]) => {
      return from(
        graphqlFetchForCustomer({
          query: `
          mutation setExistedBillingAddress(
    $cartId: String!
    $customerAddressId: Int!
    $sameAsBilling: Boolean!
) {
    setBillingAddressOnCart(
        input: {
            cart_id: $cartId
            billing_address: {
                customer_address_id: $customerAddressId
                same_as_shipping: $sameAsBilling
            }

        }
    ) {
        cart {
           ${CartDetail.r('query')}
        }
    }
}
`,
          variables: {
            cartId: cartState?.customerCartId ?? cartState.cart.id,
            customerAddressId: parseInt(action.payload.customerAddressId),
            sameAsBilling: CheckoutConstant.BILLING_SAME_AS_SHIPPING,
          },
        })
      ).pipe(
        map((res) => {
          if (res?.setBillingAddressOnCart?.cart) {
            return checkoutCartAddressSetBillingAddressAfter({
              cart: res!.setBillingAddressOnCart!.cart,
            });
          } else {
            return checkoutCartAddressSetBillingAddressError({
              error: new UnknownResponseError(
                'setBillingAddress response error'
              ),
            });
          }
        }),
        catchError((error) =>
          of(checkoutCartAddressSetBillingAddressError({ error }))
        )
      );
    })
  )
);

const resolveDefaultShippingMethod$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(getCartDetailAfter, gotCustomerDetail),
    withLatestFrom(state$, (v1, v2) => [
      v1,
      v2.checkout?.cart,
      v2.account?.customer,
    ]),
    filter(
      (data: any) =>
        data[1] &&
        data[2] &&
        typeof data[1]['customerCartId'] === 'string' &&
        !!data[2]['default_shipping']
    ),
    filter((data: any) => {
      // chỉ set default khi cart chưa có shipping address
      return isEmpty(data[1]?.cart?.['shipping_addresses']);
    }),
    switchMap((data: any) => {
      const customerAddressId = data[2]['default_shipping'];

      return from([
        checkoutCartSetShippingAddress({
          customerAddressId,
        }),
        checkoutCartAddressSetBillingAddress({
          customerAddressId,
        }),
      ]);
    })
  )
);

const setShippingAddressAfterUpdate$ = createEffect((action$) =>
  action$.pipe(
    ofType(
      updateCustomerAddressAfterAction,
      createNewCustomerAddressAfterAction
    ),
    map((action) => {
      return checkoutCartAddressSetBillingAddress({
        customerAddressId: action.payload.address.id,
      });
    })
  )
);

export const CHECKOUT_CART_ADDRESS = [
  whenSetNewShippingAddress$,
  whenSetNewBillingAddress$,
  whenSetShippingAddress$,
  whenSetBillingAddress$,
  resolveDefaultShippingMethod$,
  setShippingAddressAfterUpdate$,
];
