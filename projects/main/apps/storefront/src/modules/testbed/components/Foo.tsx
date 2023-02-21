import { useDebugRender } from '@web/base/src/hook/useDebugRender';
import dynamic from 'next/dynamic';

const DynamicBar = dynamic(() => import('@modules/testbed/components/Bar'), {
  loading: () => <>Loading...</>,
});
export default function Foo() {
  useDebugRender('Foo');
  return (
    <>
      <DynamicBar />
    </>
  );
}
