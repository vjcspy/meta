import ROUTES from '@values/extendable/ROUTES';
import { withAccountState } from '@vjcspy/r/build/modules/account/hoc/withAccountState';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import {
  combineHOC,
  UiExtension,
  useExtensionForHook,
} from '@web/ui-extension';
import React, { useEffect, useMemo } from 'react';

const MyAccount = combineHOC(withAccountState)((props) => {
  useEffect(() => {
    if (
      props.state?.accountState?.isResolvedCustomerState === true &&
      typeof props.state?.accountState?.token !== 'string'
    ) {
      RouterSingleton.push(ROUTES.r('ACCOUNT_LOGIN'));
    }
  }, [
    props.state?.accountState?.isResolvedCustomerState,
    props.state?.accountState?.token,
  ]);

  const CONTENT = useExtensionForHook('content', props);

  const MyAccount = useMemo(() => {
    if (!props.state?.accountState?.customer) {
      return (
        <UiExtension uiId="LOADING_INDICATOR" global={true} defaultMessage />
      );
    } else {
      return (
        <section className="b-myAccount-page container mx-auto mb-10 px-4 md:mt-10">
          <div className="grid-account grid md:gap-7">
            <UiExtension uiId="MY_ACCOUNT_SIDEBAR" />
            {CONTENT}
          </div>
        </section>
      );
    }
  }, [props.state.accountState.customer]);

  return <>{MyAccount}</>;
});

export default MyAccount;
