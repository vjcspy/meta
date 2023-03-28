import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { ContentConstant } from '@modules/content/util/constant';
import { ContentPersistent } from '@modules/content/util/content-persistent';
import { proxyFetch } from '@util/proxy-fetch';
import { Registry } from 'chitility';
import { EMPTY, from, of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import {
  getContentAddressDataAction,
  getContentAddressDataAfterAction,
  getContentAddressDataErrorAction,
} from './actions';

const whenGetAddressData$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(getContentAddressDataAction),
    withLatestFrom(state$, (v1, v2) => [v1, v2.content.isLoadedAddressData]),
    filter((data: any) => data[1] !== true),
    switchMap(() => {
      return from(
        proxyFetch({
          type: 'get-address-data',
          payload: {},
        })
      ).pipe(
        map((addressData) => {
          ContentPersistent.saveItem(
            ContentConstant.ADDRESS_DATA_KEY,
            addressData
          );

          Registry.getInstance().register(
            ContentConstant.ADDRESS_DATA_KEY,
            addressData
          );

          return getContentAddressDataAfterAction({ addressData });
        }),
        catchError((error) => of(getContentAddressDataErrorAction({ error })))
      );
    })
  )
);

const getAddressDataFromCache$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(getContentAddressDataAction),
    withLatestFrom(state$, (v1, v2) => [v1, v2.content.isLoadedAddressData]),
    filter((data) => data[1] !== true),
    switchMap(() =>
      from(ContentPersistent.getItem(ContentConstant.ADDRESS_DATA_KEY)).pipe(
        switchMap((addressData: any) => {
          if (addressData) {
            Registry.getInstance().register(
              ContentConstant.ADDRESS_DATA_KEY,
              addressData
            );

            return of(getContentAddressDataAfterAction({ addressData }));
          } else {
            return of(EMPTY);
          }
        })
      )
    )
  )
);
//
// const whenCreateCustomerAddress$ = createEffect((action$, state$) =>
//   action$.pipe(
//     ofType(createCustomerAddress),
//     withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.address]),
//     switchMap(([action, customerState]) => {
//       return fromPromise(
//         graphqlFetchForCustomer({
//           query: `
//    mutation createCustomerAddress( $telephone: String , $city: String , $firstname: String, $lastname: String,
//         $default_shipping: Boolean , $default_billing: Boolean , $street: [String] , $iz_address_ward: String,
//     $iz_address_district: String, $iz_address_province: String) {
//   createCustomerAddress(input: {
//     country_code: VN
//     street: $street
//     telephone: $telephone
//     city: $city
//     firstname: $firstname
//     lastname: $lastname
//     default_shipping: $default_shipping
//     default_billing: $default_billing
//     iz_address_ward: $iz_address_ward
//     iz_address_district: $iz_address_district
//     iz_address_province: $iz_address_province
//   }) {
//     country_code
//     street
//     telephone
//     city
//     firstname
//     lastname
//     iz_address_ward
//     iz_address_district
//     iz_address_province
//     default_shipping
//     default_billing
//   }
// }
// `,
//           variables: {
//             country_code: action.payload.country_code,
//             street: action.payload.street,
//             telephone: action.payload.telephone,
//             city: action.payload.city,
//             firstname: action.payload.firstname,
//             lastname: action.payload.lastname,
//             default_shipping: action.payload.default_shipping,
//             default_billing: action.payload.default_billing,
//             iz_address_ward: action.payload.iz_address_ward,
//             iz_address_district: action.payload.iz_address_district,
//             iz_address_province: action.payload.iz_address_province,
//           },
//         })
//       ).pipe(
//         map((res) => {
//           if (res) {
//             return createCustomerAddressAfter({ data: res });
//           } else {
//             return createCustomerAddressError({
//               error: new UnknownResponseError('when set customer address'),
//             });
//           }
//         }),
//         catchError((error) =>
//           of(
//             createCustomerAddressError({
//               error,
//             })
//           )
//         )
//       );
//     })
//   )
// );
//
// const whenUpdateCustomerAddress$ = createEffect((action$, state$) =>
//   action$.pipe(
//     ofType(updateCustomerAddress),
//     withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.address]),
//     switchMap(([action, customerState]) => {
//       return fromPromise(
//         graphqlFetchForCustomer({
//           query: `
//    mutation updateCustomerAddress( $id: Int! , $input: CustomerAddressInput ) {
//   updateCustomerAddress(
//   id: $id, input: $input) {
//      id,
//      country_code
//     street
//     telephone
//     city
//     firstname
//     lastname
//     iz_address_ward
//     iz_address_district
//     iz_address_province
//   }
// }
// `,
//           variables: {
//             id: action.payload.id,
//             input: {
//               street: action.payload.street,
//               telephone: action.payload.telephone,
//               firstname: action.payload.firstname,
//               lastname: action.payload.lastname,
//               custom_attributes: action.payload.custom_attributes,
//             },
//           },
//         })
//       ).pipe(
//         map((res) => {
//           if (res) {
//             return updateCustomerAddressAfter({ data: res });
//           } else {
//             return updateCustomerAddressError({
//               error: new UnknownResponseError('when update customer address'),
//             });
//           }
//         }),
//         catchError((error) =>
//           of(
//             updateCustomerAddressError({
//               error,
//             })
//           )
//         )
//       );
//     })
//   )
// );
//
// const whenDeleteCustomerAddress$ = createEffect((action$, state$) =>
//   action$.pipe(
//     ofType(deleteCustomerAddress),
//     withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.address]),
//     switchMap(([action, customerState]) => {
//       return fromPromise(
//         graphqlFetchForCustomer({
//           query: `
//    mutation deleteCustomerAddress
// ( $id: Int! ) {
//   deleteCustomerAddress(
//   id: $id)
// }
// `,
//           variables: {
//             id: action.payload.id,
//           },
//         })
//       ).pipe(
//         map((res) => {
//           if (res) {
//             return deleteCustomerAddressAfter({ data: res });
//           } else {
//             return deleteCustomerAddressError({
//               error: new UnknownResponseError('when update customer address'),
//             });
//           }
//         }),
//         catchError((error) =>
//           of(
//             deleteCustomerAddressError({
//               error,
//             })
//           )
//         )
//       );
//     })
//   )
// );

export const R_CONTENT_ADDRESS_EFFECTS = [
  whenGetAddressData$,
  getAddressDataFromCache$,
];
