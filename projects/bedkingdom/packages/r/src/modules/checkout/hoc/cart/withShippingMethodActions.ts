import { useShippingMethodActions } from '@modules/checkout/hook/cart/useShippingMethodActions';
import { createUiHOC } from '@web/ui-extension';

export const withShippingMethodActions = createUiHOC(
  () => useShippingMethodActions(),
  'withShippingMethodActions'
);
