import { withBedCustomerOrders } from '@extensions/bed-kingdom/hoc/account/my-orders/withBedCustomerOrders';
import { withBedKingdomAccountActions } from '@extensions/bed-kingdom/hoc/account/withBedKingdomAccountActions';
import { withBedStatusPopupData } from '@extensions/bed-kingdom/hoc/content/withBedStatusPopupData';
import ROUTES from '@values/extendable/ROUTES';
import { withReorderActions } from '@vjcspy/r/build/modules/account/hoc/my-orders/withReorderActions';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import size from 'lodash/size';
import moment from 'moment/moment';
import React, { useCallback, useMemo } from 'react';
import Popup from 'reactjs-popup';

const MyAccountInfo = combineHOC(
  withCustomer,
  withBedCustomerOrders,
  withBedKingdomAccountActions,
  withReorderActions,
  withBedStatusPopupData
)((props) => {
  const defaultBilling = useMemo(() => {
    if (
      props?.state?.customer?.default_billing &&
      props?.state?.customer?.addresses &&
      props?.state?.customer?.addresses.length > 0
    ) {
      const billing = props?.state?.customer?.addresses.filter(
        (item: any) => item?.id == props?.state?.customer?.default_billing
      );

      if (billing && billing.length > 0) {
        return billing[0];
      }
    }
    return false;
  }, [props?.state?.customer]);

  const defaultShipping = useMemo(() => {
    if (
      props?.state?.customer?.default_shipping &&
      props?.state?.customer?.addresses &&
      props?.state?.customer?.addresses.length > 0
    ) {
      const shipping = props?.state?.customer?.addresses.filter(
        (item: any) => item?.id == props?.state?.customer?.default_shipping
      );

      if (shipping && shipping.length > 0) {
        return shipping[0];
      }
    }
    return false;
  }, [props?.state?.customer]);

  const popupEditAddress = useCallback((address: any) => {
    return (
      <Popup
        trigger={
          <div className="action edit text-main-1979c3">
            <span>Edit Address</span>
          </div>
        }
        modal
        nested
        onOpen={() => {
          props?.actions?.setIsOpenPopupActions(true);
        }}
        onClose={() => {
          props?.actions?.setIsOpenPopupActions(false);
        }}
      >
        {
          // @ts-ignore
          (close: any) => (
            <div className="popup-form">
              <UiExtension
                uiId="FORM_DETAIL_ADDRESS"
                close={close}
                address={address}
              />
            </div>
          )
        }
      </Popup>
    );
  }, []);

  return (
    <div className="b-sidebar-additional">
      <div className="b-block-sidebar">
        <h1 className="b-account-title mb-5 mdm:font-bold">
          <span className="text-26px">My Account</span>
        </h1>
        <div className="block-dashboard-info mb-6 md:mb-12 zx">
          <div className="block-title border-b border-color-ccc text-20px pb-2 mb-4">
            <strong>Account Information</strong>
          </div>
          <div className="block-content grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="box-information">
              <strong className="box-title text-16px mb-2 block">
                <span>Contact Information</span>
              </strong>
              <div className="box-content">
                <p>
                  {props?.state?.customer?.firstname}{' '}
                  {props?.state?.customer?.lastname}{' '}
                  {props?.state?.customer?.email}
                </p>
              </div>
              <div className="box-actions mt-4 block">
                <div
                  className="action edit border-r border-color-ccc mr-2 pr-2 text-main-1979c3 inline-block"
                  onClick={() => {
                    RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT_EDIT'));
                  }}
                >
                  <span>Edit</span>
                </div>
                <div
                  onClick={() => {
                    if (
                      typeof props?.actions?.setStatusResetPassword ===
                      'function'
                    ) {
                      props?.actions?.setStatusResetPassword(true);
                    }
                    RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT_EDIT'));
                  }}
                  className="action change-password text-main-1979c3 inline-block"
                >
                  Change Password
                </div>
              </div>
            </div>
            <div className="box box-newsletter">
              <strong className="box-title text-16px mb-2 block">
                <span>Newsletters</span>
              </strong>
              <div className="box-content">
                {props?.state?.customer?.is_subscribed ? (
                  // eslint-disable-next-line react/no-unescaped-entities
                  <p>You are subscribed to "General Subscription". </p>
                ) : (
                  // eslint-disable-next-line react/no-unescaped-entities
                  <p>You aren't subscribed to our newsletter. </p>
                )}
              </div>
              <div className="box-actions mt-4 block">
                <div
                  className="action edit text-main-1979c3"
                  onClick={() => {
                    RouterSingleton.push(
                      '/' + ROUTES.r('MY_ACCOUNT_NEWSLETTER')
                    );
                  }}
                >
                  <span>Edit</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="block-dashboard-addresses mb-6 md:mb-12">
          <div className="block-title border-b border-color-ccc text-18px pb-2 mb-4">
            <strong>Address Book</strong>
            <span
              className="action edit text-14px pl-4 text-main-1979c3 cursor-pointer"
              onClick={() => {
                RouterSingleton.push('/' + ROUTES.r('ADDRESS_BOOK'));
              }}
            >
              <span>Manage Addresses</span>
            </span>
          </div>
          <div className="block-content grid grid-cols-1 md:grid-cols-2 gap-4">
            {defaultBilling && (
              <div className="box box-billing-address">
                <strong className="box-title text-16px mb-2 block">
                  <span>Default Billing Address</span>
                </strong>
                <div className="box-content">
                  <div>
                    {defaultBilling?.firstname} {defaultBilling?.lastname}{' '}
                    <br />
                    {defaultBilling?.street?.toString()}
                    <br />
                    {defaultBilling?.city}
                    <br />
                    {defaultBilling?.country_code && 'United Kingdom'}
                    <br />
                    T: {defaultBilling?.telephone}
                  </div>
                </div>
                <div className="box-actions mt-4">
                  {popupEditAddress(defaultBilling)}
                </div>
              </div>
            )}
            {defaultShipping && (
              <div className="box box-shipping-address">
                <strong className="box-title text-16px mb-2 block">
                  <span>Default Shipping Address</span>
                </strong>
                <div className="box-content">
                  <div>
                    {defaultShipping?.firstname} {defaultShipping?.lastname}{' '}
                    <br />
                    {defaultShipping?.street?.toString()}
                    <br />
                    {defaultShipping?.city}
                    <br />
                    {defaultShipping?.country_code && 'United Kingdom'}
                    <br />
                    T: {defaultShipping?.telephone}
                  </div>
                </div>
                <div className="box-actions mt-4">
                  {popupEditAddress(defaultShipping)}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="block block-dashboard-orders mb-4">
          <div className="block-title border-b border-color-ccc text-20px pb-2 mb-4">
            <strong>Recent Orders</strong>
            {props?.state?.orders && size(props?.state?.orders) > 0 && (
              <div
                className="action view text-14px pl-4 text-main-1979c3 inline-block"
                onClick={() => {
                  RouterSingleton.push('/' + ROUTES.r('MY_ACCOUNT_ORDERS'));
                }}
              >
                <span>View All</span>
              </div>
            )}
          </div>
          {props?.state?.orders && size(props?.state?.orders) > 0 ? (
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
                    {props?.state?.orders.slice(0, 5).map((order: any) => {
                      let statusClass = '';
                      switch (order?.status) {
                        case 'Canceled':
                          statusClass = 'canceled';
                          break;
                        case 'Processing':
                          statusClass = 'processing';
                          break;
                        case 'Completed':
                          statusClass = 'completed';
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
                          <td data-th="Status" className="col status pt-3 pb-3">
                            <span className={clsx('status-order', statusClass)}>
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
                                  props?.actions?.reorderAction(order?.number);
                                }
                              }}
                            >
                              <span>Reorder</span>
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          ) : (
            <div className="block-content">
              <div className="table-wrapper orders-recent">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <span>You don't have any orders yet!</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default MyAccountInfo;
