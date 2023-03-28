import {
  selectAccount,
  selectLoadingState,
} from '@modules/account/store/account.selector';
import { useSelector } from '@main/packages-web-redux';

export const useAccountLoadingState = () => {
  const accountState = useSelector(selectAccount);
  const isLoadingState = useSelector(selectLoadingState);

  const isGeneratingToken = accountState.loadingState.generateToken;
  const isCustomerLogged = !!accountState.token;
  const isShowLoginForm =
    accountState.isResolvedCustomerState && !accountState.token;

  return {
    state: {
      isGeneratingToken,
      isCustomerLogged,
      isShowLoginForm,
      isLoadingState,
    },
  };
};
