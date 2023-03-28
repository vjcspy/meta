import {
  createAction,
  generateAction,
} from '@main/packages-web-redux/dist/util/createAction';
import type { OrdersPageFilter } from '@modules/account/store/account.state';
import type { SearchResultPageInfo } from '@vjcspy/apollo';

const PREFIX = 'CUSTOMER_ORDER';

const GOT_CUSTOMER_ORDERS = 'GOT_CUSTOMER_ORDERS';
export const gotCustomerOrders = createAction<{
  orders: any;
  mergeWithExisting?: boolean;
  pageInfo?: SearchResultPageInfo;
}>(GOT_CUSTOMER_ORDERS, PREFIX);

const SET_ORDERS_PAGE_FILTER = 'SET_ORDERS_PAGE_FILTER';
export const setOrdersPageFilter = createAction<{
  pageFilter: OrdersPageFilter;
}>(SET_ORDERS_PAGE_FILTER, PREFIX);

const GET_CUSTOMER_ORDER_DETAIL = 'GET_CUSTOMER_ORDER_DETAIL';
const getCustomerOrderDetail = generateAction<{ orderId: any }, { order: any }>(
  GET_CUSTOMER_ORDER_DETAIL,
  PREFIX
);

export const getCustomerOrderDetailAction = getCustomerOrderDetail.ACTION;
export const getCustomerOrderDetailAfterAction = getCustomerOrderDetail.AFTER;
export const getCustomerOrderDetailErrorAction = getCustomerOrderDetail.ERROR;
