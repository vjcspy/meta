import { useCmsPage } from '@modules/content/hook/useCmsPage';
import { createUiHOC } from '@web/ui-extension';

export const withCmsPage = createUiHOC((props) => {
  return useCmsPage();
}, 'withCmsPage');
