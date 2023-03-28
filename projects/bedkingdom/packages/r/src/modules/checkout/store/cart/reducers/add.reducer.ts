import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import { toggleConfigurableOption } from '@modules/catalog/store/product-info/product-info.actions';
import { prepareProductAddToCartAction } from '@modules/checkout/store/cart/actions/add.actions';
import {
  addProductsToCartTypeConfigurable,
  addProductsToCartTypeConfigurableAfter,
  addProductsToCartTypeConfigurableError,
} from '@modules/checkout/store/cart/actions/add-type/configurable';
import {
  addProductsToCartTypeSimple,
  addProductsToCartTypeSimpleAfter,
  addProductsToCartTypeSimpleError,
} from '@modules/checkout/store/cart/actions/add-type/simple';
import filter from 'lodash/filter';
import includes from 'lodash/includes';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';

import type { CartState } from '../cart.state';

export const checkoutCartAddReducerBuilderCallback =
  createBuilderCallback<CartState>((builder) =>
    builder
      .addCase(prepareProductAddToCartAction, (state, action) => {
        state.preparingProductIds = state.preparingProductIds.filter(
          (pI) => pI.productId !== action.payload.productId
        );

        state.preparingProductIds.push({
          productId: action.payload.productId,
          ts: +new Date(),
        });
        state.preparingProductIds = uniqBy(
          state.preparingProductIds,
          'productId'
        );
      })
      // .addCase(addProductsToCart, (state, action) => {})
      // Khi người dùng lựa chọn option thì loại bỏ trạng thái preparing
      .addCase(toggleConfigurableOption, (state, action) => {
        state.preparingProductIds = state.preparingProductIds.filter(
          (pId) => pId.productId != action.payload.productId
        );
      })
      /* Simple */
      .addCase(addProductsToCartTypeSimple, (state, action) => {
        addingState(state, action, 'simple');
      })
      .addCase(addProductsToCartTypeSimpleAfter, (state, action) => {
        clearProductIdAfterAdd(state, action, 'simple');
      })
      .addCase(addProductsToCartTypeSimpleError, (state, action) => {
        clearProductIdAfterAdd(state, action, 'simple');
      })
      /* Configurable */
      .addCase(addProductsToCartTypeConfigurable, (state, action) => {
        addingState(state, action, 'configurable');
      })
      .addCase(addProductsToCartTypeConfigurableAfter, (state, action) => {
        clearProductIdAfterAdd(state, action, 'configurable');
      })
      .addCase(addProductsToCartTypeConfigurableError, (state, action) => {
        clearProductIdAfterAdd(state, action, 'configurable');
      })
  );

function addingState(
  state: any,
  action: any,
  productType: 'simple' | 'configurable' | 'bundle' | 'grouped' | 'downloadable'
) {
  state.adding = state.adding ?? {};
  state.adding[productType] = state.adding[productType] ?? [];

  state.adding[productType]!.push(
    ...map(action.payload.items, (i: any) => i.product?.id)
  );
  state.adding[productType] = uniq(state.adding[productType]);
  state.adding[productType] = filter(
    state.adding[productType],
    (i: any) => !!i
  );
}

function clearProductIdAfterAdd(
  state: CartState,
  action: any,
  productType: 'simple' | 'configurable' | 'bundle' | 'grouped' | 'downloadable'
) {
  if (state.adding && Array.isArray(state.adding[productType])) {
    state.adding![productType] = filter(
      state.adding![productType],
      (pId: any) => {
        // console.log(_.map(action.payload?.items, (i1: any) => i1.product?.id));
        return !includes(
          map(action.payload?.items, (i1: any) => i1.product?.id),
          pId
        );
      }
    );
  }
}
