import { useAddToCartActions } from '@modules/checkout/hook/cart/useAddToCartActions';
import { createUiHOC } from '@web/ui-extension';

export const withAddToCartActions = createUiHOC(() => {
  return useAddToCartActions();
}, 'withAddToCartActions');
