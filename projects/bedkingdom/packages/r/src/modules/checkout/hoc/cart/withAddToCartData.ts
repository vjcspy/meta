import { useAddToCartData } from '@modules/checkout/hook/cart/useAddToCartData';
import { createUiHOC } from '@web/ui-extension';

export const withAddToCartData = createUiHOC(
  () => useAddToCartData(),
  'withAddToCartData'
);
