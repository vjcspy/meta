import Foo from '@modules/testbed/components/Foo';
import { withDefaultAdapter } from '@modules/util/withDefaultAdapter';
import type { NextPage } from 'next';

const TestSsr: NextPage = () => {
  return <Foo />;
};

export default withDefaultAdapter(TestSsr);
