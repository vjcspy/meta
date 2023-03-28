import { useCheckoutOrderData } from '@modules/checkout/hook/cart/useCheckoutOrderData';
import { createUiHOC } from '@web/ui-extension';

export const withCheckoutOrderData = createUiHOC(
  () => useCheckoutOrderData(),
  'withCheckoutOrderData'
);
