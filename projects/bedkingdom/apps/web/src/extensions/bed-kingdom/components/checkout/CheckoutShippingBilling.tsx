import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const CheckoutShippingBilling = combineHOC()(() => {
  return (
    <div className="b-checkout-wrap  border border-color-e6e6e6 p-4">
      <div className="b-checkout-shipping-method">
        <div className="b-step-title flex items-center text-26px">
          <span>3</span>Shipping Methods
        </div>
        <div className="b-checkout-shipping-method-content mt-4 flex items-center border-b-2 border-color-e6e6e6">
          <div className="b-radio-form">
            <input type="radio" />
            <span className="checkmark" />
          </div>
          <div className="price mx-3 font-bold text-black">£0.00</div>
          <div className="delivery mx-3">Delivery Charge</div>
          <div className="free ml-3">Free To Most Areas</div>
        </div>
      </div>
      <div className="b-checkout-payment-method">
        <div className="b-step-title flex items-center pt-4 text-26px">
          <span>4</span>Payment Method
        </div>
        <div className="b-checkout-shipping-method-content mt-4">
          <div className="b-payment-oPay mb-6">
            <div className="b-payment-heading flex items-center">
              <div className="b-radio-form">
                <input type="radio" checked />
                <span className="checkmark" />
              </div>
              <div className="logo mx-4">
                <img src="../assets/images/icons-img/opayo_logo.jpg" />
              </div>
              <div>Pay With Credit / Debit Card</div>
            </div>
            {/*khi chon option ben tren remove class hidden ben duoi*/}
            <div className="b-payment-content hidden pt-4 md:pl-4">
              <div className="flex items-center border-b border-color-e6e6e6 py-2">
                <label className="pr-2">Name:</label>
                <input
                  className="h-30px w-full pl-3 md:w-3/4"
                  type="text"
                  placeholder="Cardholder Name"
                />
              </div>
              <div className="flex items-center border-b border-color-e6e6e6 py-2">
                <label className="pr-2">Card:</label>
                <input
                  className="h-30px w-full pl-3 md:w-3/4"
                  type="number"
                  placeholder="0000 0000 0000 0000"
                />
              </div>
              <div className="flex items-center border-b border-color-e6e6e6 py-2">
                <label className="pr-2">Expiry:</label>
                <input
                  className="h-30px w-full pl-3 md:w-3/4"
                  type="number"
                  placeholder="MMYY"
                />
              </div>
              <div className="flex items-center py-2">
                <label className="pr-2">CVC:</label>
                <input
                  className="h-30px max-w-55px pl-3"
                  type="number"
                  placeholder="123"
                />
              </div>
            </div>
          </div>
          <div className="b-payment-kLarna mb-6">
            <div className="b-payment-heading flex items-center">
              <div className="b-radio-form">
                <input type="radio" checked />
                <span className="checkmark" />
              </div>
              <div className="logo mx-4">
                <img
                  src="https://x.klarnacdn.net/payment-method/assets/badges/generic/klarna.svg"
                  width={55}
                  height={30}
                />
              </div>
              <div>Pay in instalments</div>
            </div>
            {/*khi chon option ben tren remove class hidden ben duoi*/}
            <div className="b-payment-content hidden pt-4 md:pl-4">
              <div className="mb-3 text-16px font-bold">Pay over time</div>
              {/*add class active neu select 1 option*/}
              <div className="b-payment-item active flex min-h-55 cursor-pointer flex-wrap items-center border border-color-666 py-2 px-3">
                <div className="text-15px font-bold text-black">
                  Pay later in 3 interest-free instalments of £280.81
                </div>
                <p className="text-color-666">Autopay with your card</p>
              </div>
              <div className="b-payment-item flex min-h-55 cursor-pointer flex-wrap items-center border border-color-666 py-2 px-3">
                <div className="text-15px font-bold text-black">
                  £140.41 pm for 6 months
                </div>
              </div>
              <div className="b-payment-item flex min-h-55 cursor-pointer flex-wrap items-center border border-color-666 py-2 px-3">
                <div className="text-15px font-bold text-black">
                  £240.41 pm for 9 months
                </div>
              </div>
              <div className="b-payment-item flex min-h-55 cursor-pointer flex-wrap items-center border border-color-666 py-2 px-3">
                <div className="text-15px font-bold text-black">
                  £240.41 pm for 12 months
                </div>
              </div>
              <div className="b-payment-item flex min-h-55 cursor-pointer flex-wrap items-center border border-color-666 py-2 px-3">
                <div className="text-15px font-bold text-black">
                  £240.41 pm for 24 months
                </div>
              </div>
              <div className="b-payment-item flex min-h-55 cursor-pointer flex-wrap items-center border border-color-666 py-2 px-3">
                <div className="text-15px font-bold text-black">
                  £28.41 pm for 36 months
                </div>
              </div>

              <div className="my-4 bg-color-F0EEEB p-3 text-16px text-color-666">
                <ul className="list-group-item">
                  <li>£140.41 pm for 6 months</li>
                  <li>Estimated total if you follow this plan: £842.44</li>
                  <li>First payment no earlier than: Jan 31st</li>
                  <li>Promotional interest rate: 0%</li>
                </ul>
              </div>
              <p className="mb-4 mt-0">
                Subject to financial circumstances. You must be at least 18.
                Credit provided by Klarna Bank AB UK Branch, 125 Kingsway,
                Holborn, London, WC2B 6NH, United Kingdom. If you already have a
                Klarna Credit account, this purchase will be added to your
                balance. Not paying according to terms may cause your interest
                rate to increase as described in the representative example
                below.
              </p>
              <p className="mb-4 mt-0 font-bold">
                Representative example: Representative APR (variable) 18.9% APR
                with an assumed credit limit of £1,200 and a purchase rate of
                18.9% p.a.
              </p>
              <p>
                By continuing, I accept the{' '}
                <a
                  className="underline"
                  href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_gb/user"
                  target="_blank"
                  rel="noreferrer"
                >
                  Klarna Shopping Service
                </a>{' '}
                terms and confirm that I have read the{' '}
                <a
                  className="underline"
                  href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_gb/privacy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Notice
                </a>{' '}
                and the{' '}
                <a
                  className="underline"
                  href="https://cdn.klarna.com/1.0/shared/content/legal/terms/0/en_gb/cookie_purchase"
                  target="_blank"
                  rel="noreferrer"
                >
                  Cookie Notice.
                </a>{' '}
                I am also aware that Klarna performs credit searches using
                credit reference agencies, which may affect my credit rating.
              </p>
            </div>
          </div>
          <div className="b-payment-finance mb-6">
            <div className="b-payment-heading flex items-center">
              <div className="b-radio-form mr-4">
                <input type="radio" checked />
                <span className="checkmark" />
              </div>
              <div>Pay With Finance - From 0% APR</div>
            </div>
            {/*khi chon option ben tren remove class hidden ben duoi*/}
            <div className="b-payment-content pt-3 md:pl-4">
              <div className="py-2">
                <label className="b-checkout__label mb-2 block">
                  Please choose your deposit percentage:
                </label>
                <select className="h-40px w-full border border-color-ccc pl-2">
                  <option value="">Select</option>
                  <option value="10">10%</option>
                  <option value="20">20%</option>
                  <option value="30">30%</option>
                </select>
              </div>
              <div className="py-2">
                <label className="b-checkout__label mb-2 block">
                  Please choose your package plan:
                </label>
                <select className="h-40px w-full border border-color-ccc pl-2">
                  <option value="">Select</option>
                  <option value="27/244b3e7a-0ffb-41f2-88d5-adf78b6a3d9e/6/0.166667/0/Interest Free Finance (6 Months)">
                    Interest Free Finance (6 Months)
                  </option>
                  <option value="43/20125e19-f2c2-42f4-a230-ec668f776296/9/0.111111/0/Interest Free Finance (9 Months)">
                    Interest Free Finance (9 Months)
                  </option>
                  <option value="112/bed9d208-d9c1-4d8e-a29f-decb53fd0b22/12/0.090186/15.9/Classic Credit 12 Months 15.9%">
                    Classic Credit 12 Months 15.9%
                  </option>
                  <option value="64/1401bd54-9a22-4ce7-8f7c-61a3ebb93639/24/0.04841/15.9/Classic Credit 24 Months 15.9%">
                    Classic Credit 24 Months 15.9%
                  </option>
                  <option value="65/bbe76da6-c60e-4881-83fc-328e415f0a5a/36/0.03459/15.9/Classic Credit 36 Months 15.9%">
                    Classic Credit 36 Months 15.9%
                  </option>
                </select>
              </div>
              <p className="mt-3">
                Please select your deposit percentage and package plan and click
                the place order button.
              </p>
            </div>
          </div>
          <div className="b-payment-paypal mb-6">
            <div className="b-payment-heading flex items-center">
              <div className="b-radio-form">
                <input type="radio" checked />
                <span className="checkmark" />
              </div>
              <div className="logo mx-4">
                <img
                  src="https://www.paypalobjects.com/webstatic/en_US/i/buttons/pp-acceptance-medium.png"
                  width={68}
                  height={44}
                />
              </div>
              <div className="mr-4">Pay With PayPal </div>
              <a
                className="text-color-2362AA"
                href="https://www.paypal.com/gb/cgi-bin/webscr?cmd=xpt/Marketing/popup/OLCWhatIsPayPal-outside"
                target="_blank"
                rel="noreferrer"
              >
                What is PayPal?
              </a>
            </div>
            {/*khi chon option ben tren remove class hidden ben duoi*/}
            <div className="b-payment-content pt-4 md:pl-4">
              <p className="mt-0 mb-3">
                You will be redirected to the PayPal website after you click the
                place order button.
              </p>
            </div>
          </div>
        </div>
      </div>
      <UiExtension uiId="BEDKINGDOM_CHECKOUT_COUPON" />
      <UiExtension uiId="BEDKINGDOM_CHECKOUT_GIFT" />
    </div>
  );
});

export default CheckoutShippingBilling;
