import { createBuilderCallback } from '@main/packages-web-redux/dist/util/createBuilderCallback';
import type { AccountState } from '@modules/account/store/account.state';
import {
  getCustomerOrderDetailAction,
  getCustomerOrderDetailAfterAction,
  gotCustomerOrders,
  setOrdersPageFilter,
} from '@modules/account/store/customer-order/actions';
import filter from 'lodash/filter';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';

export const customerOrderBuilderCallBack = createBuilderCallback<AccountState>(
  (builder) => {
    builder.addCase(setOrdersPageFilter, (state, action) => {
      if (action.payload.pageFilter?.currentPage == 1) {
        state.orders = [];
      }

      state.ordersPageFilter = action.payload.pageFilter;
    });
    builder
      .addCase(gotCustomerOrders, (state, action) => {
        if (action.payload?.mergeWithExisting && action.payload?.pageInfo) {
          if (action.payload.pageInfo.current_page == 1) {
            state.orders = [];
          }

          state.orders = filter(
            state.orders,
            (p) =>
              p?.pageInfo?.current_page &&
              action.payload!.pageInfo!.current_page &&
              p?.pageInfo?.current_page !=
                action.payload!.pageInfo!.current_page
          );
          state.orders.push(
            ...map(action.payload.orders, (o) => {
              const newOrder = { ...o };
              newOrder['pageInfo'] = { ...action.payload.pageInfo };

              return newOrder;
            })
          );
        } else {
          state.orders = action.payload.orders;
        }
        orderBy(
          state.orders,
          (order) => new Date(order.order_date).getTime(),
          'desc'
        );
      })
      .addCase(getCustomerOrderDetailAction, (state) => {
        state.orderDetail = null;
      })
      .addCase(getCustomerOrderDetailAfterAction, (state, action) => {
        state.orderDetail = action.payload.order;
      });
  }
);
