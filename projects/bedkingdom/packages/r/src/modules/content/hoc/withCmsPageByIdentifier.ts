import { useCmsPageByIdentifier } from '@modules/content/hook/useCmsPageByIdentifier';
import { createUiHOC } from '@web/ui-extension';

export const withCmsPageByIdentifier = createUiHOC((props) => {
  return useCmsPageByIdentifier();
}, 'withCmsPageByIdentifier');
