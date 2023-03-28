import { useDispatch } from '@main/packages-web-redux';
import { useRemoveItemsFromCartMutation } from '@vjcspy/apollo-bed-kingdom';
import { getCartDetailAfter } from '@vjcspy/r/build/modules/checkout/store/cart/actions/init.actions';
import { createUiHOC } from '@web/ui-extension';
import { useCallback, useEffect } from 'react';

export const withBedkingdomClearItemsCart = createUiHOC(() => {
  const dispatch = useDispatch();
  const [removeItemsFromCartMutation, removeItemsFromCartRes] =
    useRemoveItemsFromCartMutation();

  const removeItems = useCallback((cartid: any, cartItems: any[]) => {
    removeItemsFromCartMutation({
      variables: { cartid, cartItems },
    });
  }, []);

  useEffect(() => {
    if (removeItemsFromCartRes.error) {
      console.error('Could not remove items');
    }

    if (removeItemsFromCartRes.data?.removeItemsFromCart?.cart) {
      dispatch(
        getCartDetailAfter({
          cart: removeItemsFromCartRes.data?.removeItemsFromCart?.cart,
        })
      );
    }
  }, [removeItemsFromCartRes.error, removeItemsFromCartRes.data]);

  return {
    actions: {
      removeItems,
    },
  };
}, 'withBedkingdomClearItemsCart');
