import { selectBrandDetail } from '@extensions/bed-kingdom/store/content/content.content.selector';
import { useSelector } from '@main/packages-web-redux';
import { createUiHOC } from '@web/ui-extension';

export const withBrandDetailState = createUiHOC(() => {
  const brandDetail = useSelector(selectBrandDetail);
  return {
    state: {
      brandDetail,
    },
  };
}, 'withBrandDetailState');
