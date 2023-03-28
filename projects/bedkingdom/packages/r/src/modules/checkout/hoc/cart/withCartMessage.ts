import { useCartMessage } from '@modules/checkout/hook/cart/useCartMessage';
import { createUiHOC } from '@web/ui-extension';

export const withCartMessage = createUiHOC(
  () => useCartMessage(),
  'withCartMessage'
);
