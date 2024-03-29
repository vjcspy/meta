import { selectFilters } from '@modules/catalog/store/products/products.selectors';
import { useSelector } from '@main/packages-web-redux';

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
