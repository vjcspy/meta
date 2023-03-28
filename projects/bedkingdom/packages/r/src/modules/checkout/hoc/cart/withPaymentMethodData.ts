import { usePaymentMethodData } from '@modules/checkout/hook/cart/usePaymentMethodData';
import { createUiHOC } from '@web/ui-extension';

export const withPaymentMethodData = createUiHOC(
  () => usePaymentMethodData(),
  'withPaymentMethodData'
);
