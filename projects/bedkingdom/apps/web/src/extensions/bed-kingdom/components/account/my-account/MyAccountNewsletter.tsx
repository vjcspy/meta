import { withBedKingdomAccountActions } from '@extensions/bed-kingdom/hoc/account/withBedKingdomAccountActions';
import { withCustomer } from '@vjcspy/r/build/modules/account/hoc/withCustomer';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

const MyAccountNewsletter = combineHOC(
  withCustomer,
  withBedKingdomAccountActions
)((props) => {
  const [statusCheck, setStatusCheck] = useState(
    props?.state?.customer?.is_subscribed || false
  );
  const statusNewsletter = useMemo(() => {
    if (props?.state?.customer?.is_subscribed) {
      return true;
    }
    return false;
  }, [props?.state?.customer]);

  return (
    <div className="b-block-sidebar">
      <h1 className="b-account-title mb-5 mdm:font-bold">
        <span className="text-26px">Newsletter Subscription</span>
      </h1>
      <div className="form-newsletter max-w-440">
        <div className="field choice mb-3">
          <input
            type="checkbox"
            name="assistance_allowed_checkbox"
            title="Allow remote shopping assistance"
            value="1"
            id="subscription_checkbox"
            className="checkbox"
            defaultChecked={statusNewsletter}
            onChange={(event) => setStatusCheck(event.target.checked)}
          />
          <label
            htmlFor="subscription_checkbox"
            className="label relative pl-3"
          >
            <span>General Subscription</span>
          </label>
        </div>

        <button
          type="button"
          className={clsx(
            'btn btn-default mt-8 px-8',
            props?.state?.isLoadingState?.resetPassword &&
              'btn-loader btn-loader-active'
          )}
          onClick={() => {
            if (typeof props?.actions?.updateCustomer === 'function') {
              props?.actions?.updateCustomerNewsletter({
                is_subscribed: statusCheck,
              });
            }
          }}
        >
          <span
            className={clsx(
              props?.state?.isLoadingState?.resetPassword && 'loader'
            )}
          />
          <span>Save</span>
        </button>
      </div>
    </div>
  );
});

export default MyAccountNewsletter;
