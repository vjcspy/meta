import { withGiftActions } from '@extensions/bed-kingdom/hoc/cart/withGiftActions';
import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';

const CheckoutCartGift = combineHOC(
  withCheckoutCartData,
  withGiftActions
)((props) => {
  const [showGift, setShowGift] = useState(false);
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
    <div className="b-cart-gift mb-2 border-b border-color-ccc pb-3">
      {/*click xoa class hidden duoi b-cart-gift__content*/}
      <div
        className="b-cart-gift__head flex cursor-pointer items-center justify-between pb-2 font-bold text-main-2362AA"
        onClick={() => {
          setShowGift(!showGift);
        }}
      >
        <span>Apply Gift Card Code</span>
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

      <div className={clsx('b-cart-gift__content ', !showGift && 'hidden')}>
        {checkGift && props?.state?.messCheckGift && (
          <span className="mt-2 text-green-700">
            {props?.state?.messCheckGift}
          </span>
        )}
        <form>
          <input
            type="text"
            className="h-36px w-full rounded-3 border border-color-ccc pl-2"
            {...register('gift', { required: true })}
          />
          {errors.gift && (
            <span className="mt-2 text-red-700">This is a required field.</span>
          )}
          <div className="actions-toolbar mt-2 flex">
            {checkGiftCart ? (
              <button
                className="action mr-2 h-36px rounded-3 bg-main-2361aa px-2 text-white"
                type="submit"
                disabled={props?.state?.isUpdatingCoupon}
                onClick={handleSubmit(onSubmitGift)}
              >
                Remove Gift Card
              </button>
            ) : (
              <button
                className="action mr-2 h-36px rounded-3 bg-main-2361aa px-2 text-white"
                type="submit"
                disabled={props?.state?.isUpdatingCoupon}
                onClick={handleSubmit(onSubmitGift)}
              >
                Add Gift Card
              </button>
            )}

            <button
              className="action h-36px rounded-3 bg-main-2361aa px-2 text-white"
              type="submit"
              onClick={handleSubmit(onSubmitCheckGift)}
            >
              Check Gift Card Status
            </button>
          </div>
        </form>
      </div>
    </div>
  );
});

export default CheckoutCartGift;
