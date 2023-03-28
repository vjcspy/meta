import { useCartDetailActions } from '@modules/checkout/hook/cart/useCartDetailActions';
import { createUiHOC } from '@web/ui-extension';

export const withCartDetailActions = createUiHOC(() => {
  return useCartDetailActions();
}, 'withCartDetailActions');
