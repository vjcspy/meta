import { createEffect } from '@main/packages-web-redux/dist/util/createEffect';
import { ofType } from '@main/packages-web-redux/dist/util/ofType';
import { graphqlFetchForCustomer as graphqlFetch } from '@modules/account/util/graphqlFetchForCustomer';
import type { ProductInfoState } from '@modules/catalog/store/product-info/product-info.state';
import {
  addProductsToCart,
  addProductsToCartAfter,
  prepareProductAddToCartAction,
} from '@modules/checkout/store/cart/actions/add.actions';
import {
  addProductsToCartTypeConfigurable,
  addProductsToCartTypeConfigurableAfter,
  addProductsToCartTypeConfigurableError,
} from '@modules/checkout/store/cart/actions/add-type/configurable';
import { buildConfigurableProductCartItemInput } from '@modules/checkout/util/cart/add/buildConfigurableProductCartItemInput';
import { RuntimeError } from 'chitility/dist/lib/error/RuntimeError';
import { UnknownResponseError } from 'chitility/dist/lib/error/UnknownResponseError';
import arrayFilter from 'lodash/filter';
import forEach from 'lodash/forEach';
import { EMPTY, from, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

const prepareProduct$ = createEffect((actions$, state$) =>
  actions$.pipe(
    ofType(prepareProductAddToCartAction),
    withLatestFrom(state$, (v1, v2) => [v1, v2.productInfo]),
    map((data) => {
      try {
        const action = data[0];
        const productInfoState: ProductInfoState = data[1];
        if (Array.isArray(productInfoState?.products)) {
          const productInfo = productInfoState.products.find(
            (pI) => pI.product['id'] === action.payload.productId
          );

          if (
            productInfo &&
            productInfo.product['__typename'] === 'ConfigurableProduct' &&
            productInfo.configurable?.super_attribute
          ) {
            const input = buildConfigurableProductCartItemInput(
              productInfo,
              productInfo.qty ?? action.payload.qty ?? 1
            );

            if (input) {
              return addProductsToCart({
                items: [
                  {
                    product: productInfo.product,
                    input,
                  },
                ],
              });
            }
          }
        } else {
          console.warn('Please resolve product info with hoc');
        }
      } catch (e) {
        console.warn(e);
      }

      return EMPTY;
    })
  )
);

const beforeAddProducts$ = createEffect((action$) =>
  action$.pipe(
    ofType(addProductsToCart),
    map((action) => {
      return arrayFilter(action.payload.items, (_i) => {
        return (
          _i.product?.__typename === 'ConfigurableProduct' ||
          _i.product?.type === 'configurable'
        );
      });
    }),
    filter((simpleItems) => simpleItems.length > 0),
    map((items) => {
      return addProductsToCartTypeConfigurable({ items });
    })
  )
);

const whenAddProductsToCart$ = createEffect((action$, state$) =>
  action$.pipe(
    ofType(addProductsToCartTypeConfigurable),
    debounceTime(100),
    withLatestFrom(state$, (v1, v2) => [v1, v2.checkout.cart.cart]),
    switchMap(([action, cart]) => {
      if (typeof cart?.id !== 'string') {
        return of(
          addProductsToCartTypeConfigurableError({
            error: new RuntimeError('cart_not_resolved'),
            items: action.payload.items,
          })
        );
      }

      const cartItems: any[] = [];
      forEach(action.payload.items, (_i) => {
        cartItems.push(_i.input);
      });

      return from(
        graphqlFetch({
          query: `mutation addConfigurableProductsToCart($cartId: String!, $cartItems: [CartItemInput!]!){
  addProductsToCart(cartId: $cartId, cartItems: $cartItems){
        cart {
            id
            items {
                id
                product {
                    sku
                    stock_status
                }
                quantity
            }
        }
    }
}
`,
          variables: {
            cartId: cart.id,
            cartItems: cartItems,
          },
        })
      ).pipe(
        map((res) => {
          if (res?.addProductsToCart?.cart?.id) {
            return addProductsToCartTypeConfigurableAfter({
              cartId: res?.addProductsToCart?.cart?.id,
              items: action.payload.items,
            });
          } else {
            return addProductsToCartTypeConfigurableError({
              error: new UnknownResponseError(
                'add configurable products to cart'
              ),
              items: action.payload.items,
            });
          }
        }),
        catchError((error) =>
          of(
            addProductsToCartTypeConfigurableError({
              error,
              items: action.payload.items,
            })
          )
        )
      );
    })
  )
);

const beforeAddProductsToCartAfter$ = createEffect((action$) =>
  action$.pipe(
    ofType(addProductsToCartTypeConfigurableAfter),
    map((action) =>
      addProductsToCartAfter({
        cartId: action.payload.cartId,
      })
    )
  )
);

export const CHECKOUT_CART_ADD_CONFIGURABLE_EFFECTS = [
  prepareProduct$,
  beforeAddProducts$,
  whenAddProductsToCart$,
  beforeAddProductsToCartAfter$,
];
