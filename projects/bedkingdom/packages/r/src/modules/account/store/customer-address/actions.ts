import { generateAction } from '@main/packages-web-redux/dist/util/createAction';
import type { Customer, CustomerAddress } from '@vjcspy/apollo';

const PREFIX = 'CUSTOMER_ADDRESS';

const getCustomerAddress = generateAction<
  any,
  { addresses: CustomerAddress[]; customer?: Customer }
>('GET_CUSTOMER_ADDRESS', PREFIX);
export const getCustomerAddressAction = getCustomerAddress.ACTION;
export const getCustomerAddressAfterAction = getCustomerAddress.AFTER;
export const getCustomerAddressErrorAction = getCustomerAddress.ERROR;

const updateAdd = generateAction<{}, { address: CustomerAddress }>(
  'UPDATE_CUSTOMER_ADDRESS'
);
export const updateCustomerAddressAction = updateAdd.ACTION;
export const updateCustomerAddressAfterAction = updateAdd.AFTER;
export const updateCustomerAddressErrorAction = updateAdd.ERROR;

const createNewAdd = generateAction<
  { address: CustomerAddress },
  { address: CustomerAddress }
>('CREATE_NEW_ADDRESS', PREFIX);
export const createNewCustomerAddressAction = createNewAdd.ACTION;
export const createNewCustomerAddressAfterAction = createNewAdd.AFTER;
export const createNewCustomerAddressErrorAction = createNewAdd.ERROR;

const deleteCustomerAdd = generateAction<
  { id: number },
  { isSuccess: boolean }
>('DELETE_CUSTOMER_ADDRESS', PREFIX);
export const deleteCustomerAddressAction = deleteCustomerAdd.ACTION;
export const deleteCustomerAddressAfterAction = deleteCustomerAdd.AFTER;
export const deleteCustomerAddressErrorAction = deleteCustomerAdd.ERROR;
