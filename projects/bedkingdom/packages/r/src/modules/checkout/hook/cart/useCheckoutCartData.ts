import {
  closeCartDetail,
  goToCartAfterAction,
  openCartDetail,
} from '@modules/checkout/store/cart/cart.actions';
import {
  isCartOpen,
  selectAppliedRewardPoint,
  selectCart,
  selectCartItemUpdating,
  selectCouponCode,
  selectIsUpdatingCoupon,
  selectIsUpdatingPoint,
  selectIsUpdatingTotals,
} from '@modules/checkout/store/cart/cart.selector';
import { useCallback } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useCheckoutCartData = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const cartItemUpdating = useSelector(selectCartItemUpdating);
  const isUpdatingCoupon = useSelector(selectIsUpdatingCoupon);
  const isUpdatingPoint = useSelector(selectIsUpdatingPoint);
  const isUpdatingTotals = useSelector(selectIsUpdatingTotals);
  const couponCode = useSelector(selectCouponCode);
  const appliedRewardPoint = useSelector(selectAppliedRewardPoint);
  const isCartOpening = useSelector(isCartOpen);

  const openCart = useCallback(() => {
    dispatch(openCartDetail());
  }, []);
  const closeCart = useCallback(() => {
    dispatch(closeCartDetail());
  }, []);
  const goToCartAfter = useCallback(() => {
    dispatch(goToCartAfterAction());
  }, []);

  return {
    state: {
      cart,
      cartItemUpdating,
      isUpdatingCoupon,
      isUpdatingPoint,
      isUpdatingTotals,
      couponCode,
      appliedRewardPoint,
      isCartOpening,
    },
    actions: {
      openCart,
      closeCart,
      goToCartAfter,
    },
  };
};
