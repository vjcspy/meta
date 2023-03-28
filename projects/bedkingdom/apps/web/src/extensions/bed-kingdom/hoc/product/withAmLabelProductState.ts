import { selectAmLabelProduct } from '@extensions/bed-kingdom/store/products/product.selector';
import { createUiHOC } from '@web/ui-extension';
import { useSelector } from 'react-redux';

export const withAmLabelProductState = createUiHOC(() => {
  const amLabelProduct = useSelector(selectAmLabelProduct);

  return {
    state: {
      amLabelProduct,
    },
  };
}, 'withAmLabelProductState');
