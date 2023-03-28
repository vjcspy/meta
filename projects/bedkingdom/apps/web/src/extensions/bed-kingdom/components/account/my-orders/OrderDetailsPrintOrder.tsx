import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const OrderDetailsPrintOrder: React.FC<{ orderDetail: any }> = combineHOC()(
  React.memo((props) => {
    const componentRef = useRef<any>();

    return (
      <>
        <div className="action print text-color-2362AA cursor-pointer">
          <ReactToPrint
            trigger={() => <span>Print Order</span>}
            content={() => componentRef.current}
          />
        </div>
        <div className="hidden">
          <table
            className="table-additional-addresses-items w-full "
            ref={componentRef}
          >
            <thead>
              <tr className="hidden md:table-row text-left text-color-222 whitespace-nowrap">
                <th
                  scope="col"
                  className="col firstname pl-0"
                  style={{ paddingLeft: '60px', paddingTop: '30px' }}
                >
                  Product Name
                </th>
                <th
                  scope="col"
                  className="col lastname"
                  style={{ paddingLeft: '60px' }}
                >
                  SKU
                </th>
                <th
                  scope="col"
                  className="col streetaddress"
                  style={{ paddingLeft: '60px' }}
                >
                  Price
                </th>
                <th
                  scope="col"
                  className="col city"
                  style={{ paddingLeft: '60px' }}
                >
                  Qty
                </th>
                <th
                  scope="col"
                  className="col country text-right pr-0"
                  style={{ paddingLeft: '60px' }}
                >
                  Subtotal
                </th>
              </tr>
            </thead>
            <tbody>
              {props?.orderDetail?.items.map((item: any) => (
                <tr
                  key={item?.id}
                  style={{ paddingLeft: '60px', paddingTop: '50px' }}
                >
                  <td data-th="Name" className="col firstname pl-0 pb-4 pt-4">
                    <div className="item-options inline-block">
                      <div className="product name product-item-name font-bold">
                        {item?.product_name}
                      </div>
                      {item?.entered_options &&
                        item?.entered_options.length > 0 &&
                        item?.entered_options.map((it: any) => (
                          <div key={it?.value}>
                            <div className="font-bold mt-3 block">
                              {it?.label}
                            </div>
                            <div>{it?.value} </div>
                          </div>
                        ))}
                      {item?.additional_options &&
                        item?.additional_options.length > 0 &&
                        item?.additional_options.map((it: any) => (
                          <div key={it?.value}>
                            <div className="font-bold mt-3 block">
                              {it?.label}
                            </div>
                            <div>{it?.value} </div>
                          </div>
                        ))}

                      {item?.selected_options &&
                        item?.selected_options.length > 0 &&
                        item?.selected_options.map((it: any) => (
                          <div key={it?.value}>
                            <div className="font-bold mt-3">{it?.label}</div>
                            <div>{it?.value}</div>
                          </div>
                        ))}
                    </div>
                  </td>
                  <td data-th="SKU" className="col sku">
                    {item?.product_sku}
                  </td>
                  <td data-th="Price" className="col price text-16px font-bold">
                    <UiExtension
                      uiId="CURRENCY"
                      price={item?.product_sale_price?.value}
                    />
                  </td>
                  <td className="col qty" data-th="Qty">
                    <div className="item-options inline-block">
                      <div>Ordered: {item?.quantity_ordered}</div>
                      <div>Shipped: {item?.quantity_shipped}</div>
                    </div>
                  </td>
                  <td
                    data-th="Subtotal"
                    className="col subtotal pr-0 md:text-right text-16px font-bold pb-0"
                  >
                    <UiExtension
                      uiId="CURRENCY"
                      price={
                        item?.product_sale_price?.value * item?.quantity_ordered
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="order-total pt-5 text-16px">
            <div className="md:text-right mb-2">
              Subtotal
              <span className="price pl-3">
                <UiExtension
                  uiId="CURRENCY"
                  price={props?.orderDetail?.total?.subtotal?.value}
                />
              </span>
            </div>
            <div className="md:text-right mb-2">
              Shipping &amp; Handling
              <span className="price pl-3">
                <UiExtension
                  uiId="CURRENCY"
                  price={props?.orderDetail?.total?.total_shipping?.value}
                />
              </span>
            </div>
            <div className="md:text-right mb-2">
              Tax
              <span className="price  pl-3">
                <UiExtension
                  uiId="CURRENCY"
                  price={props?.orderDetail?.total?.total_tax?.value}
                />
              </span>
            </div>
            <div className="md:text-right">
              <strong>Grand Total</strong>
              <strong>
                <span className="price pl-3">
                  <UiExtension
                    uiId="CURRENCY"
                    price={props?.orderDetail?.total?.grand_total?.value}
                  />
                </span>
              </strong>
            </div>
          </div>
        </div>
      </>
    );
  })
);

export default OrderDetailsPrintOrder;
