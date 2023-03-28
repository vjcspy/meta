import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import {
  useApplyAmGiftCardToCartMutation,
  useCheckAmGiftCardAccountLazyQuery,
  useRemoveAmGiftCardFromCartMutation,
} from '@vjcspy/apollo-bed-kingdom';
import {
  bedApplyGiftToCartAction,
  bedApplyGiftToCartAfterAction,
  bedApplyGiftToCartErrorAction,
  bedRemoveGiftToCartAction,
} from '@vjcspy/r/build/modules/checkout/store/cart/actions/content.cart.gift.actions';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useGiftActions = () => {
  const dispatch = useDispatch();
  const [messCheckGift, setMessCheckGift] = useState('');
  const [applyAmGiftCardToCartMutation, applyAmGiftCardToCartRes] =
    useApplyAmGiftCardToCartMutation();

  const [removeAmGiftCardFromCartMutation, removeAmGiftCardFromCartRes] =
    useRemoveAmGiftCardFromCartMutation();

  const [checkAmGiftCardAccountQuery, checkAmGiftCardAccountRes] =
    useCheckAmGiftCardAccountLazyQuery();

  const applyGiftToCart = useCallback(
    (cart_id: string, am_gift_card_code: string) => {
      dispatch(bedApplyGiftToCartAction());
      applyAmGiftCardToCartMutation({
        variables: {
          input: {
            cart_id,
            am_gift_card_code,
          },
        },
      }).catch(() => {});
    },
    []
  );

  const removeGiftFromCart = useCallback(
    (cart_id: string, am_gift_card_code: string) => {
      dispatch(bedRemoveGiftToCartAction({ cart_id }));
      removeAmGiftCardFromCartMutation({
        variables: {
          input: {
            cart_id,
            am_gift_card_code,
          },
        },
      }).catch(() => {});
    },
    []
  );

  const checkGiftToCart = useCallback((am_gift_card_code: string) => {
    checkAmGiftCardAccountQuery({
      variables: {
        input: {
          am_gift_card_code,
        },
      },
    });
  }, []);

  useEffect(() => {
    if (applyAmGiftCardToCartRes.error) {
      console.error('Could not apply gift to cart');
      dispatch(bedApplyGiftToCartErrorAction());
      if (applyAmGiftCardToCartRes.error.message) {
        AlertService.error(applyAmGiftCardToCartRes.error.message);
      }
    }

    if (applyAmGiftCardToCartRes.data?.applyAmGiftCardToCart?.cart) {
      dispatch(
        bedApplyGiftToCartAfterAction({
          cart: applyAmGiftCardToCartRes.data?.applyAmGiftCardToCart?.cart,
        })
      );
      AlertService.success('Add Gift Cart success.');
    }
  }, [applyAmGiftCardToCartRes.data, applyAmGiftCardToCartRes.error]);

  useEffect(() => {
    if (removeAmGiftCardFromCartRes.error) {
      console.error('Could not applu gift to cart');
      dispatch(
        bedApplyGiftToCartErrorAction({
          error: removeAmGiftCardFromCartRes.error,
        })
      );
    }

    if (removeAmGiftCardFromCartRes.data?.removeAmGiftCardFromCart?.cart) {
      dispatch(
        bedApplyGiftToCartAfterAction({
          cart: removeAmGiftCardFromCartRes.data?.removeAmGiftCardFromCart
            ?.cart,
        })
      );
    }
  }, [removeAmGiftCardFromCartRes.data, removeAmGiftCardFromCartRes.error]);

  useEffect(() => {
    if (checkAmGiftCardAccountRes.error) {
      setMessCheckGift('Gift Cart not exist!');
    }

    if (checkAmGiftCardAccountRes.data?.amGiftCardAccount?.status) {
      if (
        checkAmGiftCardAccountRes.data?.amGiftCardAccount?.status === 'Active'
      ) {
        setMessCheckGift('Gift Cart is active!');
      } else {
        setMessCheckGift('Gift Cart is not active!');
      }
    } else {
      setMessCheckGift('Gift Cart not exist!');
    }
  }, [checkAmGiftCardAccountRes.data, checkAmGiftCardAccountRes.error]);

  return {
    state: {
      messCheckGift,
    },
    actions: { applyGiftToCart, removeGiftFromCart, checkGiftToCart },
  };
};
