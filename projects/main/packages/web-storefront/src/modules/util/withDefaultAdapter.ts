import { initApolloClient } from '@main/packages-web-apollo/src/util/initApolloClient';
import { withAdapter } from '@web/base/src/lib/adapter/withAdapters';

import { ADAPTERS } from '../../etc/config';
import { getGraphQlUrl } from './url';

export const withDefaultAdapter = (NextPage: any) => {
  return withAdapter(
    NextPage,
    {
      ssr: true,
      apollo: { apiBase: getGraphQlUrl(), initApolloClient },
    },
    ADAPTERS
  );
};
