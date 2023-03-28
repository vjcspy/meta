import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CORE_CONFIG';

const GET_CHECKOUT_CONFIG = 'GET_CHECKOUT_CONFIG';
export const getCheckoutConfig = createAction(GET_CHECKOUT_CONFIG, PREFIX);

const GET_CHECKOUT_CONFIG_AFTER = 'GET_CHECKOUT_CONFIG_AFTER';
export const getCheckoutConfigAfter = createAction<{ checkout: any }>(
  GET_CHECKOUT_CONFIG_AFTER,
  PREFIX
);

const GET_CHECKOUT_CONFIG_ERROR = 'GET_CHECKOUT_CONFIG_ERROR';
export const getCheckoutConfigError = createAction<{ error: any }>(
  GET_CHECKOUT_CONFIG_ERROR,
  PREFIX
);
