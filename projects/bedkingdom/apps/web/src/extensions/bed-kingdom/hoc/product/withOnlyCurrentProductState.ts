import { selectProduct } from '@vjcspy/r/build/modules/catalog/store/product/product.selectors';
import { createUiHOC } from '@web/ui-extension';
import { useSelector } from '@main/packages-web-redux';

export const withOnlyCurrentProductState = createUiHOC(() => {
  const product = useSelector(selectProduct);

  return {
    state: {
      product,
    },
  };
}, 'withOnlyCurrentProductState');
