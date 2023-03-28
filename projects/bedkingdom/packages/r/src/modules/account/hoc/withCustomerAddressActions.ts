import { useCustomerAddActions } from '@modules/account/hook/useCustomerAddActions';
import { createUiHOC } from '@web/ui-extension';

export const withCustomerAddressActions = createUiHOC(
  () => useCustomerAddActions(),
  'withCustomerAddressActions'
);
