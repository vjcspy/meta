import StaticBar from '@main/ui-common/src/components/test/StaticBar';
import StaticFoo from '@main/ui-common/src/components/test/StaticFoo';
import StaticFooOrBar from '@main/ui-common/src/components/test/StaticFooOrBar';
import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const UI_TEST_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'DYNAMIC_FOO',
    component: dynamic(
      () => import('@main/ui-common/src/components/test/DynamicFoo')
    ),
  },
  {
    uiId: 'DYNAMIC_BAR',
    component: dynamic(
      () => import('@main/ui-common/src/components/test/DynamicBar')
    ),
  },
  {
    uiId: 'DYNAMIC_FOR_OR_BAR',
    component: dynamic(
      () => import('@main/ui-common/src/components/test/DynamicFooOrBar')
    ),
  },
  {
    uiId: 'STATIC_FOO',
    component: StaticFoo,
  },
  {
    uiId: 'STATIC_BAR',
    component: StaticBar,
  },
  {
    uiId: 'STATIC_FOO_OR_BAR',
    component: StaticFooOrBar,
  },
  {
    uiId: 'TEST_SIMPLE_SLIDER',
    component: dynamic(() => import('@components/TestSimpleSlider'), {
      ssr: false,
    }),
  },
];
