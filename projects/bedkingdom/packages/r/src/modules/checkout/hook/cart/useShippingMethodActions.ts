import { setShippingMethod } from '@modules/checkout/store/cart/actions/shipping-method.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useShippingMethodActions = () => {
  const dispatch = useDispatch();

  const setShippingMethodAction = useCallback(
    (carrierCode: string, methodCode: string) => {
      dispatch(
        setShippingMethod({
          methodCode,
          carrierCode,
        })
      );
    },
    []
  );

  return {
    actions: { setShippingMethodAction },
  };
};
