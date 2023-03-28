import {
  selectAvailableShippingMethod,
  selectSelectedShippingMethod,
} from '@modules/checkout/store/cart/cart.selector';
import { useSelector } from '@main/packages-web-redux';

export const useShippingMethodData = () => {
  const availableShippingMethod = useSelector(selectAvailableShippingMethod);
  const selectedShippingMethod = useSelector(selectSelectedShippingMethod);
  return {
    state: {
      availableShippingMethod,
      selectedShippingMethod,
    },
  };
};
