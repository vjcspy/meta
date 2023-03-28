import ROUTES from '@values/extendable/ROUTES';
import { withAccountState } from '@vjcspy/r/build/modules/account/hoc/withAccountState';
import { withInitAccountState } from '@vjcspy/r/build/modules/account/hoc/withInitAccountState';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import {
  combineHOC,
  UiExtension,
  useExtensionForHook,
} from '@web/ui-extension';
import React, { useEffect } from 'react';

const AuthenticateContainer: React.FC = combineHOC(
  withInitAccountState,
  withAccountState
)(
  // eslint-disable-next-line react/display-name
  React.memo((props) => {
    const CONTENT = useExtensionForHook('content', props);
    useEffect(() => {
      if (
        props.state?.accountState?.isResolvedCustomerState === true &&
        typeof props.state?.accountState?.token === 'string'
      ) {
        RouterSingleton.go(ROUTES.r('MY_ACCOUNT'));
      }
    }, [
      props.state?.accountState?.isResolvedCustomerState,
      props.state?.accountState?.token,
    ]);

    if (
      !props.state?.accountState?.isResolvedCustomerState ||
      !!props.state?.accountState?.token
    ) {
      return <UiExtension uiId="LOADING_INDICATOR" global={true} />;
    }

    return (
      <div className="block-customer-login mb-5 lg:mb-10">
        <div className="form-login mb-4">
          <h2 className="b-customer__title mb-6 text-22px font-bold text-black mdm:text-18px">
            Login Customers
          </h2>
          {CONTENT}
        </div>
      </div>
    );
  })
);

export default AuthenticateContainer;
