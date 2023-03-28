import type { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const SLIDER_COMPONENTS: ExtensionConfig[] = [
  {
    uiId: 'SIMPLE_SLIDER_ITEM',
    uiTags: ['SIMPLE_SLIDER_ITEM'],
    component: dynamic(() => import('./SimpleSliderItem')),
    priorityFn: () => 99,
  },
];
