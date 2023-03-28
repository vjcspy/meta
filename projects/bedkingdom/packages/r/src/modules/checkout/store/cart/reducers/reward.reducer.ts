import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  removeRewardPointFromCartAction,
  removeRewardPointFromCartAfterAction,
  removeRewardPointFromCartErrorAction,
  setRewardPointsToCartWithPointAction,
  setRewardPointsToCartWithPointAfterAction,
  setRewardPointsToCartWithPointErrorAction,
  setRewardPointToCartAction,
  setRewardPointToCartAfterAction,
  setRewardPointToCartErrorAction,
} from '@modules/checkout/store/cart/actions/reward.actions';
import type { CartState } from '@modules/checkout/store/cart/cart.state';

export const rewardPointReducer = createBuilderCallback<CartState>(
  (builder) => {
    builder
      .addCase(setRewardPointToCartAction, (state) => {
        state.isUpdatingTotals = true;
      })
      .addCase(setRewardPointToCartErrorAction, (state) => {
        state.isUpdatingTotals = false;
      })
      .addCase(setRewardPointToCartAfterAction, (state, action) => {
        state.isUpdatingTotals = false;
        state.cart = action.payload.cart;
      });

    builder
      .addCase(removeRewardPointFromCartAction, (state) => {
        state.isUpdatingPoint = true;
        state.isUpdatingTotals = true;
      })
      .addCase(removeRewardPointFromCartErrorAction, (state) => {
        state.isUpdatingPoint = false;
        state.isUpdatingTotals = false;
      })
      .addCase(removeRewardPointFromCartAfterAction, (state, action) => {
        state.isUpdatingPoint = false;
        state.isUpdatingTotals = false;
        state.cart = action.payload.cart;
      });
    builder
      .addCase(setRewardPointsToCartWithPointAction, (state) => {
        state.isUpdatingPoint = true;
        state.isUpdatingTotals = true;
      })
      .addCase(setRewardPointsToCartWithPointErrorAction, (state) => {
        state.isUpdatingPoint = false;
        state.isUpdatingTotals = false;
      })
      .addCase(setRewardPointsToCartWithPointAfterAction, (state, action) => {
        state.isUpdatingPoint = false;
        state.isUpdatingTotals = false;
        state.cart = action.payload.cart;
      });
  }
);
