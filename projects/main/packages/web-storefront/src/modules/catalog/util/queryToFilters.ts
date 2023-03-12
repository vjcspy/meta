import type { CatalogCategoryListingFilter } from '@main/packages-web-apollo-schema-mgt';
import forEach from 'lodash/forEach';
import indexOf from 'lodash/indexOf';
import isObject from 'lodash/isObject';
import isString from 'lodash/isString';
import split from 'lodash/split';

export const queryToFilters = (query: any) => {
  const filters: CatalogCategoryListingFilter[] = [];
  if (isObject(query)) {
    forEach(query, (value, key) => {
      if (key === 'slug') {
        return true;
      }
      if (!isString(value) || value === '') {
        return true;
      }

      if (indexOf(value, ',') > -1) {
        filters.push({
          code: key,
          data: {
            in: split(value, ','),
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
