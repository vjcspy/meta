import { usePaymentMethodActions } from '@modules/checkout/hook/cart/usePaymentMethodActions';
import { createUiHOC } from '@web/ui-extension';

export const withPaymentMethodActions = createUiHOC(
  () => usePaymentMethodActions(),
  'withPaymentMethodActions'
);
