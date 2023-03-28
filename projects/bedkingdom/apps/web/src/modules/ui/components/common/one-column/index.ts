import dynamic from 'next/dynamic';

export const ONE_COLUMN_EXTENSION_CONFIG = [
  {
    uiId: 'ui_layout_1_column',
    uiTags: ['LAYOUT_ONE_COLUMN'],
    component: dynamic(() => import('./one-column')),
    priorityFn: () => 100,
  },
];
