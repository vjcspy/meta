import { useSelector } from '@main/packages-web-redux';
import { selectProduct } from '@vjcspy/r/build/modules/catalog/store/product/product.selectors';
import { createUiHOC } from '@web/ui-extension';

export const withOnlyCurrentProductState = createUiHOC(() => {
  const product = useSelector(selectProduct);

  return {
    state: {
      product,
    },
  };
}, 'withOnlyCurrentProductState');
