import { selectCustomerAddress } from '@modules/account/store/account.selector';
import { useSelector } from '@main/packages-web-redux';

import {
  selectDefaultShippingAddressId,
  selectDeletingAddressId,
} from '../store/customer-address/selector';

export const useCustomerAddress = () => {
  const customerAddress = useSelector(selectCustomerAddress);
  const deletingAddressId = useSelector(selectDeletingAddressId);
  const defaultAddressId = useSelector(selectDefaultShippingAddressId);

  return {
    state: {
      customerAddress,
      deletingAddressId,
      defaultAddressId,
    },
  };
};
