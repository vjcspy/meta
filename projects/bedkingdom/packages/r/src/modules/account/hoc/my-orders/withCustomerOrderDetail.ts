import { useCustomerOrderDetail } from '@modules/account/hook/my-orders/useCustomerOrderDetail';
import { createUiHOC } from '@web/ui-extension';

export const withCustomerOrderDetail = createUiHOC(() => {
  return useCustomerOrderDetail();
}, 'withCustomerOrderDetail');
