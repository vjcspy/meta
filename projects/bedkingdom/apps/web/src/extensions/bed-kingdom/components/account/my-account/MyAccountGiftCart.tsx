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
          <span className="action view border-r border-color-ccc mr-2 pr-2 cursor-pointer underline">
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
                  className="action h-40px bg-main-2361aa rounded-3 text-white pl-4 pr-4 whitespace-nowrap min-w-125 font-bold"
                  onClick={() => {
                    close();
                    props?.actions?.setIsOpenPopupActions(false);
                  }}
                >
                  <span>Cancel</span>
                </button>
                <button
                  type="button"
                  className="ml-3 action h-40px bg-main-2361aa rounded-3 text-white pl-4 pr-4 whitespace-nowrap min-w-125 font-bold"
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
                    <th scope="col" className="id text-color-222 pl-0">
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
                    <tr className="md:text-15px weight-600" key={item?.code}>
                      <td
                        data-th="Order #"
                        className="col id font-bold md:text-16px pt-3 pb-3 pl-0"
                      >
                        {item?.code}
                      </td>
                      <td data-th="Date" className="col date pt-3 pb-3">
                        {item?.status}
                      </td>
                      <td data-th="Ship To" className="col shipping pt-3 pb-3">
                        <UiExtension
                          uiId="CURRENCY"
                          price={item?.current_balance?.value}
                        />
                      </td>
                      <td data-th="Order Total" className="col total pt-3 pb-3">
                        <span className="price">
                          {moment(item?.expiration_date).format('YYYY-MM-DD')}
                        </span>
                      </td>
                      <td data-th="Order Total" className="col total pt-3 pb-3">
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
          <label className="label font-bold mb-2 block">
            <span>Apply Gift Card Code</span>
          </label>
          <form>
            <div className="control">
              <input
                type="text"
                placeholder="Enter your Code"
                className="input-text w-full h-40px "
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
            'btn btn-default mt-8 pl-8 pr-8',
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
