import { withDefaultAdapter } from '@main/packages-web-storefront/src';
import TestProductDetail from '@main/ui-testbed/src/components/TestProductDetail';
import type { NextPage } from 'next';

const TestSsrDynamic: NextPage = () => {
  return <TestProductDetail />;
};

export default withDefaultAdapter(TestSsrDynamic);
