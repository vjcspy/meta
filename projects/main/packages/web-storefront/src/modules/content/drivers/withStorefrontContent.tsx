import { storeManager } from '@main/packages-web-redux';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import { isDevelopment } from 'chitility/dist/util/environment';
import React from 'react';

import { navigatorReducer } from '../store/navigator/navigator.reducer';

storeManager.mergeReducers({
  navigator: navigatorReducer,
});

export const withStorefrontContent = (
  PageComponent: any,
  options: any
): any => {
  const WithStorefrontContent = React.memo((props: any) => {
    useDebugRender('WithStorefrontContent');

    return (
      <>
        <PageComponent {...props} />
      </>
    );
  });

  if (isDevelopment()) {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'PageComponent';
    WithStorefrontContent.displayName = `withStorefrontContent(${displayName})`;
  }

  wrapSSRFn(
    PageComponent,
    WithStorefrontContent,
    undefined,
    undefined,
    options?.ssr
  );

  return WithStorefrontContent;
};
