import { withCartDetailActions } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCartDetailActions';
import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutCoupon = combineHOC(
  withCheckoutCartData,
  withCartDetailActions
)((props) => {
  const [showDiscount, setShowDiscount] = useState(true);
  const {
    handleSubmit,
    register,
    formState: { errors },
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
    return false;
  }, [props?.state?.cart]);

  return (
    <div className="b-discount-code">
      {/*click vao title add class active ben duoi*/}
      <div
        className="b-code-title mb-2 flex items-center font-bold"
        onClick={() => {
          setShowDiscount(!showDiscount);
        }}
      >
        <span className="pr-2 uppercase">Apply Discount Code</span>
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
      </div>
      {/*add title ben tren remove class hidden ben duoi*/}
      <div className={clsx('flex ', !showDiscount && 'hidden')}>
        {checkCoupon ? (
          <>
            <input
              className="input-text w-full"
              type="text"
              placeholder="Enter discount code"
              disabled={true}
              value={checkCoupon}
            />
            <button
              type="button"
              className="btn-default ml-1 h-40px whitespace-nowrap rounded-3 bg-color-6bc85e px-3 text-14px hover:opacity-80"
              onClick={() => {
                cancelCoupon();
              }}
              disabled={props?.state?.isUpdatingCoupon}
            >
              Cancel Coupon
            </button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmitDiscount)}>
            <input
              className="input-text w-full"
              type="text"
              placeholder="Enter discount code"
              {...register('discount', { required: true })}
            />
            <button
              type="submit"
              className="btn-default ml-1 h-40px whitespace-nowrap rounded-3 bg-color-6bc85e px-3 text-14px hover:opacity-80"
              disabled={props?.state?.isUpdatingCoupon}
            >
              Apply Discount
            </button>
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

export default CheckoutCoupon;
