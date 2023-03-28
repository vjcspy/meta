import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  bedApplyGiftToCartAction,
  bedApplyGiftToCartAfterAction,
  bedApplyGiftToCartErrorAction,
  bedRemoveGiftToCartAction,
  bedRemoveGiftToCartAfterAction,
  bedRemoveGiftToCartErrorAction,
} from '@modules/checkout/store/cart/actions/content.cart.gift.actions';
import type { CartState } from '@modules/checkout/store/cart/cart.state';

export const checkoutCartGiftReducer = createBuilderCallback<CartState>(
  (builder) => {
    builder
      .addCase(bedApplyGiftToCartAction, (state, _action) => {
        state.isUpdatingCoupon = true;
        state.isUpdatingTotals = true;
      })
      .addCase(bedApplyGiftToCartAfterAction, (state, action) => {
        state.cart = action.payload.cart;
        state.isUpdatingCoupon = false;
        state.isUpdatingTotals = false;
      })
      .addCase(bedApplyGiftToCartErrorAction, (state, action) => {
        state.isUpdatingCoupon = false;
        state.isUpdatingTotals = false;
      })
      .addCase(bedRemoveGiftToCartAction, (state, action) => {
        state.isUpdatingCoupon = true;
        state.isUpdatingTotals = true;
      })
      .addCase(bedRemoveGiftToCartAfterAction, (state, action) => {
        state.cart = action.payload.cart;
        state.isUpdatingCoupon = false;
        state.isUpdatingTotals = false;
      })
      .addCase(bedRemoveGiftToCartErrorAction, (state, action) => {
        state.isUpdatingCoupon = false;
        state.isUpdatingTotals = false;
      });
  }
);
