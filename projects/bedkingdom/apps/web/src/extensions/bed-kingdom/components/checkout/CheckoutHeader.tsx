import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const CheckoutHeader = combineHOC()((props) => {
  return (
    <div className="b-checkout-heading">
      <div
        className="b-checkout-logo text-center mt-3 mb-3"
        onClick={() => RouterSingleton.push('/home')}
      >
        <img
          className="m-auto"
          src="https://www.bedkingdom.co.uk/media/logo/stores/2/logo.png"
          alt=""
          width="193"
          height="75"
        />
      </div>
    </div>
  );
});

export default CheckoutHeader;
