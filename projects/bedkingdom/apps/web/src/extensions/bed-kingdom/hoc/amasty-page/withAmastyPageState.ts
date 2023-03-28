import { selectAmastyPage } from '@extensions/bed-kingdom/store/content/content.content.selector';
import { useSelector } from '@main/packages-web-redux';
import { createUiHOC } from '@web/ui-extension';

export const withAmastyPageState = createUiHOC(() => {
  const amastyPage = useSelector(selectAmastyPage);
  return {
    state: { amastyPage },
  };
}, 'withAmastyPageState');
