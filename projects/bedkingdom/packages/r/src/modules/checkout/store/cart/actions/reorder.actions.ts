import { createAction } from '@main/packages-web-redux/dist/util/createAction';

const PREFIX = 'CHECKOUT_REORDER';

const CHECKOUT_REORDER_ACTION = 'CHECKOUT_REORDER_ACTION';
export const reorderCartAction = createAction<{
  orderNumber: string;
}>(CHECKOUT_REORDER_ACTION, PREFIX);

const CHECKOUT_REORDER_ACTION_AFTER = 'CHECKOUT_REORDER_ACTION_AFTER';
export const reorderCartAfterAction = createAction<{
  cart: any;
}>(CHECKOUT_REORDER_ACTION_AFTER, PREFIX);

const CHECKOUT_REORDER_ACTION_ERROR = 'CHECKOUT_REORDER_ACTION_ERROR';
export const reorderCartErrorAction = createAction<{
  error: any;
}>(CHECKOUT_REORDER_ACTION_ERROR, PREFIX);
