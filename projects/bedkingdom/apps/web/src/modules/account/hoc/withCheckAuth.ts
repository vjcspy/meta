import { useAccountState } from '@vjcspy/r/build/modules/account/hook/useAccountState';
import { useRouterWithStoreActions } from '@vjcspy/web-store/build/hook/router/userRouterWithStoreActions';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withCheckAuth = createUiHOC(() => {
  const accountState = useAccountState();
  const router = useRouterWithStoreActions();

  useEffect(() => {
    if (accountState.state.accountState.isResolvedCustomerState) {
      if (accountState.state.accountState.customer) {
        if (typeof accountState.state.accountState.referer === 'string') {
          router.actions.go(accountState.state.accountState.referer);
        } else {
          router.actions.go('my-account');
        }
      }
    }
  }, [
    accountState.state.accountState.isResolvedCustomerState,
    accountState.state.accountState.customer,
  ]);

  return {};
}, 'withCheckAuth');
