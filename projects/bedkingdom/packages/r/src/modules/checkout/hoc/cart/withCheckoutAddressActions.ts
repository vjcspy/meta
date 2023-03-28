import { useCheckoutCartAddressActions } from '@modules/checkout/hook/cart/useCheckoutCartAddressActions';
import { createUiHOC } from '@web/ui-extension';

export const withCheckoutAddressActions = createUiHOC(() => {
  return useCheckoutCartAddressActions();
}, 'withCheckoutAddressActions');
