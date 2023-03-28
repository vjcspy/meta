import { selectIsPreparingProductId } from '@modules/checkout/store/cart/cart.selector';
import { useSelector } from '@main/packages-web-redux';

export const useSelectIsPreparing = () => {
  const isPreparingProductId = useSelector(selectIsPreparingProductId);

  return {
    isPreparingProductId,
  };
};
