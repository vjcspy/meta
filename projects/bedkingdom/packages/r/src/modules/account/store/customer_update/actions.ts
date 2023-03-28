import { generateAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'UPDATE_ACTION';

const updateCustomer = generateAction<{}, { status: boolean }>(
  'UPDATE_CUSTOMER',
  PREFIX
);
export const updateCustomerAction = updateCustomer.ACTION;
export const updateCustomerAfterAction = updateCustomer.AFTER;
export const updateCustomerFailAction = updateCustomer.ERROR;
