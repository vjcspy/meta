import { ADAPTERS } from '@etc/config';
import { initApolloClient } from '@main/packages-web-apollo/src/util/initApolloClient';
import { getGraphQlUrl } from '@modules/util/url';
import { withAdapter } from '@web/base/src/lib/adapter/withAdapters';
import type { NextPage } from 'next';

export const withDefaultAdapter = (page: NextPage<any>) => {
  return withAdapter(
    page,
    {
      ssr: true,
      apollo: { apiBase: getGraphQlUrl(), initApolloClient },
    },
    ADAPTERS
  );
};
