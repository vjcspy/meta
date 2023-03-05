import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import dynamic from 'next/dynamic';

const DynamicTestProductDetail = dynamic(
  () => import('@main/ui-testbed/src/components/TestProductDetail'),
  {
    loading: () => <>Loading...</>,
  }
);

export default function DynamicComponentLv2() {
  useDebugRender('DynamicComponentLv2');
  return <DynamicTestProductDetail />;
}
