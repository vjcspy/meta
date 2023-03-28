import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { withIsResolvedCart } from '@vjcspy/r/build/modules/checkout/hoc/cart/withIsResolvedCart';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import size from 'lodash/size';
import React, { useState } from 'react';

const CheckoutSummary = combineHOC(
  withCheckoutCartData,
  withIsResolvedCart
)((props) => {
  const [showItems, setShowItems] = useState(false);

  return (
    <div className="b-checkout-summary b-checkout-wrap border border-color-e6e6e6 p-4">
      <div className="b-step-title flex items-center text-26px">
        <span>5</span>Order Summary
      </div>
      <div className="b-checkout-miniCart-items">
        {/*click vao title add class active ben duoi*/}
        <div
          className="b-code-title active mb-2 mt-3 flex items-center font-bold"
          onClick={() => setShowItems(!showItems)}
        >
          <span className="pr-2 uppercase">
            {props?.state?.cart?.total_quantity || 0} Items in Basket
          </span>
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
        <div
          className={clsx('b-checkout-miniCart-wrap', showItems && 'hidden')}
        >
          {props?.state?.cart?.items &&
            props?.state?.cart?.items?.length > 0 &&
            props?.state?.cart?.items.map((item: any) => (
              <UiExtension
                uiId="BEDKINGDOM_CHECKOUT_PRODUCT_ITEM"
                item={item}
                key={item?.id}
              />
            ))}
        </div>
        <div className="b-summary-total mt-3">
          <div className="mb-3 flex items-center justify-between">
            <span>Basket Subtotal</span>
            <span>
              <UiExtension
                uiId="CURRENCY"
                price={
                  props?.state?.cart?.prices?.subtotal_including_tax?.value || 0
                }
              />
            </span>
          </div>
          {props?.state?.couponCode &&
            props?.state?.cart?.prices?.discounts &&
            size(props?.state?.cart?.prices?.discounts) > 0 && (
              <div className="mb-3 flex items-center justify-between">
                <span>Discount ({props?.state?.couponCode})</span>
                <span>
                  -
                  <UiExtension
                    uiId="CURRENCY"
                    price={
                      props?.state?.cart?.prices?.discounts[0]?.amount?.value ||
                      0
                    }
                  />
                </span>
              </div>
            )}
          <div className="mb-3 flex items-end justify-between">
            <div>
              <strong>Shipping</strong>
              <p>Free To Most Areas - Delivery Charge</p>
            </div>
            <span>£0.00</span>
          </div>
          {props?.state?.cart?.prices?.applied_taxes &&
            size(props?.state?.cart?.prices?.applied_taxes) > 0 && (
              <div className="mb-5 flex items-center justify-between">
                <span>VAT</span>
                <span>
                  <UiExtension
                    uiId="CURRENCY"
                    price={
                      props?.state?.cart?.prices?.applied_taxes[0]?.amount
                        ?.value || 0
                    }
                  />
                </span>
              </div>
            )}

          {
            // @ts-ignore
            props?.state?.cart?.applied_am_gift_cards &&
              // @ts-ignore
              size(props?.state?.cart?.applied_am_gift_cards) > 0 && (
                <div className="mb-3 flex items-center justify-between">
                  <span>
                    Gift Card{' '}
                    {
                      // @ts-ignore
                      props?.state?.cart?.applied_am_gift_cards[0]?.code
                    }
                  </span>
                  <span>
                    -
                    <UiExtension
                      uiId="CURRENCY"
                      price={
                        // @ts-ignore
                        props?.state?.cart?.applied_am_gift_cards[0]
                          ?.applied_balance?.value || 0
                      }
                    />
                  </span>
                </div>
              )
          }
          <div className="mb-5 flex items-center justify-between">
            <strong className="text-18px">Order Total</strong>
            <strong className="text-16px">
              <UiExtension
                uiId="CURRENCY"
                price={props?.state?.cart?.prices?.grand_total?.value || 0}
              />
            </strong>
          </div>
          <button
            type="button"
            className="btn-default h-42px w-full bg-color-6bc85e text-14px hover:opacity-80"
          >
            <span>Place Order</span>
          </button>
        </div>
      </div>
    </div>
  );
});

export default CheckoutSummary;
