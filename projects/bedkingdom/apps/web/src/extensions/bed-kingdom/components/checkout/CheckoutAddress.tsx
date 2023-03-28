import { combineHOC } from '@web/ui-extension';
import React from 'react';

const CheckoutAddress = combineHOC()(() => {
  return (
    <div className="b-checkout-wrap border border-color-e6e6e6 p-4">
      <span className="b-step-title mb-3 flex items-center text-26px">
        <span>1</span>Shipping Address
      </span>
      <div className="b-control _with-tooltip relative">
        <input
          className="b-input-text h-42px w-full border border-color-ccc pl-2"
          type="email"
          name="username"
          placeholder="Email Address"
        />
        {/*hover add class active*/}
        <div className="field-tooltip">
          <span className="label">
            <span className="absolute right-3 h-20 w-20 cursor-pointer text-color-666">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="question-circle"
                className="svg-inline--fa fa-question-circle fa-w-16"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 448c-110.532 0-200-89.431-200-200 0-110.495 89.472-200 200-200 110.491 0 200 89.471 200 200 0 110.53-89.431 200-200 200zm107.244-255.2c0 67.052-72.421 68.084-72.421 92.863V300c0 6.627-5.373 12-12 12h-45.647c-6.627 0-12-5.373-12-12v-8.659c0-35.745 27.1-50.034 47.579-61.516 17.561-9.845 28.324-16.541 28.324-29.579 0-17.246-21.999-28.693-39.784-28.693-23.189 0-33.894 10.977-48.942 29.969-4.057 5.12-11.46 6.071-16.666 2.124l-27.824-21.098c-5.107-3.872-6.251-11.066-2.644-16.363C184.846 131.491 214.94 112 261.794 112c49.071 0 101.45 38.304 101.45 88.8zM298 368c0 23.159-18.841 42-42 42s-42-18.841-42-42 18.841-42 42-42 42 18.841 42 42z"
                />
              </svg>
            </span>
          </span>
          <span className="field-tooltip-action action-help _active" />
          <div className="field-tooltip-content">
            Well send your order confirmation here.
          </div>
        </div>
        <span className="mt-2 mb-3 block text-color-666">
          You can create an account after checkout.
        </span>
      </div>
      <div className="b-choice b-checkbox-form field mb-3 md:mb-10">
        <input
          type="checkbox"
          className="checkbox"
          id="DYPN7J6"
          placeholder="Subscribe to receive offers and updates"
        />
        <span className="checkmark" />
        <label className="label" htmlFor="DYPN7J6">
          <span>Subscribe to receive offers and updates</span>
        </label>
      </div>
      <div className="b-shipping-new-address-form mb-4">
        <div className="b-form mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <input
            className="input-text"
            type="text"
            placeholder="First Name *"
          />
          <input className="input-text" type="text" placeholder="Last Name *" />
        </div>
        <div className="b-form mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
          <input className="input-text" type="text" placeholder="stal Code *" />
          <input
            className="input-text"
            type="text"
            placeholder="Mobile Number"
          />
        </div>
        <button
          type="button"
          className="btn-default h-42px w-full bg-color-6bc85e text-14px hover:opacity-80"
        >
          <span>Click To Find Address</span>
        </button>
        <div className="b-street">
          <div className="b-checkout__label my-4 text-center text-14px">
            Street Address
          </div>
          <div className="b-form mb-4">
            <input
              className="input-text w-full"
              type="text"
              placeholder="Street Address: Line 1 *"
            />
          </div>
          <div className="b-form mb-4">
            <input
              className="input-text w-full"
              type="text"
              placeholder="Street Address: Line 2 *"
            />
          </div>
          <div className="b-form mb-4">
            <input
              className="input-text w-full"
              type="text"
              placeholder="Street Address: Line 3 *"
            />
          </div>
          <div className="b-form mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <input className="input-text" type="text" placeholder="County" />
            <input
              className="input-text"
              type="text"
              placeholder="Town / City *"
            />
          </div>
          <div className="b-form mb-4 grid grid-cols-1 gap-3 md:grid-cols-2">
            <input
              className="input-text"
              type="text"
              placeholder="Phone Number *"
            />
          </div>
        </div>
      </div>
      <div className="b-step-title mb-3 mt-5 flex items-center text-26px">
        <span>2</span>Billing Address
      </div>
      <div className="b-choice b-checkbox-form field mb-4 mt-3">
        <input
          type="checkbox"
          className="checkbox"
          id="a222"
          placeholder="Subscribe to receive offers and updates"
        />
        <span className="checkmark" />
        <label className="label" htmlFor="a222">
          <span>My billing and shipping address are the same</span>
        </label>
      </div>
    </div>
  );
});

export default CheckoutAddress;
