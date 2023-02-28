import { Registry } from 'chitility/dist/util/registry';

import { WEB_STOREFRONT_KEY } from '../../../etc/key';
import { WEB_STORE_KEY } from '../etc/key';
import { StorePersistent } from './store-persistent';

export const configGraphQLWithStore = () => {
  const additionalHeaderResolved = Registry.getInstance().registry(
    WEB_STOREFRONT_KEY.GRAPHQL_RESOLVE_ADDITIONAL_HEADER_KEY
  );

  const resolveStore = async () => {
    const storeCode = await StorePersistent.getItem(
      WEB_STORE_KEY.STORE_CODE_KEY
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
    WEB_STOREFRONT_KEY.GRAPHQL_RESOLVE_ADDITIONAL_HEADER_KEY,
    withStoreHeader
  );
};
