import {
  selectCompleteOrderNumber,
  selectIsPlacingOrder,
} from '@modules/checkout/store/cart/cart.selector';
import { useSelector } from '@main/packages-web-redux';

export const useCheckoutOrderData = () => {
  const isPlacingOrder = useSelector(selectIsPlacingOrder);
  const completeOrderNumber = useSelector(selectCompleteOrderNumber);
  return {
    state: {
      isPlacingOrder,
      completeOrderNumber,
    },
  };
};
