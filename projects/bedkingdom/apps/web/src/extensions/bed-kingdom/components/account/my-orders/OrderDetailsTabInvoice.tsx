import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const OrderDetailsTabInvoice: React.FC<{ invoices: any }> = combineHOC()(
  React.memo((props) => {
    const componentRef = useRef<any>();

    return (
      <>
        <div className="actions-toolbar">
          <span className="action print cursor-pointer text-color-2362AA">
            <ReactToPrint
              trigger={() => <span>Print All Invoices</span>}
              content={() => componentRef.current}
            />
          </span>
        </div>
        {props?.invoices.map((invoice: any) => (
          <div key={invoice?.number} ref={componentRef}>
            <div
              className="order-title mb-3 block"
              style={{ padding: '60px 60px 0' }}
            >
              <strong className="pr-6 text-22px">
                Invoice #{invoice?.number}
              </strong>
              <span className="action print cursor-pointer pl-4 text-color-2362AA">
                <ReactToPrint
                  trigger={() => <span>Print Invoice</span>}
                  content={() => componentRef.current}
                />
              </span>
            </div>
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
                    Qty Invoiced
                  </th>
                  <th scope="col" className="col country pr-0 text-right">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoice?.items?.map((inx: any) => (
                  <tr
                    key={inx?.id}
                    style={{ paddingLeft: '60px', paddingTop: '20px' }}
                    className="table-additional-addresses-tr"
                  >
                    <td data-th="Name" className="col firstname py-4 pl-0">
                      <div className="item-options inline-block">
                        <div className="product name product-item-name font-bold">
                          {inx?.product_name}
                        </div>
                        {inx?.order_item?.entered_options &&
                          inx?.order_item?.entered_options.length > 0 &&
                          inx?.order_item?.entered_options.map((it: any) => (
                            <div key={it?.value}>
                              <div className="mt-3 block font-bold">
                                {it?.label}
                              </div>
                              <div>{it?.value} </div>
                            </div>
                          ))}
                        {inx?.order_item?.additional_options &&
                          inx?.order_item?.additional_options.length > 0 &&
                          inx?.order_item?.additional_options.map((it: any) => (
                            <div key={it?.value}>
                              <div className="mt-3 block font-bold">
                                {it?.label}
                              </div>
                              <div>{it?.value} </div>
                            </div>
                          ))}

                        {inx?.order_item?.selected_options &&
                          inx?.order_item?.selected_options.length > 0 &&
                          inx?.order_item?.selected_options.map((it: any) => (
                            <div key={it?.value}>
                              <div className="mt-3 font-bold">{it?.label}</div>
                              <div>{it?.value}</div>
                            </div>
                          ))}
                      </div>
                    </td>
                    <td data-th="SKU" className="col sku">
                      {inx?.product_sku}
                    </td>
                    <td
                      data-th="Price"
                      className="col price text-16px font-bold"
                    >
                      <UiExtension
                        uiId="CURRENCY"
                        price={inx?.product_sale_price?.value}
                      />
                    </td>
                    <td className="col qty" data-th="Qty">
                      <span className="title">
                        Ordered: {inx?.quantity_invoiced}
                      </span>
                    </td>
                    <td
                      data-th="Subtotal"
                      className="col subtotal pr-0 pb-0 text-16px font-bold md:text-right"
                    >
                      <UiExtension
                        uiId="CURRENCY"
                        price={
                          inx?.product_sale_price?.value *
                          inx?.quantity_invoiced
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              className="order-total pt-5 text-16px"
              style={{ paddingLeft: '60px', paddingTop: '20px' }}
            >
              <div className="mb-2 md:text-right">
                Subtotal
                <span className="price pl-3">
                  <UiExtension
                    uiId="CURRENCY"
                    price={invoice?.total?.subtotal?.value}
                  />
                </span>
              </div>
              <div className="mb-2 md:text-right">
                VAT
                <span className="price pl-3">
                  <UiExtension
                    uiId="CURRENCY"
                    price={invoice?.total?.total_tax?.value}
                  />
                </span>
              </div>
              <div className="md:text-right">
                <strong>Grand Total</strong>
                <strong>
                  <span className="price pl-3">
                    <UiExtension
                      uiId="CURRENCY"
                      price={invoice?.total?.grand_total?.value}
                    />
                  </span>
                </strong>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  })
);

export default OrderDetailsTabInvoice;
