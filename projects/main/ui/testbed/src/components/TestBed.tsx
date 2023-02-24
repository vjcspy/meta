import { useDebugRender } from '@web/base/dist/hook/useDebugRender';

import TestProductDetail from './TestProductDetail';

export default function TestBed() {
  useDebugRender('TestBed');
  return <TestProductDetail />;
}
