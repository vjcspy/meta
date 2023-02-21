import { useDebugRender } from '@web/base/src/hook/useDebugRender';

import TestProductDetail from './TestProductDetail';

export default function TestBed() {
  useDebugRender('TestBed');
  return <TestProductDetail />;
}
