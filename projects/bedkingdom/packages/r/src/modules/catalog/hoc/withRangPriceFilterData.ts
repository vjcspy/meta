import { selectRangePriceFilter } from '@modules/catalog/store/products/products.selectors';
import { createUiHOC } from '@web/ui-extension';
import { useSelector } from '@main/packages-web-redux';

export const withRangPriceFilterData = createUiHOC((props) => {
  const rangePriceFilters = useSelector(selectRangePriceFilter);
  return {
    rangePriceFilters,
  };
}, 'withRangPriceFilterData');
