import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import dynamic from 'next/dynamic';

const DynamicBar = dynamic(() => import('@components/Bar'), {
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
