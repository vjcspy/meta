import dynamic from 'next/dynamic';

export const PRODUCT_TYPE_OPTION_CONFIGURABLE_OPTIONS_CPT = [
  {
    uiId: 'PRODUCT_TYPE_OPTIONS_CONFIGURABLE_OPTION',
    component: dynamic(() => import('./Option')),
    priorityFn: () => 100,
  },
];
