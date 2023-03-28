import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CONTENT_ADDRESS';

const GET_CONTENT_ADDRESS_DATA_ACTION = 'GET_CONTENT_ADDRESS_DATA_ACTION';
export const getContentAddressDataAction = createAction(
  GET_CONTENT_ADDRESS_DATA_ACTION,
  PREFIX
);

const GET_CONTENT_ADDRESS_DATA_AFTER_ACTION =
  'GET_CONTENT_ADDRESS_DATA_AFTER_ACTION';
export const getContentAddressDataAfterAction = createAction<{
  addressData: any[];
}>(GET_CONTENT_ADDRESS_DATA_AFTER_ACTION, PREFIX);

const GET_CONTENT_ADDRESS_DATA_ERROR_ACTION =
  'GET_CONTENT_ADDRESS_DATA_ERROR_ACTION';
export const getContentAddressDataErrorAction = createAction<{
  error: Error;
}>(GET_CONTENT_ADDRESS_DATA_ERROR_ACTION, PREFIX);
