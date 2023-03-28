import { checkCustomerIsLogged } from '@modules/account/store/account.actions';
import { selectResolvedAccountState } from '@modules/account/store/account.selector';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const withInitAccountState = createUiHOC(() => {
  const dispatch = useDispatch();
  const isResolvedAccountState = useSelector(selectResolvedAccountState);
  useEffect(() => {
    dispatch(checkCustomerIsLogged({}));
  }, []);

  return {
    state: {
      isResolvedAccountState,
    },
  };
}, 'withInitAccountState');
