import {
  applyCouponToCartAfterAction,
  removeCouponFromCartAfterAction,
} from '@modules/checkout/store/cart/actions/coupon.actions';
import {
  getCartDetailAfter,
  getCurrentCart,
  getCustomerCart,
  getGuestCart,
  gotCustomerCart,
  gotGuestCartInStorage,
  mergeGuestCartAfter,
} from '@modules/checkout/store/cart/actions/init.actions';
import {
  clearCartMessageAction,
  closeCartDetail,
  goToCartAfterAction,
  openCartDetail,
  setCartMessageAction,
} from '@modules/checkout/store/cart/cart.actions';
import { CartStateFactory } from '@modules/checkout/store/cart/cart.state';
import { checkoutCartAddReducerBuilderCallback } from '@modules/checkout/store/cart/reducers/add.reducer';
import { checkoutAddressBuilderCallback } from '@modules/checkout/store/cart/reducers/address.reducer';
import { checkoutCartGiftReducer } from '@modules/checkout/store/cart/reducers/content.cart.gift.reducer';
import { checkoutCartDetailBuilderCallBack } from '@modules/checkout/store/cart/reducers/details.reducer';
import { orderReducer } from '@modules/checkout/store/cart/reducers/order.reducer';
import { paymentMethodReducer } from '@modules/checkout/store/cart/reducers/payment-method.reducer';
import { reorderCartBuilderCallBack } from '@modules/checkout/store/cart/reducers/reorder.reducer';
import { rewardPointReducer } from '@modules/checkout/store/cart/reducers/reward.reducer';
import { shippingMethodReducer } from '@modules/checkout/store/cart/reducers/shipping-method.reducer';
import { createReducer } from '@main/packages-web-redux';

export const cartReducer = createReducer(CartStateFactory(), (builder) => {
  builder
    .addCase(getCurrentCart, (state) => {
      state.isResolvedCart = false;
    })
    .addCase(getCustomerCart, (state) => {
      state.isResolvedCart = true;
    })
    .addCase(getGuestCart, (state) => {
      state.isResolvedCart = true;
    })
    .addCase(gotGuestCartInStorage, (state, action) => {
      state.guestCartId = action.payload.cartId;
      state.customerCartId = undefined;
      state.mergeGuestCartId = undefined;
    })
    .addCase(getCartDetailAfter, (state, action) => {
      state.cart = action.payload.cart;
      state.isResolvedCart = true;
    })
    .addCase(gotCustomerCart, (state, action) => {
      state.customerCartId = action.payload.cartId;
    })
    .addCase(mergeGuestCartAfter, (state, action) => {
      state.mergeGuestCartId = action.payload.cartId;
      state.guestCartId = undefined;
    })
    .addCase(setCartMessageAction, (state, action) => {
      state.message = action.payload.message;
    })
    .addCase(clearCartMessageAction, (state) => {
      state.message = undefined;
    })
    .addCase(applyCouponToCartAfterAction, (state, action) => {
      state.cart = action.payload.cart;
      state.isResolvedCart = true;
    })
    .addCase(removeCouponFromCartAfterAction, (state, action) => {
      state.cart = action.payload.cart;
      state.isResolvedCart = true;
    });

  builder
    .addCase(openCartDetail, (state) => {
      state.isCartOpen = true;
    })
    .addCase(closeCartDetail, (state) => {
      state.isCartOpen = false;
    })
    .addCase(goToCartAfterAction, (state) => {
      state.preparingProductIds = [];
    });

  checkoutCartDetailBuilderCallBack(builder);
  checkoutCartAddReducerBuilderCallback(builder);
  checkoutAddressBuilderCallback(builder);
  shippingMethodReducer(builder);
  paymentMethodReducer(builder);
  orderReducer(builder);
  rewardPointReducer(builder);
  checkoutCartGiftReducer(builder);
  reorderCartBuilderCallBack(builder);
});
