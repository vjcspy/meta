import { selectCartMessage } from '@modules/checkout/store/cart/cart.selector';
import { useSelector } from '@main/packages-web-redux';

export const useCartMessage = () => {
  const cartMessage = useSelector(selectCartMessage);
  return {
    state: {
      cartMessage,
    },
  };
};
