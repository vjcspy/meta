import { withCartDetailActions } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCartDetailActions';
import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutCartCoupon = combineHOC(
  withCheckoutCartData,
  // withCouponActions,
  withCartDetailActions
)((props) => {
  const [showDiscount, setShowDiscount] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const onSubmitDiscount = useCallback(
    (data: any) => {
      if (
        typeof props.actions?.addCouponCode === 'function' &&
        props?.state?.cart?.id &&
        data['discount']
      ) {
        props.actions.addCouponCode(props?.state?.cart?.id, data['discount']);
      }
    },
    [props?.state?.cart?.id]
  );

  const cancelCoupon = useCallback(() => {
    if (
      typeof props.actions?.removeCouponCode === 'function' &&
      props?.state?.cart?.id
    ) {
      setValue('discount', '');
      props.actions.removeCouponCode(props?.state?.cart?.id);
    }
  }, [props?.state?.cart?.id]);

  const checkCoupon = useMemo(() => {
    if (
      props?.state?.cart?.applied_coupons &&
      Array.isArray(props?.state?.cart?.applied_coupons) &&
      props?.state?.cart?.applied_coupons.length > 0
    ) {
      return props?.state?.cart?.applied_coupons[0]?.code;
    }
    return '';
  }, [props?.state?.cart]);

  return (
    <div className="b-cart-coupon mb-2 border-b border-color-ccc pb-3">
      {/*click xoa class hidden duoi b-cart-gift__content*/}
      <div
        className="b-cart-gift__head flex cursor-pointer items-center justify-between pb-2 font-bold text-main-2362AA"
        onClick={() => {
          setShowDiscount(!showDiscount);
        }}
      >
        <span>Apply Discount Code</span>
        <span>
          <svg
            width="10"
            height="7"
            viewBox="0 0 10 7"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 6.33301L0 1.33301L1.175 0.158008L5 3.97467L8.825 0.158008L10 1.33301L5 6.33301Z"
              fill="#5F5F5F"
            />
          </svg>
        </span>
      </div>

      <div className={clsx('b-cart-gift__content ', !showDiscount && 'hidden')}>
        {checkCoupon ? (
          <div className="flex">
            <input
              type="text"
              className="h-36px w-full rounded-3 border border-color-ccc pl-2"
              disabled={true}
              value={checkCoupon}
            />
            <div className="primary">
              <button
                type="button"
                className="action -ml-1 h-36px whitespace-nowrap rounded-3 rounded-l-0 bg-main-2361aa px-2 text-white"
                value="Cancel Coupon"
                onClick={() => {
                  cancelCoupon();
                }}
                disabled={props?.state?.isUpdatingCoupon}
                style={{ background: '#9f9c9c' }}
              >
                <span>Cancel Coupon</span>
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmitDiscount)}>
            <div className="flex">
              <input
                type="text"
                className="h-36px w-full rounded-3 border border-color-ccc pl-2"
                {...register('discount', { required: true })}
              />
              <div className="primary">
                <button
                  className="action -ml-1 h-36px whitespace-nowrap rounded-3 rounded-l-0 bg-main-2361aa px-2 text-white"
                  type="submit"
                  value="Apply Discount"
                  disabled={props?.state?.isUpdatingCoupon}
                >
                  <span>Apply Discount</span>
                </button>
              </div>
            </div>
            {errors.discount && (
              <span className="mt-2 text-red-700">
                This is a required field.
              </span>
            )}
          </form>
        )}
      </div>
    </div>
  );
});

export default CheckoutCartCoupon;
