import { configureStore } from '@reduxjs/toolkit';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import { isDevelopment } from 'chitility/dist/util/environment';
import React, { useMemo } from 'react';
import { Provider as ReduxProvider } from 'react-redux';

import { storeManager } from '../store';

const store = configureStore({
  reducer: storeManager.reduce,
  middleware: storeManager.middleware,
  devTools: isDevelopment()
    ? {
        maxAge: 50,
        trace: true,
        traceLimit: 10,
      }
    : false,
});
storeManager.runEpic();
storeManager.setStore(store);
// @ts-ignore
store.storeManager = storeManager;
export const withRedux = (Page: any, webUiAdapterOptions) => {
  const WithRedux = React.memo((props) => {
    useDebugRender('WithRedux');
    const storeContextValue = useMemo(() => store, []);
    return (
      <ReduxProvider store={storeContextValue}>
        <Page {...props} />
      </ReduxProvider>
    );
  });

  if (isDevelopment()) {
    const displayName = Page.displayName || Page.name || 'PageComponent';
    WithRedux.displayName = `withRedux(${displayName})`;
  }

  wrapSSRFn(Page, WithRedux, undefined, undefined, webUiAdapterOptions?.ssr);

  return WithRedux;
};
