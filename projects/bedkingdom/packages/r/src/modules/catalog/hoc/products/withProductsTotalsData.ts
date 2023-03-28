import { selectProductTotals } from '@modules/catalog/store/products/products.selectors';
import { createUiHOC } from '@web/ui-extension';
import { useSelector } from '@main/packages-web-redux';

export const withProductsTotalsData = createUiHOC(() => {
  const productTotals = useSelector(selectProductTotals);

  return { productTotals };
}, 'withProductsTotalsData');
