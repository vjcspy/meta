import { storeManager } from '@main/packages-web-redux';
import { WEB_ACCOUNT_EFFECTS } from '@modules/account/store/toast.effects';
import { ACCOUNT_EFFECTS } from '@vjcspy/r/build/modules/account/store/account.effects';
import { accountReducer } from '@vjcspy/r/build/modules/account/store/account.reducer';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import type { NextPage } from 'next';
import React from 'react';

let _initAccount = false;
storeManager.mergeReducers({
  account: accountReducer,
});
function initAccount() {
  if (_initAccount) {
    return;
  }
  storeManager.addEpics('web-account', [
    ...ACCOUNT_EFFECTS,
    ...WEB_ACCOUNT_EFFECTS,
  ]);

  _initAccount = true;
}

initAccount();

export const withWebAccount = (
  PageComponent: any,
  webUiAdapterOptions?: any
): NextPage<any> => {
  const WithWebAccount = React.memo((props: any) => {
    return (
      <>
        <PageComponent {...props} />
      </>
    );
  });

  wrapSSRFn(
    PageComponent,
    WithWebAccount,
    undefined,
    undefined,
    webUiAdapterOptions?.ssr
  );

  const displayName =
    PageComponent.displayName || PageComponent.name || 'PageComponent';
  WithWebAccount.displayName = `withWebAccount(${displayName})`;

  return WithWebAccount;
};
