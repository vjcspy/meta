import { useCheckoutOrderActions } from '@modules/checkout/hook/cart/useCheckoutOrderActions';
import { createUiHOC } from '@web/ui-extension';

export const withCheckoutOrderActions = createUiHOC(
  () => useCheckoutOrderActions(),
  'withCheckoutOrderActions'
);
