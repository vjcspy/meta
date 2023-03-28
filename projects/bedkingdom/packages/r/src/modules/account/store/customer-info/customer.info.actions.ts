import { generateAction } from '@main/packages-web-redux/dist/util/createAction';
import type { CustomerUpdateInput } from '@vjcspy/apollo';

const PREFIX = 'CUSTOMER_INFO';

const updateCustomerInfo = generateAction<
  { info: CustomerUpdateInput },
  { customer: any }
>('UPDATE_CUSTOMER_INFO', PREFIX);
export const updateCustomerInfoAction = updateCustomerInfo.ACTION;
export const updateCustomerInfoAfterAction = updateCustomerInfo.AFTER;
export const updateCustomerInfoErrorAction = updateCustomerInfo.ERROR;
