import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import {
  checkoutCartDetailAddCouponCodeAction,
  checkoutCartDetailAddCouponCodeAfterAction,
  checkoutCartDetailAddCouponCodeErrorAction,
  checkoutCartDetailRemoveCouponCodeAction,
  checkoutCartDetailRemoveCouponCodeAfterAction,
  checkoutCartDetailRemoveCouponCodeErrorAction,
  checkoutCartDetailRemoveItemAction,
  checkoutCartDetailRemoveItemAfterAction,
  checkoutCartDetailRemoveItemErrorAction,
  updateCartItemAction,
  updateCartItemAfterAction,
  updateCartItemError,
  updateMultiCartItemAfterAction,
} from '@modules/checkout/store/cart/actions/detail.actions';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import uniq from 'lodash/uniq';

import type { CartState } from '../cart.state';

export const checkoutCartDetailBuilderCallBack =
  createBuilderCallback<CartState>((builder) => {
    builder

      // add coupon code
      .addCase(checkoutCartDetailAddCouponCodeAction, (state) => {
        state.isUpdatingCoupon = true;
        state.isUpdatingTotals = true;
      })
      .addCase(checkoutCartDetailAddCouponCodeAfterAction, (state, action) => {
        state.cart = action.payload.cart;
        state.isUpdatingCoupon = false;
        state.isUpdatingTotals = false;
      })
      .addCase(checkoutCartDetailAddCouponCodeErrorAction, (state) => {
        state.isUpdatingCoupon = false;
        state.isUpdatingTotals = false;
      })

      // remove coupon code
      .addCase(checkoutCartDetailRemoveCouponCodeAction, (state) => {
        state.isUpdatingCoupon = true;
        state.isUpdatingTotals = true;
      })
      .addCase(
        checkoutCartDetailRemoveCouponCodeAfterAction,
        (state, action) => {
          state.cart = action.payload.cart;
          state.isUpdatingCoupon = false;
          state.isUpdatingTotals = false;
        }
      )
      .addCase(checkoutCartDetailRemoveCouponCodeErrorAction, (state) => {
        state.isUpdatingCoupon = false;
        state.isUpdatingTotals = false;
      })

      // update cart item
      .addCase(updateCartItemAction, (state, action) => {
        _updateCartItemStateAction(state, action);
      })
      .addCase(updateCartItemAfterAction, (state, action) => {
        _updateCartItemStateSuccess(state, action);
      })
      .addCase(updateMultiCartItemAfterAction, (state, action) => {
        _updateCartItemStateSuccess(state, action);
      })
      .addCase(updateCartItemError, (state, action) => {
        _updateCartItemStateError(state, action);
      })

      // Remove cart item
      .addCase(checkoutCartDetailRemoveItemAction, (state, action) => {
        _updateCartItemStateAction(state, action);
      })
      .addCase(checkoutCartDetailRemoveItemAfterAction, (state, action) => {
        _updateCartItemStateSuccess(state, action);
      })
      .addCase(checkoutCartDetailRemoveItemErrorAction, (state, action) => {
        _updateCartItemStateError(state, action);
      });
  });

function _updateCartItemStateAction(state: any, action: any) {
  state.cartItemUpdating = state.cartItemUpdating ?? [];
  state.cartItemUpdating.push(action.payload.cartItemId);
  state.cartItemUpdating = uniq(state.cartItemUpdating);
  state.isUpdatingTotals = true;
}

function _updateCartItemStateSuccess(state: any, action: any) {
  state.cart = action.payload.cart;
  state.isUpdatingTotals = false;

  forEach(action.payload.cart?.items, (item) => {
    state.cartItemUpdating = filter(
      state.cartItemUpdating,
      (id) => id != item.id
    );
  });
}

function _updateCartItemStateError(state: any, action: any) {
  state.cartItemUpdating = filter(
    state.cartItemUpdating,
    (id: number) => id != action.payload.cartItemId
  );

  state.isUpdatingTotals = false;
}
