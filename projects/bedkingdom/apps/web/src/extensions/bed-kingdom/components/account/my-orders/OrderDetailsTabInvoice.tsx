import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const OrderDetailsTabInvoice: React.FC<{ invoices: any }> = combineHOC()(
  React.memo((props) => {
    const componentRef = useRef<any>();

    return (
      <>
        <div className="actions-toolbar">
          <span className="action print text-color-2362AA cursor-pointer">
            <ReactToPrint
              trigger={() => <span>Print All Invoices</span>}
              content={() => componentRef.current}
            />
          </span>
        </div>
        {props?.invoices.map((invoice: any) => (
          <div key={invoice?.number} ref={componentRef}>
            <div
              className="order-title block mb-3"
              style={{ padding: '60px 60px 0' }}
            >
              <strong className="text-22px pr-6">
                Invoice #{invoice?.number}
              </strong>
              <span className="action print text-color-2362AA pl-4 cursor-pointer">
                <ReactToPrint
                  trigger={() => <span>Print Invoice</span>}
                  content={() => componentRef.current}
                />
              </span>
            </div>
            <table className="table-additional-addresses-items w-full">
              <thead>
                <tr className="hidden md:table-row text-left text-color-222 whitespace-nowrap">
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
                  <th scope="col" className="col country text-right pr-0">
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
                    <td data-th="Name" className="col firstname pl-0 pb-4 pt-4">
                      <div className="item-options inline-block">
                        <div className="product name product-item-name font-bold">
                          {inx?.product_name}
                        </div>
                        {inx?.order_item?.entered_options &&
                          inx?.order_item?.entered_options.length > 0 &&
                          inx?.order_item?.entered_options.map((it: any) => (
                            <div key={it?.value}>
                              <div className="font-bold mt-3 block">
                                {it?.label}
                              </div>
                              <div>{it?.value} </div>
                            </div>
                          ))}
                        {inx?.order_item?.additional_options &&
                          inx?.order_item?.additional_options.length > 0 &&
                          inx?.order_item?.additional_options.map((it: any) => (
                            <div key={it?.value}>
                              <div className="font-bold mt-3 block">
                                {it?.label}
                              </div>
                              <div>{it?.value} </div>
                            </div>
                          ))}

                        {inx?.order_item?.selected_options &&
                          inx?.order_item?.selected_options.length > 0 &&
                          inx?.order_item?.selected_options.map((it: any) => (
                            <div key={it?.value}>
                              <div className="font-bold mt-3">{it?.label}</div>
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
                      className="col subtotal pr-0 md:text-right text-16px font-bold pb-0"
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
              <div className="md:text-right mb-2">
                Subtotal
                <span className="price pl-3">
                  <UiExtension
                    uiId="CURRENCY"
                    price={invoice?.total?.subtotal?.value}
                  />
                </span>
              </div>
              <div className="md:text-right mb-2">
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
