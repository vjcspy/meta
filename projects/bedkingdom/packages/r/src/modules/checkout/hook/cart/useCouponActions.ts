import {
  applyCouponToCartAction,
  removeCouponFromCartAction,
} from '@modules/checkout/store/cart/actions/coupon.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCouponActions = () => {
  const dispatch = useDispatch();
  const applyCouponToCart = useCallback(
    (cart_id: string, coupon_code: string) => {
      dispatch(
        applyCouponToCartAction({
          cart_id,
          coupon_code,
        })
      );
    },
    []
  );

  const removeCouponFromCart = useCallback((cart_id: string) => {
    dispatch(removeCouponFromCartAction({ cart_id }));
  }, []);

  return {
    actions: { applyCouponToCart, removeCouponFromCart },
  };
};
