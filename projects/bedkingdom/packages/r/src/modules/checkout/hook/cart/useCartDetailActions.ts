import {
  checkoutCartDetailAddCouponCodeAction,
  checkoutCartDetailRemoveCouponCodeAction,
  checkoutCartDetailRemoveItemAction,
  updateCartItemAction,
  updateMultiCartItemAction,
} from '@modules/checkout/store/cart/actions/detail.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCartDetailActions = () => {
  const dispatch = useDispatch();

  const updateCartItem = useCallback(
    (updateCartItemInput: {
      cartId: string;
      cartItemId: number;
      qty: number;
    }) => {
      dispatch(updateCartItemAction(updateCartItemInput));
    },
    []
  );

  const updateMultiCartItem = useCallback(
    (updateCartItemsInput: { cartId: string; dataItemsCart: any }) => {
      dispatch(updateMultiCartItemAction(updateCartItemsInput));
    },
    []
  );

  const removeItemFromCart = useCallback(
    (cartId: string, cartItemId: number) => {
      dispatch(
        checkoutCartDetailRemoveItemAction({
          cartId,
          cartItemId,
        })
      );
    },
    []
  );

  const addCouponCode = useCallback((cartId: string, couponCode: string) => {
    dispatch(
      checkoutCartDetailAddCouponCodeAction({
        cartId,
        couponCode,
      })
    );
  }, []);

  const removeCouponCode = useCallback((cartId: string) => {
    dispatch(
      checkoutCartDetailRemoveCouponCodeAction({
        cartId,
      })
    );
  }, []);

  return {
    actions: {
      updateCartItem,
      updateMultiCartItem,
      removeItemFromCart,
      addCouponCode,
      removeCouponCode,
    },
  };
};
