import {
  clearCartMessageAction,
  setCartMessageAction,
} from '@modules/checkout/store/cart/cart.actions';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const withCheckoutCartMessageActions = createUiHOC(() => {
  const dispatch = useDispatch();

  const setMessage = useCallback((message: any) => {
    dispatch(
      setCartMessageAction({
        message,
      })
    );
  }, []);

  const clearMessage = useCallback(() => {
    dispatch(clearCartMessageAction());
  }, []);

  return {
    actions: {
      setMessage,
      clearMessage,
    },
  };
}, 'withCheckoutCartMessageActions');
