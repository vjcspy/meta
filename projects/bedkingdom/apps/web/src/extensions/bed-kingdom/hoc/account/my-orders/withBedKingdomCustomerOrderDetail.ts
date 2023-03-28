import { useBedKingdomCustomerOrderDetail } from '@extensions/bed-kingdom/hook/account/my-orders/useBedKingdomCustomerOrderDetail';
import { createUiHOC } from '@web/ui-extension';

export const withBedKingdomCustomerOrderDetail = createUiHOC(() => {
  return useBedKingdomCustomerOrderDetail();
}, 'withBedKingdomCustomerOrderDetail');
