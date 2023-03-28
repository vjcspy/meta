import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useDispatch } from '@main/packages-web-redux';
import { useUrlRewriteContext } from '@main/packages-web-storefront/src/modules/url-rewrite/context/url-rewrite';
import { useGetBedKingdomCategoryDetailForListingQuery } from '@vjcspy/apollo-bed-kingdom';
import { productsGotCategoryData } from '@vjcspy/r/build/modules/catalog/store/products/products.actions';
import { createUiHOC } from '@web/ui-extension';
import { useEffect, useMemo } from 'react';
// Just incase the data is unsorted, lets sort it.
const sortCrumbs = (a: any, b: any) =>
  a.category_level > b.category_level ? 1 : -1;

// Generates the path for the category.
const getPath = (path: any, suffix: any) => {
  if (path) {
    return `/${path}${suffix}`;
  }

  // If there is no path this is just a dead link.
  return '#';
};
export const withBedKingdomCategoryData = createUiHOC(() => {
  const urlRewriteContextValue = useUrlRewriteContext();

  const categoryQuery = useGetBedKingdomCategoryDetailForListingQuery({
    variables: {
      category_id: urlRewriteContextValue.urlRewriteData.id,
    },
    fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    nextFetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (!!urlRewriteContextValue.urlRewriteData.id && categoryQuery.error) {
      console.error('Could not load bedkingdom `category` data');
    }
  }, [categoryQuery.error]);

  const dispatch = useDispatch();

  // When we have breadcrumb data sort and normalize it for easy rendering.
  const category: any = useMemo(() => {
    if (categoryQuery.data) {
      // Default to .html for when the query has not yet returned.
      const categoryUrlSuffix =
        (categoryQuery.data && categoryQuery.data.category?.url_suffix) ||
        '.html';

      const breadcrumbData = categoryQuery.data.category?.breadcrumbs;
      const breadcrumbs =
        breadcrumbData &&
        breadcrumbData
          .map((c: any) => ({
            ...c,
            category_level: c.category_level,
            text: c.category_name,
            path: getPath(c.category_url_path, categoryUrlSuffix),
          }))
          .sort(sortCrumbs);

      return {
        ...categoryQuery.data?.category,
        breadcrumbs,
      };
    }
    return {};
  }, [categoryQuery.data, categoryQuery.loading]);

  // save to store
  useEffect(() => {
    if (categoryQuery.data) {
      dispatch(
        productsGotCategoryData({
          category,
        })
      );
    }
  }, [categoryQuery.data]);

  return { category };
}, 'withBedKingdomCategoryData');
