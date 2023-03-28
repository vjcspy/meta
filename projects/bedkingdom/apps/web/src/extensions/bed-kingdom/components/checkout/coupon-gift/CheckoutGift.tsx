import { withGiftActions } from '@extensions/bed-kingdom/hoc/cart/withGiftActions';
import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutGift = combineHOC(
  withCheckoutCartData,
  withGiftActions
)((props) => {
  const [showGift, setShowGift] = useState(true);
  const [checkGift, setCheckGift] = useState(false);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm();

  const checkGiftCart = useMemo(() => {
    if (
      // @ts-ignore
      props?.state?.cart?.applied_am_gift_cards &&
      // @ts-ignore
      Array.isArray(props?.state?.cart?.applied_am_gift_cards) &&
      // @ts-ignore
      props?.state?.cart?.applied_am_gift_cards.length > 0
    ) {
      // @ts-ignore
      return props?.state?.cart?.applied_am_gift_cards[0]?.code;
    }
    return false;
  }, [props?.state?.cart]);

  const onSubmitGift = useCallback(
    (data: any) => {
      if (
        typeof props.actions?.applyGiftToCart === 'function' &&
        props?.state?.cart?.id &&
        data['gift']
      ) {
        if (checkGiftCart) {
          props.actions.removeGiftFromCart(
            props?.state?.cart?.id,
            data['gift']
          );
        } else {
          props.actions.applyGiftToCart(props?.state?.cart?.id, data['gift']);
          setValue('gift', '');
        }
      }
    },
    [props?.state?.cart?.id, checkGiftCart]
  );

  const onSubmitCheckGift = useCallback(
    (data: any) => {
      setCheckGift(true);
      if (
        typeof props.actions?.checkGiftToCart === 'function' &&
        data['gift']
      ) {
        props.actions.checkGiftToCart(data['gift']);
      }
    },
    [props?.state?.cart?.id]
  );

  useEffect(() => {
    if (checkGiftCart) {
      setValue('gift', checkGiftCart);
    }
  }, [checkGiftCart]);

  return (
    <div className="b-gift-code">
      {/*click vao title add class active ben duoi*/}
      <div
        className="b-code-title flex items-center mb-2 font-bold"
        onClick={() => {
          setShowGift(!showGift);
        }}
      >
        <span className="pr-2 uppercase">Apply Gift Card Code</span>
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
      <div className={clsx(!showGift && 'hidden')}>
        {checkGift && props?.state?.messCheckGift && (
          <span className="mt-2 text-green-700">
            {props?.state?.messCheckGift}
          </span>
        )}
        <form>
          <input
            className="input-text w-full"
            type="text"
            placeholder="Enter discount code"
            {...register('gift', { required: true })}
          />
          {errors.gift && (
            <span className="mt-2 text-red-700">This is a required field.</span>
          )}
          <div className="flex mt-5">
            {checkGiftCart ? (
              <button
                type="submit"
                disabled={props?.state?.isUpdatingCoupon}
                onClick={handleSubmit(onSubmitGift)}
                className="btn-default bg-color-6bc85e h-40px rounded-3 hover:opacity-80 text-14px pl-3 pr-3 whitespace-nowrap mr-1"
              >
                Remove Gift Card
              </button>
            ) : (
              <button
                type="submit"
                disabled={props?.state?.isUpdatingCoupon}
                onClick={handleSubmit(onSubmitGift)}
                className="btn-default bg-color-6bc85e h-40px rounded-3 hover:opacity-80 text-14px pl-3 pr-3 whitespace-nowrap mr-1"
              >
                Add Gift Card
              </button>
            )}

            <button
              type="submit"
              onClick={handleSubmit(onSubmitCheckGift)}
              className="btn-default bg-color-6bc85e h-40px rounded-3 hover:opacity-80 ml-1 text-14px pl-3 pr-3 whitespace-nowrap"
            >
              Check Gift Card Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default CheckoutGift;
