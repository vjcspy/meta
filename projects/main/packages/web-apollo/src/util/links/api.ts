import { HttpLink } from '@apollo/client';
import { Registry } from 'chitility/dist/util/registry';

import { WEB_APOLLO_KEY } from '../../values';
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
