import { useCustomerAddress } from '@modules/account/hook/useCustomerAddress';
import { createUiHOC } from '@web/ui-extension';

export const withCustomerAddress = createUiHOC(
  () => useCustomerAddress(),
  'withCustomerAddress'
);
