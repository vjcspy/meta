import {
  checkoutCartAddressCancelEditAddressAction,
  checkoutCartAddressEditAddressAction,
  checkoutCartAddressSetBillingAddress,
  checkoutCartSetShippingAddress,
} from '@modules/checkout/store/cart/actions/address.actions';
import { useCallback } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCheckoutCartAddressActions = () => {
  const dispatch = useDispatch();

  const setShippingAddress = useCallback(
    (address: any, customerAddressId?: string) => {
      if (!!address && !!customerAddressId) {
        console.error('Only accept either address or id values');
        return;
      }
      dispatch(
        checkoutCartSetShippingAddress({
          address,
          customerAddressId,
        })
      );
    },
    []
  );

  const setBillingAddress = useCallback(
    (address: any, customerAddressId?: string) => {
      if (!!address && !!customerAddressId) {
        console.error('Only accept either address or id values');
        return;
      }
      dispatch(
        checkoutCartAddressSetBillingAddress({
          address,
          customerAddressId,
        })
      );
    },
    []
  );

  const editAddress = useCallback((address: any) => {
    dispatch(checkoutCartAddressEditAddressAction({ address }));
  }, []);

  const cancelEditAddress = useCallback(() => {
    dispatch(checkoutCartAddressCancelEditAddressAction());
  }, []);

  return {
    actions: {
      setShippingAddress,
      setBillingAddress,
      editAddress,
      cancelEditAddress,
    },
  };
};
