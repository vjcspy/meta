import { useBedCustomerOrders } from '@extensions/bed-kingdom/hook/account/my-orders/useBedCustomerOrders';
import { createUiHOC } from '@web/ui-extension';

export const withBedCustomerOrders = createUiHOC(() => {
  return useBedCustomerOrders();
}, 'withBedCustomerOrders');
