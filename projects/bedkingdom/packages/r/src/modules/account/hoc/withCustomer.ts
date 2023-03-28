import { useSelector } from '@main/packages-web-redux';
import { selectCustomer } from '@modules/account/store/account.selector';
import { selectIsUpdatingCustomerInfo } from '@modules/account/store/customer-info/customer-info.selector';
import { createUiHOC } from '@web/ui-extension';

export const withCustomer = createUiHOC(() => {
  const customer = useSelector(selectCustomer);
  const isUpdatingCustomerInfo = useSelector(selectIsUpdatingCustomerInfo);
  return {
    state: {
      customer,
      isUpdatingCustomerInfo,
    },
  };
}, 'withCustomer');
