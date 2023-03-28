import { combineHOC } from '@web/ui-extension';
import React from 'react';

const CheckoutSecure = combineHOC()(() => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="b-secure-checkout">
          <h4 className="flex items-center text-24px">
            <svg
              width="20"
              height="16"
              viewBox="0 0 20 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H18C19.11 16 20 15.11 20 14V2C20 0.89 19.11 0 18 0ZM18 14H2V8H18V14ZM18 4H2V2H18V4Z"
                fill="green"
              />
            </svg>
            <span className="pl-3">Secure checkout</span>
          </h4>
          <p className="mt-3 md:pr-4">
            We safely process all credit and debit card transactions using
            industry-standard security measures.
          </p>
          <p className="mb-0">
            All payment methods are handled on secure servers.
          </p>
        </div>
        <div className="b-payment-checkout">
          <img src="/images/checkout/payments-sprite-combined.png" />
        </div>
      </div>
      <div className="b-checkout-signIn my-3 cursor-pointer text-right text-color-26ade4">
        Sign In
      </div>
    </>
  );
});

export default CheckoutSecure;
