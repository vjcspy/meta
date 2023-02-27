import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { wrapSSRFn } from '@web/base/dist/util/wrapSSRFn';
import React, { useEffect, useState } from 'react';

import { StoreContextProvider } from '../context/store';
import { WEB_STORE_KEY } from '../etc/key';
import webStoreExtensionValue from '../etc/web-store-extension-value';
import { StorePersistent } from '../util/store-persistent';

export const withStore = (
  PageComponent: any,
  webUiAdapterOptions?: any
): any => {
  const WithStore = React.memo((props) => {
    useDebugRender('WebStore');
    const resolveUrlWithStore = useResolveUrlWithStore();

    const [storeData, setStoreData] = useState({
      storeId: resolveUrlWithStore?.currentStore?.id,
      store: resolveUrlWithStore?.currentStore,
    });

    useAddStoreCodeToUrl(
      resolveUrlWithStore,
      webStoreExtensionValue.r('INCLUDE_STORE_CODE_IN_URL')
    );

    if (!resolveUrlWithStore?.currentStore) {
      console.error('Could not resolve current store');

      return null;
    }

    useEffect(() => {
      if (storeData?.store?.code) {
        StorePersistent.saveItem(
          WEB_STORE_KEY.STORE_CODE_KEY,
          storeData?.store?.code
        );
      }
    }, [storeData?.store?.code]);

    return (
      <StoreContextProvider value={{ storeData, setStoreData }}>
        <PageComponent {...props} />
      </StoreContextProvider>
    );
  });

  wrapSSRFn(
    PageComponent,
    WithStore,
    undefined,
    undefined,
    webUiAdapterOptions?.ssr
  );

  const displayName =
    PageComponent.displayName || PageComponent.name || 'PageComponent';
  WithStore.displayName = `withStore(${displayName})`;

  return WithStore;
};
