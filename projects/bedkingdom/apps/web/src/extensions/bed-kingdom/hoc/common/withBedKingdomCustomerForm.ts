import { useBedKingdomCustomeForm } from '@extensions/bed-kingdom/hook/common/useBedKingdomCustomeForm';
import { createUiHOC } from '@web/ui-extension';

export const withBedKingdomCustomerForm = createUiHOC(() => {
  return useBedKingdomCustomeForm();
}, 'withBedKingdomCustomerForm');
