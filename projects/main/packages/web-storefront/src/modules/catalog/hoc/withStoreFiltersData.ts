import type { CatalogCategoryListingFilter } from '@main/packages-web-apollo-schema-mgt';
import { useSelector } from '@main/packages-web-redux';
import { createUiHOC } from '@web/ui-extension';
import { useMemo } from 'react';

import { selectFilters } from '../store/products';

export const withStoreFiltersData = createUiHOC(() => {
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
