import { combineHOC } from '@web/ui-extension';
import React from 'react';

const MyAccountDashboard = combineHOC()((props) => {
  return (
    <div className="b-sidebar-additional">
      <div className="b-block-sidebar">
        <h1 className="b-account-title mb-5 mdm:font-bold">
          <span className="text-26px">My Account</span>
        </h1>
        <div className="block-dashboard-info mb-6 md:mb-12 x">
          <div className="block-title border-b border-color-ccc text-20px pb-2 mb-4">
            <strong>Account Information</strong>
          </div>
          <div className="block-content grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="box-information">
              <strong className="box-title text-16px mb-2 block">
                <span>Contact Information</span>
              </strong>
              <div className="box-content">
                <p>binh lx binh@binh.com</p>
              </div>
              <div className="box-actions mt-4 block">
                <a
                  className="action edit border-r border-color-ccc mr-2 pr-2 text-main-1979c3"
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
              <strong className="box-title text-16px mb-2 block">
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
          <div className="block-title border-b border-color-ccc text-18px pb-2 mb-4">
            <strong>Address Book</strong>
            <a
              className="action edit text-14px pl-4 text-main-1979c3 cursor-pointer"
              href="https://admin.magedemo.co.uk/customer/address/"
            >
              <span>Manage Addresses</span>
            </a>
          </div>
          <div className="block-content grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="box box-billing-address">
              <strong className="box-title text-16px mb-2 block">
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
              <strong className="box-title text-16px mb-2 block">
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
        <div className="block block-dashboard-orders">
          <div className="block-title border-b border-color-ccc text-20px pb-2 mb-4">
            <strong>Recent Orders</strong>
            <a
              className="action view text-14px pl-4 text-main-1979c3"
              href="https://admin.magedemo.co.uk/sales/order/history/"
            >
              <span>View All</span>
            </a>
          </div>
          <div className="block-content">
            <div className="table-wrapper orders-recent">
              <table className="table-order-items w-full" id="my-orders-table">
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
                  <tr className="md:text-15px weight-600">
                    <td
                      data-th="Order #"
                      className="col id font-bold md:text-16px pt-3 pb-3 pl-0"
                    >
                      2000103878
                    </td>
                    <td data-th="Date" className="col date pt-3 pb-3">
                      25/10/2021
                    </td>
                    <td data-th="Ship To" className="col shipping pt-3 pb-3">
                      lx binh
                    </td>
                    <td data-th="Order Total" className="col total pt-3 pb-3">
                      <span className="price">£549.99</span>
                    </td>
                    <td data-th="Status" className="col status pt-3 pb-3">
                      <span className="status-order">Pending</span>
                    </td>
                    <td
                      data-th="Actions"
                      className="col actions md:text-right pr-0"
                    >
                      <span className="action view border-r border-color-ccc mr-2 pr-2 cursor-pointer underline">
                        <span>View Order</span>
                      </span>
                      <span className="action order cursor-pointer  underline">
                        <span>Reorder</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="md:text-15px weight-600">
                    <td
                      data-th="Order #"
                      className="col id font-bold md:text-16px pt-3 pb-3 pl-0"
                    >
                      2000103878
                    </td>
                    <td data-th="Date" className="col date pt-3 pb-3">
                      25/10/2021
                    </td>
                    <td data-th="Ship To" className="col shipping pt-3 pb-3">
                      lx binh
                    </td>
                    <td data-th="Order Total" className="col total pt-3 pb-3">
                      <span className="price">£549.99</span>
                    </td>

                    <td data-th="Status" className="col status pt-3 pb-3">
                      {/*add class cho 4 trang thai khac nhau*/}
                      <span className="status-order completed">completed</span>
                    </td>
                    <td
                      data-th="Actions"
                      className="col actions md:text-right pr-0"
                    >
                      <span className="action view border-r border-color-ccc mr-2 pr-2 cursor-pointer underline">
                        <span>View Order</span>
                      </span>
                      <span className="action order cursor-pointer  underline">
                        <span>Reorder</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="md:text-15px weight-600">
                    <td
                      data-th="Order #"
                      className="col id font-bold md:text-16px pt-3 pb-3 pl-0"
                    >
                      2000103878
                    </td>
                    <td data-th="Date" className="col date pt-3 pb-3">
                      25/10/2021
                    </td>
                    <td data-th="Ship To" className="col shipping pt-3 pb-3">
                      lx binh
                    </td>
                    <td data-th="Order Total" className="col total pt-3 pb-3">
                      <span className="price">£549.99</span>
                    </td>
                    <td data-th="Status" className="col status pt-3 pb-3">
                      <span className="status-order processing">
                        processing
                      </span>
                    </td>
                    <td
                      data-th="Actions"
                      className="col actions md:text-right pr-0"
                    >
                      <span className="action view border-r border-color-ccc mr-2 pr-2 cursor-pointer underline">
                        <span>View Order</span>
                      </span>
                      <span className="action order cursor-pointer  underline">
                        <span>Reorder</span>
                      </span>
                    </td>
                  </tr>
                  <tr className="md:text-15px weight-600">
                    <td
                      data-th="Order #"
                      className="col id font-bold md:text-16px pt-3 pb-3 pl-0"
                    >
                      2000103878
                    </td>
                    <td data-th="Date" className="col date pt-3 pb-3">
                      25/10/2021
                    </td>
                    <td data-th="Ship To" className="col shipping pt-3 pb-3">
                      lx binh
                    </td>
                    <td data-th="Order Total" className="col total pt-3 pb-3">
                      <span className="price">£549.99</span>
                    </td>
                    <td data-th="Status" className="col status pt-3 pb-3">
                      <span className="status-order canceled">canceled</span>
                    </td>
                    <td
                      data-th="Actions"
                      className="col actions md:text-right pr-0 pt-3 pb-3"
                    >
                      <span className="action view border-r border-color-ccc mr-2 pr-2 cursor-pointer underline">
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
