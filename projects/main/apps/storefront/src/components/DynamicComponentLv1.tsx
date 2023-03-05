import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import dynamic from 'next/dynamic';

const DynamicComponentLv2 = dynamic(
  () => import('@components/DynamicComponentLv2'),
  {
    loading: () => <>Loading...</>,
  }
);
export default function DynamicComponentLv1() {
  useDebugRender('DynamicComponentLv1');
  return (
    <>
      <DynamicComponentLv2 />
    </>
  );
}
