import { useSelector } from '@main/packages-web-redux';
import { resolveProductBreadcrumbs } from '@modules/catalog/util/product/resolveProductBreadcrumbs';
import { selectCategory } from '@vjcspy/r/build/modules/catalog/store/product/product.selectors';
import { createUiHOC } from '@web/ui-extension';

export const withProductBreadcrumbs = createUiHOC(() => {
  const category = useSelector(selectCategory);

  return {
    values: {
      breadcrumbs: resolveProductBreadcrumbs(category),
    },
  };
}, 'withProductBreadcrumbs');
