import { combineHOC } from '@web/ui-extension';
import React from 'react';

const MyAccountDashboard = combineHOC()(() => {
  return (
    <div className="b-sidebar-additional">
      <div className="b-block-sidebar">
        <h1 className="b-account-title mb-5 mdm:font-bold">
          <span className="text-26px">My Account</span>
        </h1>
        <div className="block-dashboard-info x mb-6 md:mb-12">
          <div className="block-title mb-4 border-b border-color-ccc pb-2 text-20px">
            <strong>Account Information</strong>
          </div>
          <div className="block-content grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="box-information">
              <strong className="box-title mb-2 block text-16px">
                <span>Contact Information</span>
              </strong>
              <div className="box-content">
                <p>binh lx binh@binh.com</p>
              </div>
              <div className="box-actions mt-4 block">
                <a
                  className="action edit mr-2 border-r border-color-ccc pr-2 text-main-1979c3"
                  href="https://admin.magedemo.co.uk/customer/account/edit/"
                >
                  <span>Edit</span>
                </a>
                <a
                  href="https://admin.magedemo.co.uk/customer/account/edit/changepass/1/"
                  className="action change-password text-main-1979c3"
                >
                  Change Password
                </a>
              </div>
            </div>
            <div className="box box-newsletter">
              <strong className="box-title mb-2 block text-16px">
                <span>Newsletters</span>
              </strong>
              <div className="box-content">
                <p>You aren subscribed to our newsletter. </p>
              </div>
              <div className="box-actions mt-4 block">
                <a
                  className="action edit text-main-1979c3"
                  href="https://admin.magedemo.co.uk/newsletter/manage/"
                >
                  <span>Edit</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="block-dashboard-addresses mb-6 md:mb-12">
          <div className="block-title mb-4 border-b border-color-ccc pb-2 text-18px">
            <strong>Address Book</strong>
            <a
              className="action edit cursor-pointer pl-4 text-14px text-main-1979c3"
              href="https://admin.magedemo.co.uk/customer/address/"
            >
              <span>Manage Addresses</span>
            </a>
          </div>
          <div className="block-content grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="box box-billing-address">
              <strong className="box-title mb-2 block text-16px">
                <span>Default Billing Address</span>
              </strong>
              <div className="box-content">
                <div>
                  lx binh
                  <br />
                  Bedkingdom
                  <br />
                  OLDFIELD LANE
                  <br />
                  Heckmondwike, WF16 0JD
                  <br />
                  United Kingdom
                  <br />
                  T: 1312312
                </div>
              </div>
              <div className="box-actions mt-4">
                <a
                  className="action edit text-main-1979c3"
                  href="https://admin.magedemo.co.uk/customer/address/edit/id/76788/"
                  data-ui-id="default-billing-edit-link"
                >
                  <span>Edit Address</span>
                </a>
              </div>
            </div>
            <div className="box box-shipping-address">
              <strong className="box-title mb-2 block text-16px">
                <span>Default Shipping Address</span>
              </strong>
              <div className="box-content">
                <address>
                  lx binh
                  <br />
                  Bedkingdom
                  <br />
                  OLDFIELD LANE
                  <br />
                  Heckmondwike, WF16 0JD
                  <br />
                  United Kingdom
                  <br />
                  T: 1312312
                </address>
              </div>
              <div className="box-actions mt-4">
                <a
                  className="action edit text-main-1979c3"
                  href="https://admin.magedemo.co.uk/customer/address/edit/id/76788/"
                  data-ui-id="default-shipping-edit-link"
                >
                  <span>Edit Address</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="block-dashboard-orders block">
          <div className="block-title mb-4 border-b border-color-ccc pb-2 text-20px">
            <strong>Recent Orders</strong>
            <a
              className="action view pl-4 text-14px text-main-1979c3"
              href="https://admin.magedemo.co.uk/sales/order/history/"
            >
              <span>View All</span>
            </a>
          </div>
          <div className="block-content">
            <div className="table-wrapper orders-recent">
              <table className="table-order-items w-full" id="my-orders-table">
                <thead className="mdm:hidden">
                  <tr className="text-left text-color-222">
                    <th scope="col" className="id pl-0 text-color-222">
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
                  <tr className="weight-600 md:text-15px">
                    <td
                      data-th="Order #"
                      className="col id py-3 pl-0 font-bold md:text-16px"
                    >
                      2000103878
                    </td>
                    <td data-th="Date" className="col date py-3">
                      25/10/2021
                    </td>
                    <td data-th="Ship To" className="col shipping py-3">
                      lx binh
                    </td>
                    <td data-th="Order Total" className="col total py-3">
                      <span className="price">£549.99</span>
                    </td>
                    <td data-th="Status" className="col status py-3">
                      <span className="status-order">Pending</span>
                    </td>
                    <td
                      data-th="Actions"
                      className="col actions pr-0 md:text-right"
                    >
                      <span className="action view mr-2 cursor-pointer border-r border-color-ccc pr-2 underline">
                        <span>View Order</span>
                      </span>
                      <span className="action order cursor-pointer  underline">
                        <span>Reorder</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="weight-600 md:text-15px">
                    <td
                      data-th="Order #"
                      className="col id py-3 pl-0 font-bold md:text-16px"
                    >
                      2000103878
                    </td>
                    <td data-th="Date" className="col date py-3">
                      25/10/2021
                    </td>
                    <td data-th="Ship To" className="col shipping py-3">
                      lx binh
                    </td>
                    <td data-th="Order Total" className="col total py-3">
                      <span className="price">£549.99</span>
                    </td>

                    <td data-th="Status" className="col status py-3">
                      {/*add class cho 4 trang thai khac nhau*/}
                      <span className="status-order completed">completed</span>
                    </td>
                    <td
                      data-th="Actions"
                      className="col actions pr-0 md:text-right"
                    >
                      <span className="action view mr-2 cursor-pointer border-r border-color-ccc pr-2 underline">
                        <span>View Order</span>
                      </span>
                      <span className="action order cursor-pointer  underline">
                        <span>Reorder</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="weight-600 md:text-15px">
                    <td
                      data-th="Order #"
                      className="col id py-3 pl-0 font-bold md:text-16px"
                    >
                      2000103878
                    </td>
                    <td data-th="Date" className="col date py-3">
                      25/10/2021
                    </td>
                    <td data-th="Ship To" className="col shipping py-3">
                      lx binh
                    </td>
                    <td data-th="Order Total" className="col total py-3">
                      <span className="price">£549.99</span>
                    </td>
                    <td data-th="Status" className="col status py-3">
                      <span className="status-order processing">
                        processing
                      </span>
                    </td>
                    <td
                      data-th="Actions"
                      className="col actions pr-0 md:text-right"
                    >
                      <span className="action view mr-2 cursor-pointer border-r border-color-ccc pr-2 underline">
                        <span>View Order</span>
                      </span>
                      <span className="action order cursor-pointer  underline">
                        <span>Reorder</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="weight-600 md:text-15px">
                    <td
                      data-th="Order #"
                      className="col id py-3 pl-0 font-bold md:text-16px"
                    >
                      2000103878
                    </td>
                    <td data-th="Date" className="col date py-3">
                      25/10/2021
                    </td>
                    <td data-th="Ship To" className="col shipping py-3">
                      lx binh
                    </td>
                    <td data-th="Order Total" className="col total py-3">
                      <span className="price">£549.99</span>
                    </td>
                    <td data-th="Status" className="col status py-3">
                      <span className="status-order canceled">canceled</span>
                    </td>
                    <td
                      data-th="Actions"
                      className="col actions py-3 pr-0 md:text-right"
                    >
                      <span className="action view mr-2 cursor-pointer border-r border-color-ccc pr-2 underline">
                        <span>View Order</span>
                      </span>
                      <span className="action order cursor-pointer  underline">
                        <span>Reorder</span>
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default MyAccountDashboard;
