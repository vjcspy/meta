import { useDebugRender } from '@web/base/src/hook/useDebugRender';
import dynamic from 'next/dynamic';

const DynamicTestProductDetail = dynamic(
  () => import('@modules/testbed/components/TestProductDetail'),
  {
    loading: () => <>Loading...</>,
  }
);

export default function Bar() {
  useDebugRender('Bar');
  return <DynamicTestProductDetail />;
}
