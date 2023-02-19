import { ApolloClient } from '@apollo/client';
import {
  preInstantiatedCache,
  preInstantiatedCacheFactory,
} from '@vjcspy/apollo/build/util/apollo-persistent';
import { DefaultLink } from '@vjcspy/apollo/build/util/default-links';
import { Registry } from '@vjcspy/chitility';
import { isSSR } from '@vjcspy/chitility/build/util/isSSR';
import { logger } from '@vjcspy/chitility/build/util/logger';
import { AccountPersistent } from '@vjcspy/r/build/modules/account/util/account-persistent';
import { AccountConstant } from '@vjcspy/r/build/modules/account/util/constant';
import { StoreConstant } from '@vjcspy/r/build/modules/store/util/constant';
import { StorePersistent } from '@vjcspy/r/build/modules/store/util/store-persistent';
import { R_DEFAULT_VALUE } from '@vjcspy/r/build/values/R_DEFAULT_VALUE';
import {
  CachePersistor,
  LocalForageWrapper,
  LocalStorageWrapper,
} from 'apollo3-cache-persist';
import localForage from 'localforage';
import { useEffect, useState } from 'react';

import { WebUiApolloOptions } from '../types/driver';

const USE_CACHE_PERSISTENT = false;

let apolloForage: any;
if (USE_CACHE_PERSISTENT && typeof localForage !== 'undefined') {
  apolloForage = localForage.createInstance({
    // ios lỗi indexDB nên sử dụng thêm WEBSQL
    driver: [localForage.INDEXEDDB, localForage.WEBSQL], // Force WebSQL; same as using setDriver()
    name: 'APOLLO',
    version: 1.0,
    storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
    description: 'Apollo cache',
  });
}

let apolloClient: any;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param apolloOptions
 * @returns {ApolloClient<any>}
 */
export const initApolloClient = (
  apolloOptions: WebUiApolloOptions
): ApolloClient<any> => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isSSR() && typeof apolloClient !== 'undefined') {
    return apolloClient;
  }

  const { apiBase, ...apollo } = apolloOptions;
  logger.debug('>>> init apollo client');
  apolloClient = new ApolloClient({
    ssrMode: isSSR(),
    // @ts-ignore
    cache: isSSR() ? preInstantiatedCacheFactory() : preInstantiatedCache,
    // @ts-ignore
    link: DefaultLink(
      Registry.getInstance().registry(R_DEFAULT_VALUE.GRAPHQL_DEFAULT_URL_KEY),
      // @ts-ignore
      () => StorePersistent.getItem(StoreConstant.STORE_CODE_KEY),
      () => AccountPersistent.getItem(AccountConstant.TOKEN_KEY)
    ),
    ssrForceFetchDelay: 1000,
  });

  if (apollo.initialData) {
    apolloClient.cache.restore(apollo.initialData);
  }
  apolloClient.apiBase = apiBase;

  if (USE_CACHE_PERSISTENT && !isSSR()) {
    /**
     * @see: https://github.com/apollographql/apollo-cache-persist
     */
    const persistor: CachePersistor<any> = new CachePersistor({
      // @ts-ignore
      cache: preInstantiatedCache,
      storage: apolloForage
        ? new LocalForageWrapper(apolloForage)
        : new LocalStorageWrapper(window.localStorage),
      debug: true,
      maxSize: 3123456,
    });
    // @ts-ignore
    apolloClient.persistor = persistor;

    apolloClient.onResetStore(async () => {
      console.log('=>>> apollo client reset store');
      preInstantiatedCache.restore(apollo.initialData ?? {});
    });
  }

  return apolloClient;
};

/**
 *
 * @param apolloOptions
 * @returns {[ApolloClient<any> & {persistor: any}, boolean]}
 */
export const useApolloClient = (apolloOptions: WebUiApolloOptions) => {
  /*
   * Nếu trước đó đã init ở SSR thì tái sử dụng
   * */
  let client: ApolloClient<any> = apolloOptions?.client;
  // @ts-ignore
  if (!client) {
    client = initApolloClient(apolloOptions);
  }
  const [initPersistent, setInitPersistent] = useState(!USE_CACHE_PERSISTENT);

  useEffect(() => {
    if (USE_CACHE_PERSISTENT && (client as any)?.persistor) {
      const persistor = (client as any)?.persistor;
      async function initialize() {
        await persistor.restore();
        setInitPersistent(true);
      }
      initialize();
    }
  }, []);

  return { client, initPersistent };
};
