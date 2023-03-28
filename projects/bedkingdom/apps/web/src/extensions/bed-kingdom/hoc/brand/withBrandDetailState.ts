import { selectBrandDetail } from '@extensions/bed-kingdom/store/content/content.content.selector';
import { createUiHOC } from '@web/ui-extension';
import { useSelector } from 'react-redux';

export const withBrandDetailState = createUiHOC(() => {
  const brandDetail = useSelector(selectBrandDetail);
  return {
    state: {
      brandDetail,
    },
  };
}, 'withBrandDetailState');
