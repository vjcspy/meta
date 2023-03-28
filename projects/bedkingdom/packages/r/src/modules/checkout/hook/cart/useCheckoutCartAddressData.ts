import {
  selectEditingAddressObj,
  selectIsUpdatingAddress,
  selectQuoteShippingAddress,
} from '@modules/checkout/store/cart/cart.selector';
import first from 'lodash/first';
import size from 'lodash/size';
import { useCallback, useMemo } from 'react';
import { useSelector } from '@main/packages-web-redux';

export const useCheckoutCartAddressData = () => {
  const quoteShippingAddress = useSelector(selectQuoteShippingAddress);
  const currentShippingAddress = useMemo(() => {
    return Array.isArray(quoteShippingAddress) &&
      size(quoteShippingAddress) === 1
      ? first(quoteShippingAddress)
      : undefined;
  }, [quoteShippingAddress]);

  const isSelectedCustomerAdd = useCallback(
    (customerAddId: any) => {
      return !!(
        currentShippingAddress &&
        currentShippingAddress['customer_address_id'] &&
        parseInt(currentShippingAddress['customer_address_id']) ===
          parseInt(customerAddId)
      );
    },
    [currentShippingAddress]
  );

  const isUpdatingAddress = useSelector(selectIsUpdatingAddress);

  // update address
  const editAddressObj = useSelector(selectEditingAddressObj);
  const isEditingAddress = useMemo(() => !!editAddressObj, [editAddressObj]);

  return {
    state: {
      currentShippingAddress,
      isUpdatingAddress,
      isEditingAddress,
      editAddressObj,
    },
    isSelectedCustomerAdd,
  };
};
