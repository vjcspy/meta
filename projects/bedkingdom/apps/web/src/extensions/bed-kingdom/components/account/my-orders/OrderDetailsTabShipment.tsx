import { combineHOC } from '@web/ui-extension';
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';

const OrderDetailsTabShipment: React.FC<{ shipments: any }> = combineHOC()(
  React.memo((props) => {
    const componentRef = useRef<any>();

    return (
      <>
        <div className="actions-toolbar">
          <span className="action print text-color-2362AA cursor-pointer">
            <ReactToPrint
              trigger={() => <span>Print All Shipment</span>}
              content={() => componentRef.current}
            />
          </span>
        </div>
        {props?.shipments.map((shipment: any) => (
          <div key={shipment?.number} ref={componentRef}>
            <div
              className="order-title block mb-3 flex justify-between "
              style={{ padding: '60px 60px 0' }}
            >
              <div>
                <strong className="text-22px pr-6">
                  Invoice #{shipment?.number}
                </strong>
                <span className="action print text-color-2362AA pl-4 cursor-pointer">
                  <ReactToPrint
                    trigger={() => <span>Print Shipment</span>}
                    content={() => componentRef.current}
                  />
                </span>
              </div>
              <span className="action print text-color-2362AA cursor-pointer">
                <span>Track this shipment</span>
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
                  <th scope="col" className="col city">
                    Qty Shipped
                  </th>
                </tr>
              </thead>
              <tbody>
                {shipment?.items?.map((inx: any) => (
                  <tr
                    key={inx?.id}
                    style={{ paddingLeft: '60px', paddingTop: '20px' }}
                    className="table-additional-addresses-tr"
                  >
                    <td
                      className="col name pl-0 pb-4 pt-4"
                      data-th="Product Name"
                    >
                      <strong className="product name product-item-name">
                        {inx?.product_name}
                      </strong>
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
                    </td>
                    <td data-th="SKU" className="col sku">
                      {inx?.product_sku}
                    </td>
                    <td className="col qty" data-th="Qty">
                      <span className="title">
                        {inx?.order_item?.quantity_shipped}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </>
    );
  })
);

export default OrderDetailsTabShipment;
