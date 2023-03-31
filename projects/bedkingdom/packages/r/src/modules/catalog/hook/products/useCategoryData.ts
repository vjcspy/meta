import { useDispatch } from '@main/packages-web-redux';
import { productsGotCategoryData } from '@modules/catalog/store/products/products.actions';
import { useUrlRewriteContext } from '@main/packages-web-storefront/src/modules/url-rewrite/context/url-rewrite';
import { useGetCategoryDetailForListingQuery } from '@vjcspy/apollo';
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

export const useCategoryData = () => {
  const urlRewriteContextValue = useUrlRewriteContext();

  const categoryQuery = useGetCategoryDetailForListingQuery({
    variables: {
      category_id: urlRewriteContextValue.urlRewriteData.id,
    },
  });

  useEffect(() => {
    if (categoryQuery.error) {
      console.error('Could not load `category` data');
    }
  }, [categoryQuery.error]);

  const dispatch = useDispatch();

  // When we have breadcrumb data sort and normalize it for easy rendering.
  const category: any = useMemo(() => {
    if (!categoryQuery.loading && categoryQuery.data) {
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
};
