import { HttpLink } from '@apollo/client';
import { WEB_APOLLO_KEY } from '@web/apollo/src/values';
import { Registry } from 'chitility/dist/util/registry';

import { HttpLinkPersisted } from './httpLinkPersisted';

export const ApiLink = (uri: string) => {
  if (
    Registry.getInstance().registry(
      WEB_APOLLO_KEY.GRAPHQL_USE_LINK_PERSISTED
    ) === true
  ) {
    return new HttpLinkPersisted({
      uri,
      credentials: 'omit', // 'same-origin'
      fetch,
    });
  } else {
    return new HttpLink({
      uri,
      credentials: 'omit', // 'same-origin'
      fetch,
    });
  }
};
