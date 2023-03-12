import DynamicComponentLv1 from '@components/DynamicComponentLv1';
import { withDefaultAdapter } from '@main/packages-web-storefront/src';
import type { NextPage } from 'next';

const TestSsrDynamic: NextPage = () => {
  return <DynamicComponentLv1 />;
};

export default withDefaultAdapter(TestSsrDynamic);
