import { withBedCustomerOrders } from '@extensions/bed-kingdom/hoc/account/my-orders/withBedCustomerOrders';
import ROUTES from '@values/extendable/ROUTES';
import { withReorderActions } from '@vjcspy/r/build/modules/account/hoc/my-orders/withReorderActions';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import size from 'lodash/size';
import moment from 'moment/moment';
import React, { useMemo } from 'react';

const MyAccountOrders = combineHOC(
  withBedCustomerOrders,
  withReorderActions
)((props) => {
  const itemFrom = useMemo(() => {
    if (props.state?.pageInfoRes) {
      if (
        props.state?.pageInfoRes.page_size &&
        props.state?.pageInfoRes.current_page &&
        props.state?.pageInfoRes.current_page > 1
      ) {
        return (
          props.state?.pageInfoRes.current_page *
            props.state?.pageInfoRes.page_size -
          props.state?.pageInfoRes.page_size
        );
      }
    }
    return 1;
  }, [props.state?.pageInfoRes]);

  const itemTo = useMemo(() => {
    if (
      props.state?.pageInfoRes &&
      props.state?.pageInfoRes?.page_size &&
      props.state?.pageInfoRes?.current_page
    ) {
      if (props.state?.pageInfoRes?.page_size > props?.state?.totalCount) {
        return props?.state?.totalCount;
      } else {
        return (
          props.state?.pageInfoRes?.page_size *
          props.state?.pageInfoRes?.current_page
        );
      }
    }
  }, [props.state?.pageInfoRes]);

  return (
    <div className="b-sidebar-additional">
      <div className="b-block-sidebar">
        <h1 className="b-account-title mt-4 mb-5 mdm:font-bold">
          <span className="text-26px">My Orders</span>
        </h1>
        {props?.state?.isUpdatingTotals && (
          <UiExtension uiId="LOADING_INDICATOR" global={false} />
        )}
        <div className="b-block-dashboard-orders">
          {props?.state?.orders && size(props?.state?.orders) > 0 ? (
            <>
              <div className="block-content">
                <div className="table-wrapper orders-recent">
                  <table
                    className="table-order-items w-full"
                    id="my-orders-table"
                  >
                    <thead className="mdm:hidden">
                      <tr className="text-color-222 text-left">
                        <th scope="col" className="id text-color-222 pl-0">
                          Order #
                        </th>
                        <th scope="col" className="date text-color-222">
                          Date
                        </th>
                        <th scope="col" className="shipping text-color-222">
                          Ship To
                        </th>
                        <th scope="col" className="total text-color-222">
                          Order Total
                        </th>
                        <th scope="col" className="status text-color-222">
                          Status
                        </th>
                        <th scope="col" className="actions text-color-222" />
                      </tr>
                    </thead>
                    <tbody>
                      {props?.state?.orders.map((order: any) => {
                        let statusClass = '';
                        switch (order?.status) {
                          case 'Canceled':
                            statusClass = 'canceled';
                            break;
                          case 'Processing':
                            statusClass = 'processing';
                            break;
                          case 'Complete':
                            statusClass = 'completed';
                            break;
                          case 'Pending':
                            statusClass = 'pending';
                            break;
                        }

                        return (
                          <tr
                            className="md:text-15px weight-600"
                            key={order?.number}
                          >
                            <td
                              data-th="Order #"
                              className="col id font-bold md:text-16px pt-3 pb-3 pl-0"
                            >
                              {order?.number}
                            </td>
                            <td data-th="Date" className="col date pt-3 pb-3">
                              {moment(order?.order_date).format('DD/MM/YYYY')}
                            </td>
                            <td
                              data-th="Ship To"
                              className="col shipping pt-3 pb-3"
                            >
                              {order?.shipping_address?.firstname}{' '}
                              {order?.shipping_address?.lastname}
                            </td>
                            <td
                              data-th="Order Total"
                              className="col total pt-3 pb-3"
                            >
                              <span className="price">
                                <UiExtension
                                  uiId="CURRENCY"
                                  price={order?.total?.grand_total?.value}
                                />
                              </span>
                            </td>
                            <td
                              data-th="Status"
                              className="col status pt-3 pb-3"
                            >
                              <span
                                className={clsx('status-order', statusClass)}
                              >
                                {order?.status}
                              </span>
                            </td>
                            <td
                              data-th="Actions"
                              className="col actions md:text-right pr-0"
                            >
                              <span
                                className="action view border-r border-color-ccc mr-2 pr-2 cursor-pointer underline"
                                onClick={() => {
                                  RouterSingleton.push(
                                    '/' +
                                      ROUTES.r('ORDER_DETAIL') +
                                      '?order_number=' +
                                      order?.number
                                  );
                                }}
                              >
                                <span>View Order</span>
                              </span>
                              <span
                                className="action order cursor-pointer  underline"
                                onClick={() => {
                                  if (
                                    typeof props?.actions?.reorderAction ===
                                    'function'
                                  ) {
                                    props?.actions?.reorderAction(
                                      order?.number
                                    );
                                  }
                                }}
                              >
                                <span className="cursor-pointer">Reorder</span>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
              <UiExtension
                uiId="MY_ACCOUNT_PAGING"
                itemCount={props?.state?.totalCount}
                totalPage={props?.state?.pageInfoRes?.total_pages}
                itemFrom={itemFrom}
                itemTo={itemTo}
                currentPage={props?.state?.pageInfoRes?.current_page}
                pageSize={props?.state?.pageInfoRes?.page_size}
                setPageSizeAction={props?.actions?.setPageSizeAction}
                setPageCurrentAction={props?.actions?.setPageCurrentAction}
              />
            </>
          ) : (
            <div className="block-content">
              <div className="table-wrapper orders-recent">
                <span>You don't have any orders yet!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MyAccountOrders;
