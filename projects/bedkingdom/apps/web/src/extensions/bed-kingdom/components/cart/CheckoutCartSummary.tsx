import { withMgtCheckoutActions } from '@extensions/bed-kingdom/hoc/checkout/withMgtCheckoutActions';
import BED_KINGDOM_COMMON from '@extensions/bed-kingdom/values/BED_KINGDOM_COMMON';
import ROUTES from '@values/extendable/ROUTES';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useMemo, useState } from 'react';

const CheckoutCartSummary = combineHOC(
  withCheckoutCartData,
  withCustomer,
  withMgtCheckoutActions
)((props) => {
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

  const checkStatusCart = useMemo(() => {
    let check = null;
    if (props?.state?.cart?.items && props?.state?.cart?.items?.length > 0) {
      check = props?.state?.cart?.items.find(
        (it: any) => it?.product?.stock_status === 'OUT_OF_STOCK'
      );
    }

    if (check?.id) {
      return true;
    }
    return false;
  }, [props?.state?.cart]);

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

  return (
    <div className="rounded-20 shadow-300 p-5 mb-3">
      <h3 className="b-summary-title text-22px text-left block font-bold border-b w-full border-color-ccc mb-3 pb-2">
        Summary
      </h3>
      <UiExtension uiId="CHECKOUT_CART_GIFT" />
      <UiExtension uiId="CHECKOUT_CART_COUPON" />
      <div className="b-totals-sub flex justify-between items-center pt-2 pb-2">
        <span className="sub-title font-bold">Subtotal</span>
        <span className="amount">
          <UiExtension
            uiId="CURRENCY"
            price={
              props?.state?.cart?.prices?.subtotal_including_tax?.value || 0
            }
          />
        </span>
      </div>
      {checkCoupon && props?.state?.cart?.prices?.discounts && (
        <div className="b-totals-sub flex justify-between items-center pt-2 pb-2">
          <span className="sub-title font-bold">Discount({checkCoupon})</span>
          <span className="amount">
            -
            <UiExtension
              uiId="CURRENCY"
              price={
                props?.state?.cart?.prices?.discounts[0]?.amount?.value || 0
              }
            />
          </span>
        </div>
      )}
      {checkGiftCart && (
        <div className="b-totals-sub flex justify-between items-center pt-2 pb-2">
          <span className="sub-title font-bold">
            Gift Card ({checkGiftCart})
          </span>
          <span className="amount">
            <UiExtension
              uiId="CURRENCY"
              price={
                // @ts-ignore
                props?.state?.cart?.applied_am_gift_cards[0]?.applied_balance
                  ?.value || 0
              }
            />
          </span>
        </div>
      )}
      <div className="b-tax-sub flex justify-between items-center pt-2 pb-2">
        <span className="sub-title font-bold">VAT</span>
        {props?.state?.cart?.prices?.applied_taxes &&
          Array.isArray(props?.state?.cart?.prices?.applied_taxes) &&
          props?.state?.cart?.prices?.applied_taxes.length > 0 && (
            <span className="amount">
              <UiExtension
                uiId="CURRENCY"
                price={
                  props?.state?.cart?.prices?.applied_taxes[0]?.amount?.value ||
                  0
                }
              />
            </span>
          )}
      </div>
      <div className="b-grand-totals text-18px text-left block font-bold border-t w-full border-color-ccc pt-3 mt-3 mb-8 flex justify-between items-center">
        <span className="sub-title font-bold">Order Total</span>
        <span className="price font-bold">
          <UiExtension
            uiId="CURRENCY"
            price={props?.state?.cart?.prices?.grand_total?.value || 0}
          />
        </span>
      </div>
      {!checkStatusCart && (
        <div
          className="btn-default h-50px"
          onClick={() => {
            props?.actions?.goMgtCheckout();
          }}
        >
          <span>Proceed to Checkout</span>
        </div>
      )}
    </div>
  );
});

export default CheckoutCartSummary;
