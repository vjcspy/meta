import { withBedKingdomAccountActions } from '@extensions/bed-kingdom/hoc/account/withBedKingdomAccountActions';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const MyAccountAnonymise = combineHOC(withBedKingdomAccountActions)((props) => {
  return (
    <div className="b-block-sidebar">
      <h1 className="b-account-title mb-5 mdm:font-bold">
        <span className="text-26px">Anonymise My Data</span>
      </h1>
      <div className="form-data">
        <p>
          Are you sure you want to delete all information we have on record for
          you?
        </p>
        <p className="mt-3 block">
          After this you will no longer be able to login to your account,
          retrieve your account or view order and invoice history.
        </p>
        <div
          className="mt-5 cursor-pointer text-color-2362AA"
          onClick={() => {
            if (
              typeof props?.actions?.gdprAnonymisePerformActions === 'function'
            ) {
              props?.actions?.gdprAnonymisePerformActions();
            }
          }}
        >
          Delete My Account
        </div>
      </div>
    </div>
  );
});

export default MyAccountAnonymise;
