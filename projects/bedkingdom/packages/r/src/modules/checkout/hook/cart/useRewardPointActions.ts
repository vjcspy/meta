import { removeCouponFromCartErrorAction } from '@modules/checkout/store/cart/actions/coupon.actions';
import {
  removeRewardPointFromCartAction,
  removeRewardPointFromCartAfterAction,
  setRewardPointsToCartWithPointAction,
  setRewardPointsToCartWithPointAfterAction,
  setRewardPointsToCartWithPointErrorAction,
  setRewardPointToCartAction,
  setRewardPointToCartAfterAction,
  setRewardPointToCartErrorAction,
} from '@modules/checkout/store/cart/actions/reward.actions';
import { selectCart } from '@modules/checkout/store/cart/cart.selector';
import {
  useApplyRewardPointsToCartWithPointMutation,
  useApplyRewardPointToCartMutation,
  useRemoveRewardPointFromCartMutation,
} from '@vjcspy/apollo';
import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useRewardPointActions = () => {
  const dispatch = useDispatch();
  const cart = useSelector(selectCart);
  const [setRewardPointMutation, setRewardPointMutationRes] =
    useApplyRewardPointToCartMutation();

  const setRewardPointToCart = useCallback(() => {
    if (cart?.id) {
      dispatch(setRewardPointToCartAction());
      setRewardPointMutation({
        variables: {
          cartId: cart.id,
        },
      })
        .then()
        .catch();
    }
  }, [cart?.id]);

  useEffect(() => {
    if (setRewardPointMutationRes.error) {
      dispatch(
        setRewardPointToCartErrorAction({
          error: setRewardPointMutationRes.error,
        })
      );
    }

    if (setRewardPointMutationRes.data?.applyRewardPointsToCart?.cart) {
      dispatch(
        setRewardPointToCartAfterAction({
          cart: setRewardPointMutationRes.data?.applyRewardPointsToCart?.cart,
        })
      );
    }
  }, [setRewardPointMutationRes.error, setRewardPointMutationRes.data]);

  const [removeRewardPointMutation, removeRewardPointMutationRes] =
    useRemoveRewardPointFromCartMutation();
  const removeRewardPointFromCart = useCallback(() => {
    if (cart?.id) {
      dispatch(removeRewardPointFromCartAction());
      removeRewardPointMutation({
        variables: {
          cartId: cart.id,
        },
      })
        .then()
        .catch();
    }
  }, [cart?.id]);

  useEffect(() => {
    if (removeRewardPointMutationRes.error) {
      dispatch(
        removeCouponFromCartErrorAction({
          error: removeRewardPointMutationRes.error,
        })
      );
    }

    if (removeRewardPointMutationRes.data?.removeRewardPointsFromCart?.cart) {
      dispatch(
        removeRewardPointFromCartAfterAction({
          cart: removeRewardPointMutationRes.data?.removeRewardPointsFromCart
            ?.cart,
        })
      );
    }
  }, [removeRewardPointMutationRes.error, removeRewardPointMutationRes.data]);

  const [setRewardPointWithPointMutation, setRewardPointWithPointRes] =
    useApplyRewardPointsToCartWithPointMutation();

  const setRewardPointToCartWithPoint = useCallback(
    (rewardAmountApply: number) => {
      if (cart?.id) {
        dispatch(setRewardPointsToCartWithPointAction());
        setRewardPointWithPointMutation({
          variables: {
            cartId: cart.id,
            rewardAmountApply,
          },
        });
      }
    },
    [cart?.id]
  );

  useEffect(() => {
    if (setRewardPointWithPointRes.error) {
      dispatch(
        setRewardPointsToCartWithPointErrorAction({
          error: setRewardPointWithPointRes.error,
        })
      );
    }

    if (
      setRewardPointWithPointRes.data?.applyRewardPointsToCartWithPoint?.cart
    ) {
      dispatch(
        setRewardPointsToCartWithPointAfterAction({
          cart: setRewardPointWithPointRes.data
            ?.applyRewardPointsToCartWithPoint?.cart,
        })
      );
    }
  }, [setRewardPointWithPointRes.error, setRewardPointWithPointRes.data]);

  return {
    actions: {
      setRewardPointToCart,
      removeRewardPointFromCart,
      setRewardPointToCartWithPoint,
    },
  };
};
