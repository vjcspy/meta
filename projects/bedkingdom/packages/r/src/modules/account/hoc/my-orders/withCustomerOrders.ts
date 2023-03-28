import { useCustomerOrders } from '@modules/account/hook/my-orders/useCustomerOrders';
import { createUiHOC } from '@web/ui-extension';

export const withCustomerOrders = createUiHOC(() => {
  return useCustomerOrders();
}, 'withCustomerOrders');
