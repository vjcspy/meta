import { selectAmastyPage } from '@extensions/bed-kingdom/store/content/content.content.selector';
import { createUiHOC } from '@web/ui-extension';
import { useSelector } from 'react-redux';

export const withAmastyPageState = createUiHOC(() => {
  const amastyPage = useSelector(selectAmastyPage);
  return {
    state: { amastyPage },
  };
}, 'withAmastyPageState');
