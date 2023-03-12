import type { CatalogCategoryListingFilter } from '@main/packages-web-apollo-schema-mgt';
import { useDispatch } from '@main/packages-web-redux';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { useEffect, useMemo } from 'react';

import { useUrlRewriteContext } from '../../../url-rewrite/context/url-rewrite';
import { productsResolvedFiltersData } from '../../store/products';
import { queryToFilters } from '../../util/queryToFilters';
import { useResolveProductsFilters } from './useResolveProductsFilters';

/**
 * Init filters data from url
 * @returns {{filters: CatalogCategoryListingFilter[]}}
 */
export const useResolveProductFilterFromUrl = () => {
  const urlRewriteContextValue = useUrlRewriteContext();
  const dispatch = useDispatch();
  const filterFromState = useResolveProductsFilters();

  /**
   * Chỗ này bắt buộc phải sử dụng memo để lấy filters data synchronized
   * Filters sau đó được sử dụng để query get products
   *
   * @type {CatalogCategoryListingFilter[]}
   */
  const filters: CatalogCategoryListingFilter[] = useMemo(() => {
    const init: CatalogCategoryListingFilter[] = [];
    // resolve category filter
    if (urlRewriteContextValue.urlRewriteData.type === 'CATEGORY') {
      init.push({
        code: 'category_id',
        data: {
          eq: urlRewriteContextValue.urlRewriteData.id,
        },
      });
    } else {
      if (
        Array.isArray(filterFromState?.filters) &&
        filterFromState?.filters.filter((item: any) => item?.type === 'fix')
          .length > 0
      ) {
        const arrDataFilter: any[] = filterFromState?.filters.filter(
          (item: any) => item?.type === 'fix'
        );
        init.push({
          code: arrDataFilter[0]?.code,
          data: arrDataFilter[0]?.data,
        });
      }
    }

    // resolve attribute filters
    init.push(...queryToFilters(RouterSingleton.query));

    return init;
  }, [RouterSingleton.query, urlRewriteContextValue]);

  useEffect(() => {
    dispatch(productsResolvedFiltersData({ filters }));
  }, [filters]);

  return {
    filters,
  };
};
