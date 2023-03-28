import { withCheckoutCartData } from '@vjcspy/r/build/modules/checkout/hoc/cart/withCheckoutCartData';
import { withIsResolvedCart } from '@vjcspy/r/build/modules/checkout/hoc/cart/withIsResolvedCart';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useEffect } from 'react';

const CheckoutCart = combineHOC(
  withCheckoutCartData,
  withIsResolvedCart
)(
  React.memo((props) => {
    useEffect(() => {
      props?.actions?.goToCartAfter();
    }, []);

    if (
      !props?.state?.isUpdatingTotals &&
      props?.state?.cart?.items &&
      props?.state?.cart?.items?.length === 0
    ) {
      return (
        <section className="b-cart container mx-auto mb-12 min-h-70 px-4 pt-10">
          <div className="b-cart-grid grid md:gap-12">
            <div className="b-cart-form-container mb-12">
              <h5 className="text-left text-18px font-bold">
                You have no items in your basket.
              </h5>
              <h5 className="text-left text-18px  font-bold">
                Click{' '}
                <u
                  onClick={() => RouterSingleton.push('/')}
                  className="cursor-pointer"
                >
                  here
                </u>{' '}
                to continue shopping.
              </h5>
            </div>
          </div>
        </section>
      );
    }

    return (
      <>
        <section className="b-cart container mx-auto mb-12 min-h-70 px-4">
          {props?.state?.isUpdatingTotals && (
            <UiExtension uiId="LOADING_INDICATOR" global={false} />
          )}
          <h4 className="b-page-title mb-8 mt-10 text-left text-26px font-bold mdm:mb-6 mdm:mt-5">
            Basket
          </h4>

          <div className="b-cart-grid grid md:gap-12">
            {props?.state?.cart?.items &&
              props?.state?.cart?.items?.length > 0 && (
                <>
                  <div className="b-cart-form-container">
                    <UiExtension uiId="CHECKOUT_CART_ITEMS" />
                  </div>
                  <div className="b-cart-summary">
                    <UiExtension uiId="CHECKOUT_CART_SUMMARY" />
                  </div>
                </>
              )}
          </div>
        </section>
      </>
    );
  })
);

CheckoutCart.displayName = 'CheckoutCart';
export default CheckoutCart;
