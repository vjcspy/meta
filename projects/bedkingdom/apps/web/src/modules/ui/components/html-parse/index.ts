import { ExtensionConfig } from '@web/ui-extension';
import dynamic from 'next/dynamic';

export const HtmlParseCPT: ExtensionConfig[] = [
  {
    uiId: 'HTML_PARSE',
    uiTags: ['HTML_PARSE'],
    component: dynamic(() => import('./HtmlParse')),
    priorityFn: () => 100,
  },
];
