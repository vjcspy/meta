import { withBedKingdomCustomerOrderDetail } from '@extensions/bed-kingdom/hoc/account/my-orders/withBedKingdomCustomerOrderDetail';
import { withReorderActions } from '@vjcspy/r/build/modules/account/hoc/my-orders/withReorderActions';
import { withInitAccountState } from '@vjcspy/r/build/modules/account/hoc/withInitAccountState';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import size from 'lodash/size';
import moment from 'moment/moment';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const OrderDetails: React.FC = combineHOC(
  withBedKingdomCustomerOrderDetail,
  withInitAccountState,
  withReorderActions
)(
  React.memo((props) => {
    const router = useRouter();
    const { order_number } = router.query;
    const [activeTab, setActiveTab] = useState('item');

    useEffect(() => {
      if (
        typeof props.actions?.getOrderDetail === 'function' &&
        order_number &&
        props.state?.isResolvedAccountState === true
      ) {
        props.actions.getOrderDetail(order_number);
      }
    }, [order_number, props.state?.isResolvedAccountState]);

    return (
      <div className="b-block-sidebar table-wrapper">
        {props?.state?.isUpdatingTotals && (
          <UiExtension uiId="LOADING_INDICATOR" global={false} />
        )}
        <h1 className="b-account-title mt-4 mb-5 flex items-center mdm:font-bold">
          <span className="text-22px md:text-36px">
            Order # {props?.state?.orderDetail?.number}
          </span>
          <span className="order-status ml-6 rounded-3 border-2 py-1 px-4 text-12px uppercase md:inline-block">
            {props?.state?.orderDetail?.status}
          </span>
        </h1>
        <span className="order-status">
          {props?.state?.orderDetail?.status}
        </span>
        <div className="order-date">
          <span className="label">Order Date:</span>{' '}
          <span>
            {moment(props?.state?.orderDetail?.order_date).format(
              'DD MMMM  YYYY'
            )}
          </span>
        </div>
        <div className="actions-toolbar order-actions-toolbar mt-4">
          <div className="actions flex justify-between">
            <div
              className="action order cursor-pointer text-color-2362AA"
              onClick={() => {
                if (
                  typeof props?.actions?.reorderAction === 'function' &&
                  props?.state?.orderDetail?.number
                ) {
                  props?.actions?.reorderAction(
                    props?.state?.orderDetail?.number
                  );
                }
              }}
            >
              <span>Reorder</span>
            </div>
            <div className="action print text-color-2362AA">
              <UiExtension
                uiId="BEDKINGDOM_ORDER_DETAILS_PRINT_ORDER"
                orderDetail={props?.state?.orderDetail}
              />
            </div>
          </div>
        </div>

        {/*active tab*/}
        <ul className="items order-links mt-3 mdm:mb-3">
          <li
            className={clsx(
              'nav item  order-title',
              activeTab === 'item' && 'current'
            )}
            onClick={() => {
              setActiveTab('item');
            }}
          >
            <span>Items Ordered</span>
          </li>
          {props?.state?.orderDetail?.status === 'Complete' && (
            <li
              className={clsx(
                'nav item  order-title',
                activeTab === 'invoices' && 'current'
              )}
              onClick={() => {
                setActiveTab('invoices');
              }}
            >
              <span>Invoices</span>
            </li>
          )}

          {props?.state?.orderDetail?.status === 'Complete' && (
            <li
              className={clsx(
                'nav item  order-title',
                activeTab === 'shipments' && 'current'
              )}
              onClick={() => {
                setActiveTab('shipments');
              }}
            >
              <span>Order Shipments</span>
            </li>
          )}
        </ul>
        <div className="table-order-items order-items-detail">
          {/*Tab Items*/}
          {activeTab === 'item' && (
            <>
              <table className="table-additional-addresses-items w-full">
                <thead>
                  <tr className="hidden whitespace-nowrap text-left text-color-222 md:table-row">
                    <th scope="col" className="col firstname pl-0">
                      Product Name
                    </th>
                    <th scope="col" className="col lastname">
                      SKU
                    </th>
                    <th scope="col" className="col streetaddress">
                      Price
                    </th>
                    <th scope="col" className="col city">
                      Qty
                    </th>
                    <th scope="col" className="col country pr-0 text-right">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props?.state?.orderDetail?.items.map((item: any) => (
                    <tr key={item?.id}>
                      <td data-th="Name" className="col firstname py-4 pl-0">
                        <div className="item-options inline-block">
                          <div className="product name product-item-name font-bold">
                            {item?.product_name}
                          </div>
                          {item?.entered_options &&
                            item?.entered_options.length > 0 &&
                            item?.entered_options.map((it: any) => (
                              <div key={it?.value}>
                                <div className="mt-3 block font-bold">
                                  {it?.label}
                                </div>
                                <div>{it?.value} </div>
                              </div>
                            ))}
                          {item?.additional_options &&
                            item?.additional_options.length > 0 &&
                            item?.additional_options.map((it: any) => (
                              <div key={it?.value}>
                                <div className="mt-3 block font-bold">
                                  {it?.label}
                                </div>
                                <div>{it?.value} </div>
                              </div>
                            ))}

                          {item?.selected_options &&
                            item?.selected_options.length > 0 &&
                            item?.selected_options.map((it: any) => (
                              <div key={it?.value}>
                                <div className="mt-3 font-bold">
                                  {it?.label}
                                </div>
                                <div>{it?.value}</div>
                              </div>
                            ))}
                        </div>
                      </td>
                      <td data-th="SKU" className="col sku">
                        {item?.product_sku}
                      </td>
                      <td
                        data-th="Price"
                        className="col price font-bold md:text-16px"
                      >
                        <UiExtension
                          uiId="CURRENCY"
                          price={item?.product_sale_price?.value}
                        />
                      </td>
                      <td className="col qty" data-th="Qty">
                        <div className="item-options inline-block">
                          <div>Ordered: {item?.quantity_ordered}</div>
                          {props?.state?.orderDetail?.status === 'Complete' && (
                            <div>Shipped: {item?.quantity_shipped}</div>
                          )}
                        </div>
                      </td>
                      <td
                        data-th="Subtotal"
                        className="col subtotal pr-0 pb-0 text-16px font-bold md:text-right"
                      >
                        <UiExtension
                          uiId="CURRENCY"
                          price={
                            item?.product_sale_price?.value *
                            item?.quantity_ordered
                          }
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="order-total pt-5 text-16px">
                <div className="mb-2 md:text-right">
                  Subtotal
                  <span className="price pl-3">
                    <UiExtension
                      uiId="CURRENCY"
                      price={props?.state?.orderDetail?.total?.subtotal?.value}
                    />
                  </span>
                </div>
                <div className="mb-2 md:text-right">
                  Shipping &amp; Handling
                  <span className="price pl-3">
                    <UiExtension
                      uiId="CURRENCY"
                      price={
                        props?.state?.orderDetail?.total?.total_shipping?.value
                      }
                    />
                  </span>
                </div>
                <div className="mb-2 md:text-right">
                  Tax
                  <span className="price  pl-3">
                    <UiExtension
                      uiId="CURRENCY"
                      price={props?.state?.orderDetail?.total?.total_tax?.value}
                    />
                  </span>
                </div>
                <div className="md:text-right">
                  <strong>Grand Total</strong>
                  <strong>
                    <span className="price pl-3">
                      <UiExtension
                        uiId="CURRENCY"
                        price={
                          props?.state?.orderDetail?.total?.grand_total?.value
                        }
                      />
                    </span>
                  </strong>
                </div>
              </div>
            </>
          )}

          {/*Tab Invoice*/}
          {activeTab === 'invoices' &&
            props?.state?.orderDetail?.invoices &&
            size(props?.state?.orderDetail?.invoices) > 0 && (
              <UiExtension
                uiId="BEDKINGDOM_ORDER_DETAILS_TAB_INVOICE"
                invoices={props?.state?.orderDetail?.invoices}
              />
            )}
          {/*Tab Order Shipments*/}
          {activeTab === 'shipments' &&
            props?.state?.orderDetail?.shipments &&
            size(props?.state?.orderDetail?.shipments) > 0 && (
              <UiExtension
                uiId="BEDKINGDOM_ORDER_DETAILS_TAB_SHIPMENT"
                shipments={props?.state?.orderDetail?.shipments}
              />
            )}
        </div>
        <div className="block-order-details-view mt-6 block border-t border-color-ccc pt-5">
          <div className="block-title mb-4 text-16px">
            <strong>Order Information</strong>
          </div>
          <div className="block-content grid grid-cols-1 gap-2 md:grid-cols-2">
            <div className="box box-order-shipping-address mb-3">
              <strong className="box-title mb-2 block">
                <span>Shipping Address</span>
              </strong>
              <div className="box-content">
                <div>
                  {props?.state?.orderDetail?.shipping_address?.firstname}{' '}
                  {props?.state?.orderDetail?.shipping_address?.lastname} <br />
                  {props?.state?.orderDetail?.shipping_address?.street?.toString()}
                  <br />
                  {props?.state?.orderDetail?.shipping_address?.city}
                  <br />
                  {props?.state?.orderDetail?.shipping_address?.country_code &&
                    'United Kingdom'}
                  <br />
                  T: {props?.state?.orderDetail?.shipping_address?.telephone}
                </div>
              </div>
            </div>
            <div className="box box-order-shipping-method mb-3">
              <strong className="box-title mb-2 block">
                <span>Shipping Method</span>
              </strong>
              <div className="box-content">Free Delivery - Free </div>
            </div>
            <div className="box box-order-billing-address">
              <strong className="box-title mb-2 block">
                <span>Billing Address</span>
              </strong>
              <div className="box-content">
                <div>
                  {props?.state?.orderDetail?.billing_address?.firstname}{' '}
                  {props?.state?.orderDetail?.billing_address?.lastname} <br />
                  {props?.state?.orderDetail?.billing_address?.street?.toString()}
                  <br />
                  {props?.state?.orderDetail?.billing_address?.city}
                  <br />
                  {props?.state?.orderDetail?.billing_address?.country_code &&
                    'United Kingdom'}
                  <br />
                  T: {props?.state?.orderDetail?.billing_address?.telephone}
                </div>
              </div>
            </div>
            <div className="box box-order-billing-method">
              <strong className="box-title mb-2 block">
                <span> Payment Method</span>
              </strong>
              <div className="box-content">
                <dl className="payment-method checkmemo">
                  <dt className="title">
                    {props?.state?.orderDetail?.payment_methods &&
                      props?.state?.orderDetail?.payment_methods[0] &&
                      props?.state?.orderDetail?.payment_methods[0]?.name}
                  </dt>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  })
);

export default OrderDetails;
