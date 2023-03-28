import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  reorderCartAction,
  reorderCartAfterAction,
  reorderCartErrorAction,
} from '@modules/checkout/store/cart/actions/reorder.actions';

import type { CartState } from '../cart.state';

export const reorderCartBuilderCallBack = createBuilderCallback<CartState>(
  (builder) => {
    builder
      .addCase(reorderCartAction, (state) => {
        state.isUpdatingTotals = true;
      })
      .addCase(reorderCartAfterAction, (state, action) => {
        state.cart = action.payload.cart;
        state.isUpdatingTotals = false;
      })
      .addCase(reorderCartErrorAction, (state) => {
        state.isUpdatingTotals = false;
      });
  }
);
