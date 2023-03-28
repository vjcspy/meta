import ROUTES from '@values/extendable/ROUTES';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import React from 'react';

const AccountRegister = () => {
  return (
    <div className="block-customer-register mb-4">
      <h2 className="b-customer__title text-22px mdm:text-18px text-black font-bold mb-5">
        New Customers
      </h2>
      <p className="b-customer__subtitle mb-5 text-gray-600">
        Creating an account has many benefits: check out faster, keep more than
        one address, track orders and more.
      </p>
      <button
        type="submit"
        className="btn-primary mdm:h-40px h-44 bg-color-2362AA white text-16px rounded text-white text-center w-full font-bold mt-4"
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
