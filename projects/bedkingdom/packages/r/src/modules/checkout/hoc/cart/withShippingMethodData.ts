import { useShippingMethodData } from '@modules/checkout/hook/cart/useShippingMethodData';
import { createUiHOC } from '@web/ui-extension';

export const withShippingMethodData = createUiHOC(() => {
  return useShippingMethodData();
}, 'withShippingMethodData');
