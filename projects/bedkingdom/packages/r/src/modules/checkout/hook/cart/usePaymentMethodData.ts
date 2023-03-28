import {
  selectAvailablePaymentMethods,
  selectSelectedPaymentMethod,
} from '@modules/checkout/store/cart/cart.selector';
import { useSelector } from '@main/packages-web-redux';

export const usePaymentMethodData = () => {
  const availablePaymentMethods = useSelector(selectAvailablePaymentMethods);
  const selectedPaymentMethod = useSelector(selectSelectedPaymentMethod);

  return {
    state: {
      availablePaymentMethods,
      selectedPaymentMethod,
    },
  };
};
