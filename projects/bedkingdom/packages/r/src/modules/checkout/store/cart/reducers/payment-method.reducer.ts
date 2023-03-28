import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  getPaymentMethodAfter,
  setPaymentMethod,
  setPaymentMethodAfter,
  setPaymentMethodError,
} from '@modules/checkout/store/cart/actions/payment-method.actions';

import type { CartState } from '../cart.state';

export const paymentMethodReducer = createBuilderCallback<CartState>(
  (builder) => {
    builder
      .addCase(getPaymentMethodAfter, (state, action) => {
        if (Array.isArray(action.payload.cart.available_payment_methods)) {
          if (state.cart) {
            state.cart.available_payment_methods =
              action.payload.cart.available_payment_methods;
          }
        }
      })
      .addCase(setPaymentMethod, (state) => {
        state.isUpdatingTotals = true;
      })
      .addCase(setPaymentMethodAfter, (state, action) => {
        state.cart = action.payload.cart;
        state.isUpdatingTotals = false;
      })
      .addCase(setPaymentMethodError, (state) => {
        state.isUpdatingTotals = false;
      });
  }
);
