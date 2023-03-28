import { useCustomerInfoActions } from '@modules/account/hook/useCustomerInfoActions';
import { createUiHOC } from '@web/ui-extension';

export const withUpdateCustomerInfoActions = createUiHOC(
  () => useCustomerInfoActions(),
  'withUpdateCustomerInfoActions'
);
