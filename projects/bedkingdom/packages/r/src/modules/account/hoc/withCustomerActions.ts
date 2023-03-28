import { useCustomerActions } from '@modules/account/hook/useCustomerActions';
import { createUiHOC } from '@web/ui-extension';

export const withCustomerActions = createUiHOC(() => {
  return useCustomerActions();
}, 'withCustomerActions');
