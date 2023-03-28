import { useSelector } from '@main/packages-web-redux';
import { selectAccount } from '@vjcspy/r/build/modules/account/store/account.selector';
import { selectCart } from '@vjcspy/r/build/modules/checkout/store/cart/cart.selector';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { Registry } from 'chitility';
import { useCallback, useState } from 'react';

export const useMgtCheckoutActions = () => {
  const accountState = useSelector(selectAccount);
  const cartState = useSelector(selectCart);
  const [isRedirecting, setRedirecting] = useState(false);
  const goMgtCheckout = useCallback(() => {
    if (!accountState.isResolvedCustomerState) {
      // wait to resolve customer state
      // toastErrorMessage('Please try again later');
      return;
    }
    if (accountState?.customer && typeof accountState?.token === 'string') {
      setRedirecting(true);
      RouterSingleton.push(
        Registry.getInstance().registry('PCMS_DEFAULT_URL_KEY') +
          `/prepare/prepare/index?token=${accountState.token}&callback=${
            window.origin + '/checkout-callback'
          }`
      );
    } else if (cartState?.id) {
      setRedirecting(true);
      RouterSingleton.push(
        Registry.getInstance().registry('PCMS_DEFAULT_URL_KEY') +
          `/prepare/prepare/index?cart_id=${cartState.id}&callback=${
            window.origin + '/checkout-callback'
          }`
      );
    } else {
      // toastErrorMessage('Please try again later');
    }
  }, [
    accountState.customer,
    accountState?.isResolvedCustomerState,
    cartState?.id,
  ]);

  return {
    actions: {
      goMgtCheckout,
    },
    state: {
      isRedirecting,
    },
  };
};
