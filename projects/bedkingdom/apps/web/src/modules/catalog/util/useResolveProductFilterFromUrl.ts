/**
 * Init filters data from url
 * @returns {{filters: CatalogCategoryListingFilter[]}}
 */
import { useDispatch } from '@main/packages-web-redux';
import type { CatalogCategoryListingFilter } from '@vjcspy/apollo';
import { productsResolvedFiltersData } from '@vjcspy/r/build/modules/catalog/store/products/products.actions';
import { queryToFilters } from '@vjcspy/r/build/modules/catalog/util/queryToFilters';
import { useUrlRewriteContext } from '@main/packages-web-storefront/src/modules/url-rewrite/context/url-rewrite';
import { Registry } from 'chitility';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const useResolveProductFilterFromUrl = () => {
  const urlRewriteContextValue = useUrlRewriteContext();
  const dispatch = useDispatch();
  const routers = useRouter();
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
    }

    // resolve attribute filters
    init.push(
      ...queryToFilters(routers.query).filter((fil: any) => fil?.code !== 'q')
    );
    if (Registry.getInstance().registry('IS_BRAND_DETAIL_PAGE')) {
      const additionsFilters = Registry.getInstance().registry(
        'CATALOG_CATEGORY_ADDITION_FILTERS'
      );
      if (Array.isArray(additionsFilters)) {
        init.push(...additionsFilters);
      }
    } else if (
      Registry.getInstance().registry('CATALOG_CATEGORY_ADDITION_FILTERS') &&
      Array.isArray(
        Registry.getInstance().registry('CATALOG_CATEGORY_ADDITION_FILTERS')
      )
    ) {
      const additionsFilters = Registry.getInstance()
        .registry('CATALOG_CATEGORY_ADDITION_FILTERS')
        .filter((item: any) => item?.code !== 'manufacturer');
      if (Array.isArray(additionsFilters)) {
        init.push(...additionsFilters);
      }
    }

    return init;
  }, [routers.query, urlRewriteContextValue]);

  useEffect(() => {
    dispatch(productsResolvedFiltersData({ filters }));
  }, [filters]);

  return {
    filters,
  };
};
