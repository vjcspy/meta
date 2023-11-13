'use client';

import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { isDevelopment } from 'chitility/dist/util/environment';
import React from 'react';
import { Provider } from 'react-redux';

export const withReduxAdapter = (Page: any, adapterOptions: any) => {
  const WithReduxAdapter = React.memo((props) => {
    useDebugRender('WithRedux');
    return (
      <Provider store={adapterOptions.store}>
        <Page {...props} />
      </Provider>
    );
  });

  if (isDevelopment()) {
    const displayName = Page.displayName || Page.name || 'PageComponent';
    WithReduxAdapter.displayName = `withReduxAdapter(${displayName})`;
  }

  return WithReduxAdapter;
};
