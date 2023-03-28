import { withBedKingdomAccountGiftCart } from '@extensions/bed-kingdom/hoc/account/withBedKingdomAccountGiftCart';
import { withBedStatusPopupData } from '@extensions/bed-kingdom/hoc/content/withBedStatusPopupData';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import moment from 'moment/moment';
import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import Popup from 'reactjs-popup';

const MyAccountGiftCart = combineHOC(
  withBedKingdomAccountGiftCart,
  withBedStatusPopupData
)((props) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const popupDeleteGift = useCallback((amGiftcardCode: any) => {
    return (
      <Popup
        trigger={
          <span className="action view mr-2 cursor-pointer border-r border-color-ccc pr-2 underline">
            <span> Remove</span>
          </span>
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
            <div className="modal">
              <div className="header">Are you sure you want to remove?</div>
              <div className="content"></div>
              <div className="actions">
                <button
                  type="button"
                  className="action h-40px min-w-125 whitespace-nowrap rounded-3 bg-main-2361aa px-4 font-bold text-white"
                  onClick={() => {
                    close();
                    props?.actions?.setIsOpenPopupActions(false);
                  }}
                >
                  <span>Cancel</span>
                </button>
                <button
                  type="button"
                  className="action ml-3 h-40px min-w-125 whitespace-nowrap rounded-3 bg-main-2361aa px-4 font-bold text-white"
                  value="Cancel Coupon"
                  onClick={() => {
                    if (
                      typeof props?.actions?.removeAmGiftCardCode ===
                        'function' &&
                      amGiftcardCode
                    ) {
                      props?.actions?.removeAmGiftCardCode(amGiftcardCode);
                    }
                  }}
                  disabled={props.state?.statusRemove}
                >
                  <span>Ok</span>
                </button>
              </div>
            </div>
          )
        }
      </Popup>
    );
  }, []);

  const onSubmit = useCallback((data: any) => {
    if (data.amGiftcardCode) {
      if (typeof props.actions.applyAmGiftCardCode === 'function') {
        props.actions.applyAmGiftCardCode(data.amGiftcardCode);
      }
    }
  }, []);

  return (
    <div className="b-block-sidebar">
      <h1 className="b-account-title mb-5 mdm:font-bold">
        <span className="text-26px">Gift Cards</span>
      </h1>
      {props?.state?.amUserGiftCardList &&
        props?.state?.amUserGiftCardList.length > 0 && (
          <div className="block-content">
            <div className="table-wrapper orders-recent">
              <table className="table-order-items w-full" id="my-orders-table">
                <thead className="mdm:hidden">
                  <tr className="text-left text-color-222">
                    <th scope="col" className="id pl-0 text-color-222">
                      Code
                    </th>
                    <th scope="col" className="date text-color-222">
                      Status
                    </th>
                    <th scope="col" className="shipping text-color-222">
                      Current Balance
                    </th>
                    <th scope="col" className="total text-color-222">
                      Valid Till
                    </th>
                    <th scope="col" className="status text-color-222">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {props?.state?.amUserGiftCardList.map((item: any) => (
                    <tr className="weight-600 md:text-15px" key={item?.code}>
                      <td
                        data-th="Order #"
                        className="col id py-3 pl-0 font-bold md:text-16px"
                      >
                        {item?.code}
                      </td>
                      <td data-th="Date" className="col date py-3">
                        {item?.status}
                      </td>
                      <td data-th="Ship To" className="col shipping py-3">
                        <UiExtension
                          uiId="CURRENCY"
                          price={item?.current_balance?.value}
                        />
                      </td>
                      <td data-th="Order Total" className="col total py-3">
                        <span className="price">
                          {moment(item?.expiration_date).format('YYYY-MM-DD')}
                        </span>
                      </td>
                      <td data-th="Order Total" className="col total py-3">
                        {popupDeleteGift(item?.code)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      <div className="form-gift-card max-w-440">
        <div className="form-input mb-3">
          <label className="label mb-2 block font-bold">
            <span>Apply Gift Card Code</span>
          </label>
          <form>
            <div className="control">
              <input
                type="text"
                placeholder="Enter your Code"
                className="input-text h-40px w-full "
                {...register('amGiftcardCode', {
                  required: true,
                })}
              />
            </div>
            {errors.amGiftcardCode && (
              <span className="mt-2 text-red-700">
                This is a required field.
              </span>
            )}
          </form>
        </div>

        <button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className={clsx(
            'btn btn-default mt-8 px-8',
            props.state?.statusAdd && 'btn-loader btn-loader-active'
          )}
          disabled={props.state?.statusAdd}
        >
          <span className={clsx(props.state?.statusAdd && 'loader')} />
          <span>Add</span>
        </button>
      </div>
    </div>
  );
});

export default MyAccountGiftCart;
