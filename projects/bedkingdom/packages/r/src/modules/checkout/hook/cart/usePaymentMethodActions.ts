import { setPaymentMethod } from '@modules/checkout/store/cart/actions/payment-method.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const usePaymentMethodActions = () => {
  const dispatch = useDispatch();

  const setPaymentMethodAction = useCallback((methodCode: string) => {
    dispatch(
      setPaymentMethod({
        methodCode,
      })
    );
  }, []);
  return {
    actions: {
      setPaymentMethodAction,
    },
  };
};
