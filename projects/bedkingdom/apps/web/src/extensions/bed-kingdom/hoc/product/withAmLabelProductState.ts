import { selectAmLabelProduct } from '@extensions/bed-kingdom/store/products/product.selector';
import { useSelector } from '@main/packages-web-redux';
import { createUiHOC } from '@web/ui-extension';

export const withAmLabelProductState = createUiHOC(() => {
  const amLabelProduct = useSelector(selectAmLabelProduct);

  return {
    state: {
      amLabelProduct,
    },
  };
}, 'withAmLabelProductState');
