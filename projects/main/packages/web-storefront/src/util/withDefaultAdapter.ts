import { initApolloClient } from '@main/packages-web-apollo/dist/util/initApolloClient';
import { withAdapter } from '@web/base/dist/lib/adapter/withAdapters';

import { ADAPTERS } from '../etc/config';
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
