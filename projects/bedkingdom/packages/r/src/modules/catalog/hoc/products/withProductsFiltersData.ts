import { selectFilters } from '@modules/catalog/store/products/products.selectors';
import { CatalogCategoryListingFilter } from '@vjcspy/apollo';
import { createUiHOC } from '@web/ui-extension';
import { useMemo } from 'react';
import { useSelector } from '@main/packages-web-redux';

export const withProductsFiltersData = createUiHOC(() => {
  const storeFilters = useSelector(selectFilters);

  const filters: CatalogCategoryListingFilter[] | null = useMemo(() => {
    if (!storeFilters) {
      return null;
    } else if (Array.isArray(storeFilters)) {
      return [
        ...storeFilters.filter(
          (value: CatalogCategoryListingFilter) => value.code !== 'category_id'
        ),
      ];
    } else {
      return [];
    }
  }, [storeFilters]);

  return { filters };
}, 'withStoreFiltersData');
