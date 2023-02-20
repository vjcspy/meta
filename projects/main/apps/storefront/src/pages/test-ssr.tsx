import { initApolloClient } from '@main/packages-web-apollo/src/util/initApolloClient';
import { withApollo } from '@web/apollo';
import { withAdapter } from '@web/base/src/lib/adapter/withAdapters';
import type { NextPage } from 'next';

import TestProductDetail from '../modules/testbed/components/TestProductDetail';

const TestSsr: NextPage = () => {
  return (
    <>
      <TestProductDetail />
    </>
  );
};

export default withAdapter(
  TestSsr,
  {
    apollo: { apiBase: '', initApolloClient },
  },
  [withApollo]
);
