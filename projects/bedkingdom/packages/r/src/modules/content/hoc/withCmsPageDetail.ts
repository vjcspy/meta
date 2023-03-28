import { selectCmsPageDetail } from '@modules/content/store/selectors';
import { createUiHOC } from '@web/ui-extension';
import { useSelector } from '@main/packages-web-redux';

export const withCmsPageDetail = createUiHOC(() => {
  const selectDetail = useSelector(selectCmsPageDetail);
  return { state: { selectDetail } };
}, 'withCmsPageDetail');
