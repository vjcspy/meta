import { useSelector } from '@main/packages-web-redux';

import { selectFilters } from '../../store/products/products.selectors';

/**
 * Retrieve current filters in category listing page
 *
 * TODO: Sau này làm web-app có thể phải lấy filter ở url
 *
 * @returns {{filters: CatalogCategoryListingFilter[] | undefined}}
 */
export const useResolveProductsFilters = () => {
  const filtersState = useSelector(selectFilters);

  return { filters: filtersState };
};
