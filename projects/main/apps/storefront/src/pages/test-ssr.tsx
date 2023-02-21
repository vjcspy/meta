import { withDefaultAdapter } from '@modules/util/withDefaultAdapter';
import type { NextPage } from 'next';

import TestProductDetail from '../modules/testbed/components/TestProductDetail';

const TestSsr: NextPage = () => {
  return (
    <>
      <TestProductDetail />
    </>
  );
};

export default withDefaultAdapter(TestSsr);
