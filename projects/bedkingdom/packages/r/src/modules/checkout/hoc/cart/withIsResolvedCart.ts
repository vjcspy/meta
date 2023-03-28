import { useIsResolvedCart } from '@modules/checkout/hook/cart/useIsResolvedCart';
import { createUiHOC } from '@web/ui-extension';

export const withIsResolvedCart = createUiHOC(
  () => useIsResolvedCart(),
  'withIsResolvedCart'
);
