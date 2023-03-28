import { useCheckoutCartAddressData } from '@modules/checkout/hook/cart/useCheckoutCartAddressData';
import { createUiHOC } from '@web/ui-extension';

export const withCheckoutAddressData = createUiHOC(
  () => useCheckoutCartAddressData(),
  'withCheckoutAddressData'
);
