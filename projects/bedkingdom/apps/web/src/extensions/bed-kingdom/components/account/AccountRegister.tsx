import ROUTES from '@values/extendable/ROUTES';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import React from 'react';

const AccountRegister = () => {
  return (
    <div className="block-customer-register mb-4">
      <h2 className="b-customer__title mb-5 text-22px font-bold text-black mdm:text-18px">
        New Customers
      </h2>
      <p className="b-customer__subtitle mb-5 text-gray-600">
        Creating an account has many benefits: check out faster, keep more than
        one address, track orders and more.
      </p>
      <button
        type="submit"
        className="btn-primary white mt-4 h-44 w-full rounded bg-color-2362AA text-center text-16px font-bold text-white mdm:h-40px"
        onClick={() => {
          RouterSingleton.push(ROUTES.r('ACCOUNT_REGISTER'));
        }}
      >
        Create an Account
      </button>
    </div>
  );
};

export default AccountRegister;
