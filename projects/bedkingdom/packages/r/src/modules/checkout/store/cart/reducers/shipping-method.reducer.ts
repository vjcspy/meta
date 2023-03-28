import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  setShippingMethod,
  setShippingMethodAfter,
} from '@modules/checkout/store/cart/actions/shipping-method.actions';
import type { CartState } from '@modules/checkout/store/cart/cart.state';

export const shippingMethodReducer = createBuilderCallback<CartState>(
  (builder) => {
    builder
      .addCase(setShippingMethod, (state) => {
        state.isUpdatingAddress = true;
        state.isUpdatingTotals = true;
      })
      .addCase(setShippingMethodAfter, (state, action) => {
        state.cart = action.payload.cart;
        state.isUpdatingAddress = false;
        state.isUpdatingTotals = false;
      });
  }
);
