import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  placeOrder,
  placeOrderAfter,
  placeOrderError,
} from '@modules/checkout/store/cart/actions/order.actions';
import type { CartState } from '@modules/checkout/store/cart/cart.state';

export const orderReducer = createBuilderCallback<CartState>((builder) => {
  builder
    .addCase(placeOrder, (state) => {
      state.isPlacingOrder = true;
    })
    .addCase(placeOrderAfter, (state, action) => {
      state.isPlacingOrder = false;
      state.completeOrderNumber = action.payload.order['order_number'];
    })
    .addCase(placeOrderError, (state) => {
      state.isPlacingOrder = false;
    });
});
