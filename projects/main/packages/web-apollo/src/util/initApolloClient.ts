import { ApolloClient, InMemoryCache } from '@apollo/client';
import result from '@main/packages-web-apollo-schema-mgt/src/graphql/generated/_generated-fragment-types';
import type { InitApolloClientOptions } from '@web/apollo/src/types/driver';
import { format } from '@web/base';
import { isSSR } from '@web/base/dist/util/isSSR';

import { DefaultLink } from './default-links';
import { magentoCacheKeyFromType } from './magentoCacheKeyFromType';

// const USE_CACHE_PERSISTENT = false;

// TODO: implement localForage if needed
// let apolloForage: any;
// if (USE_CACHE_PERSISTENT && typeof localForage !== 'undefined') {
//   apolloForage = localForage.createInstance({
//     // ios lỗi indexDB nên sử dụng thêm WEBSQL
//     driver: [localForage.INDEXEDDB, localForage.WEBSQL], // Force WebSQL; same as using setDriver()
//     name: 'APOLLO',
//     version: 1.0,
//     storeName: 'keyvaluepairs', // Should be alphanumeric, with underscores.
//     description: 'Apollo cache',
//   });
// }

let apolloClient: any;

/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param apolloOptions
 * @returns {ApolloClient<any>}
 */
export const initApolloClient = (
  apolloOptions: InitApolloClientOptions
): ApolloClient<any> => {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!isSSR() && typeof apolloClient !== 'undefined') {
    return apolloClient;
  }

  const { apiBase, ...apollo } = apolloOptions;
  apolloClient = new ApolloClient({
    ssrMode: isSSR(),
    // @ts-ignore
    cache: new InMemoryCache({
      dataIdFromObject: magentoCacheKeyFromType,
      possibleTypes: result.possibleTypes,
    }),
    // @ts-ignore
    link: DefaultLink(
      apiBase,
      async () => '',
      async () => ''
      // () => StorePersistent.getItem(StoreConstant.STORE_CODE_KEY),
      // () => AccountPersistent.getItem(AccountConstant.TOKEN_KEY)
    ),
    ssrForceFetchDelay: 1000,
  });

  if (apollo?.initialData) {
    apolloClient.cache.restore(apollo.initialData);
    console.info(format.important('Apollo cache was restored'));
  }
  apolloClient.apiBase = apiBase;

  // TODO: persistent cache implement later if needed
  // if (USE_CACHE_PERSISTENT && !isSSR()) {
  //   /**
  //    * @see: https://github.com/apollographql/apollo-cache-persist
  //    */
  //   const persistor: CachePersistor<any> = new CachePersistor({
  //     // @ts-ignore
  //     cache: preInstantiatedCache,
  //     storage: apolloForage
  //       ? new LocalForageWrapper(apolloForage)
  //       : new LocalStorageWrapper(window.localStorage),
  //     debug: true,
  //     maxSize: 3123456,
  //   });
  //   // @ts-ignore
  //   apolloClient.persistor = persistor;
  //
  //   apolloClient.onResetStore(async () => {
  //     console.log('=>>> apollo client reset store');
  //     preInstantiatedCache.restore(apollo.initialData ?? {});
  //   });
  // }

  return apolloClient;
};
