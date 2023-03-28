import { useCustomerOrderPageInfo } from '@modules/account/hook/my-orders/useCustomerOrderPageInfo';
import { createUiHOC } from '@web/ui-extension';

export const withCustomerOrderPageInfo = createUiHOC(
  () => useCustomerOrderPageInfo(),
  'withCustomerOrderPageInfo'
);
