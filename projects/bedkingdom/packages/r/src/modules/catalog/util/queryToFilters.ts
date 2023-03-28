import { CatalogCategoryListingFilter } from '@vjcspy/apollo';
import forEach from 'lodash/forEach';
import indexOf from 'lodash/indexOf';

export const queryToFilters = (query: any) => {
  const filters: CatalogCategoryListingFilter[] = [];
  if (typeof query === 'object') {
    forEach(query, (value, key) => {
      if (key === 'slug') {
        return true;
      }
      if (typeof value !== 'string' || value === '') {
        return true;
      }

      if (indexOf(value, ',') > -1) {
        filters.push({
          code: key,
          data: {
            in: value.split(','),
          },
        });
      } else {
        filters.push({
          code: key,
          data: {
            eq: value,
          },
        });
      }
    });
  }
  return filters;
};
