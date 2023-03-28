import { useBedCustomerAddressActions } from '@extensions/bed-kingdom/hook/account/usebedCustomerAddressActions';
import { createUiHOC } from '@web/ui-extension';

export const withBedCustomerAddressActions = createUiHOC(
  () => useBedCustomerAddressActions(),
  'withBedCustomerAddressActions'
);
