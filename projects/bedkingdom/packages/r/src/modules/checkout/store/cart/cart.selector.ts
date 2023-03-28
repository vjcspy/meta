import { createSelector } from '@main/packages-web-redux';
import type { CheckoutState } from '@modules/checkout/store/checkout.state';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import memoize from 'lodash/memoize';

export const selectCart = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.cart;

export const selectIsResolvedCart = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.isResolvedCart;

export const selectAvailableShippingMethod = (state: {
  checkout: CheckoutState;
}) => {
  if (Array.isArray(state.checkout.cart.cart?.shipping_addresses)) {
    const shippingAdd = state.checkout.cart.cart?.shipping_addresses[0];

    return shippingAdd?.available_shipping_methods ?? [];
  }

  return [];
};

export const selectAvailablePaymentMethods = (state: {
  checkout: CheckoutState;
}) => state.checkout.cart?.cart?.available_payment_methods ?? [];

export const selectIsPreparingProductId: any = createSelector(
  (state: { checkout: CheckoutState }) =>
    state.checkout.cart.preparingProductIds,
  (preparingProductIds: any[]) =>
    memoize(
      (productId: any) =>
        preparingProductIds.find((pD) => pD.productId === productId)?.ts ??
        false
    )
);

export const selectCartItemUpdating = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.cartItemUpdating;

export const selectIsUpdatingCoupon = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.isUpdatingCoupon;
export const selectIsUpdatingPoint = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.isUpdatingPoint;
export const selectIsUpdatingTotals = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.isUpdatingTotals;

export const selectIsCartHasCoupon = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.cart?.applied_coupons !== null;

export const selectCouponCode = (state: { checkout: CheckoutState }) =>
  Array.isArray(state.checkout.cart?.cart?.applied_coupons)
    ? (state.checkout.cart!.cart!.applied_coupons[0] as any).code
    : undefined;

export const selectQuoteShippingAddress = (state: {
  checkout: CheckoutState;
}) => state.checkout.cart?.cart?.shipping_addresses;

export const selectIsUpdatingAddress = (state: { checkout: CheckoutState }) =>
  state.checkout.cart?.isUpdatingAddress;

export const selectEditingAddressObj = (state: { checkout: CheckoutState }) =>
  state.checkout.cart?.editingAddressObj;

export const selectSelectedShippingMethod = (state: {
  checkout: CheckoutState;
}) => {
  if (Array.isArray(state.checkout.cart.cart?.shipping_addresses)) {
    const shippingAdd = state.checkout.cart.cart?.shipping_addresses[0];

    return shippingAdd?.selected_shipping_method;
  }

  return undefined;
};

export const selectIsAddingProductId: any = createSelector(
  (state: { checkout: CheckoutState }) => state.checkout.cart.adding,
  (addingInfo) =>
    memoize((productId: any) => {
      let isAdding = false;

      forEach(addingInfo, (info) => {
        const isExisting = Array.isArray(info) && includes(info, productId);

        if (isExisting) {
          isAdding = true;

          return false;
        }
      });

      return isAdding;
    })
);

export const selectAddingProduct = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.adding;

export const selectCartItems = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.cart?.items;

export const selectIsPlacingOrder = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.isPlacingOrder;

export const selectCartMessage = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.message;

export const selectCompleteOrderNumber = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.completeOrderNumber;

export const selectAppliedRewardPoint = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.cart?.applied_reward_points;

export const isCartOpen = (state: { checkout: CheckoutState }) =>
  state.checkout?.cart?.isCartOpen;

export const selectSelectedPaymentMethod = (state: {
  checkout: CheckoutState;
}) => state.checkout?.cart?.cart?.selected_payment_method;
