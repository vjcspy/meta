import { R_DEFAULT_VALUE } from '@values/R_DEFAULT_VALUE';
import { Registry } from 'chitility';

import { StoreConstant } from './constant';
import { StorePersistent } from './store-persistent';

export const configGraphQLWithStore = () => {
  const additionalHeaderResolved = Registry.getInstance().registry(
    R_DEFAULT_VALUE.GRAPHQL_RESOLVE_ADDITIONAL_HEADER_KEY
  );

  const resolveStore = async () => {
    const storeCode = await StorePersistent.getItem(
      StoreConstant.STORE_CODE_KEY
    );
    if (storeCode) {
      return storeCode;
    } else {
      return undefined;
    }
  };

  const withStoreHeader = Object.assign(
    {},
    { ...additionalHeaderResolved },
    {
      Store: resolveStore,
    }
  );

  Registry.getInstance().register(
    R_DEFAULT_VALUE.GRAPHQL_RESOLVE_ADDITIONAL_HEADER_KEY,
    withStoreHeader
  );
};
