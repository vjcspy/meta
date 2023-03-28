import { selectIsResolvedCart } from '@modules/checkout/store/cart/cart.selector';
import { useSelector } from '@main/packages-web-redux';

export const useIsResolvedCart = () => {
  const isResolvedCart = useSelector(selectIsResolvedCart);

  return {
    state: {
      isResolvedCart,
    },
  };
};
