import 'reactjs-popup/dist/index.css';

import { withBedCustomerAddressActions } from '@extensions/bed-kingdom/hoc/account/withBedCustomerAddressActions';
import { withBedStatusPopupData } from '@extensions/bed-kingdom/hoc/content/withBedStatusPopupData';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useMemo } from 'react';
import Popup from 'reactjs-popup';

const MyAccountAddressBook = combineHOC(
  withCustomer,
  withBedCustomerAddressActions,
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

  const popupNewAddress = useMemo(() => {
    return (
      <Popup
        trigger={
          <div className="b-shipping-new-address-form mb-2 clear-both mt-4">
            <button type="button" className="btn-default text-14px pl-3 pr-3">
              <span>New Address</span>
            </button>
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
            <UiExtension uiId="FORM_DETAIL_ADDRESS" close={close} />
          )
        }
      </Popup>
    );
  }, []);

  const popupEditAddress = useCallback((address: any) => {
    return (
      <Popup
        trigger={
          <div className="action edit text-color-222 pr-2 underline">
            <span>Edit</span>
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
            <UiExtension
              uiId="FORM_DETAIL_ADDRESS"
              close={close}
              address={address}
            />
          )
        }
      </Popup>
    );
  }, []);

  const popupEditAddress0 = useCallback((address: any) => {
    return (
      <Popup
        trigger={
          <div className="box-actions mt-4">
            <div className="action edit text-main-1979c3">
              <span>Edit Address</span>
            </div>
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
            <UiExtension
              uiId="FORM_DETAIL_ADDRESS"
              close={close}
              address={address}
            />
          )
        }
      </Popup>
    );
  }, []);

  const popupDeleteAddress = useCallback((address: any) => {
    return (
      <Popup
        trigger={
          <div className="action delete ext-color-222 underline">
            <span>Delete</span>
          </div>
        }
        modal
        nested
        className="delete"
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
            <div className="modal">
              <div className="header text-15px">
                Do you want to delete this address?
              </div>
              <div className="actions">
                <button
                  type="button"
                  className="action h-40px bg-main-2361aa rounded-3 text-white pl-4 pr-4 whitespace-nowrap mr-3 min-w-125 font-bold"
                  onClick={() => {
                    close();
                  }}
                >
                  <span>No</span>
                </button>
                <button
                  type="button"
                  className="action h-40px bg-main-2361aa rounded-3 text-white pl-4 pr-4 whitespace-nowrap min-w-125 font-bold"
                  value="Cancel Coupon"
                  onClick={() => {
                    if (
                      typeof props?.actions?.deleteCustomerAddress ===
                        'function' &&
                      address?.id
                    ) {
                      props?.actions?.deleteCustomerAddress(address?.id);
                    }
                    close();
                  }}
                >
                  <span>Yes</span>
                </button>
              </div>
            </div>
          )
        }
      </Popup>
    );
  }, []);

  return (
    <div className="b-block-sidebar">
      <h1 className="b-account-title mb-5 mdm:font-bold">
        <span className="text-26px">Address Book</span>
      </h1>
      <div className="block-dashboard-addresses mb-6 md:mb-12">
        <div className="block-title border-b border-color-ccc text-18px pb-2 mb-4">
          <strong>Default Addresses</strong>
        </div>
        <div className="block-content grid grid-cols-1 md:grid-cols-2 gap-4">
          {defaultBilling && (
            <div className="box box-billing-address">
              <strong className="box-title text-16px mb-2 block">
                <span>Default Billing Address</span>
              </strong>
              <div className="box-content">
                <div>
                  {defaultBilling?.firstname} {defaultBilling?.lastname} <br />
                  {defaultBilling?.street?.toString()}
                  <br />
                  {defaultBilling?.city} {defaultBilling?.region?.region}
                  <br />
                  {defaultBilling?.country_code && 'United Kingdom'}
                  <br />
                  T: {defaultBilling?.telephone}
                </div>
              </div>
              <div className="box-actions mt-4">
                {popupEditAddress0(defaultBilling)}
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
                  {defaultShipping?.city} {defaultShipping?.region?.region}
                  <br />
                  {defaultShipping?.country_code && 'United Kingdom'}
                  <br />
                  T: {defaultShipping?.telephone}
                </div>
              </div>
              {popupEditAddress0(defaultShipping)}
            </div>
          )}
        </div>
      </div>
      {props?.state?.customer?.addresses &&
        props?.state?.customer?.addresses.length > 0 && (
          <div className="b-addresses-list">
            <div className="block-title border-b border-color-ccc text-18px pb-2 mb-4">
              <strong>Additional Address Entries</strong>
            </div>
            <div className="b-block-content">
              <div className="table-wrapper additional-addresses">
                <table className="table-order-items table-additional-addresses-items border-0">
                  <thead>
                    <tr className="text-left text-color-222 whitespace-nowrap">
                      <th scope="col" className="col firstname pl-0">
                        First Name
                      </th>
                      <th scope="col" className="col lastname">
                        Last Name
                      </th>
                      <th scope="col" className="col streetaddress">
                        Street Address
                      </th>
                      <th scope="col" className="col city">
                        City
                      </th>
                      <th scope="col" className="col country">
                        Country
                      </th>
                      <th scope="col" className="col state">
                        State
                      </th>
                      <th scope="col" className="col zip">
                        Zip/Postal Code
                      </th>
                      <th scope="col" className="col phone">
                        Phone
                      </th>
                      <th scope="col" className="col actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {props?.state?.customer?.addresses.map((item: any) => (
                      <tr key={item?.id}>
                        <td data-th="First Name" className="col firstname">
                          <span>{item?.firstname}</span>
                        </td>
                        <td data-th="Last Name" className="col lastname">
                          {item?.lastname}
                        </td>
                        <td
                          data-th="Street Address"
                          className="col streetaddress"
                        >
                          {item?.street?.toString()}
                        </td>
                        <td data-th="City" className="col city">
                          {item?.city}
                        </td>
                        <td data-th="Country" className="col country">
                          {item?.country_code && 'United Kingdom'}
                        </td>
                        <td data-th="State" className="col state">
                          {item?.region?.region}
                        </td>
                        <td data-th="Zip/Postal Code" className="col zip">
                          {item?.postcode}
                        </td>
                        <td data-th="Phone" className="col phone">
                          {item?.telephone}
                        </td>
                        <td
                          data-th="Actions"
                          className="col actions pr-0 cursor-pointer"
                        >
                          <div className="flex">
                            {popupEditAddress(item)}
                            {(!item?.default_shipping ||
                              !item?.default_billing) &&
                              popupDeleteAddress(item)}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      {popupNewAddress}
    </div>
  );
});

export default MyAccountAddressBook;
