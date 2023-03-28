import { useCheckoutCartData } from '@modules/checkout/hook/cart/useCheckoutCartData';
import { selectIsResolvedCart } from '@modules/checkout/store/cart/cart.selector';
import { createUiHOC } from '@web/ui-extension';
import { useSelector } from '@main/packages-web-redux';

export const withCheckoutCartData = createUiHOC(() => {
  const isResolvedCart = useSelector(selectIsResolvedCart);
  const { state, actions } = useCheckoutCartData();
  return {
    state: {
      isResolvedCart,
      ...state,
    },
    actions: {
      ...actions,
    },
  };
}, 'withCheckoutCartData');
