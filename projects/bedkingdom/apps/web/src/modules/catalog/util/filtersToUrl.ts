import { CatalogCategoryListingFilter } from '@vjcspy/apollo';
import Router from 'next/router';

export const filtersToUrl = (filters: CatalogCategoryListingFilter[]) => {
  const query: any = {};

  if (Array.isArray(filters)) {
    filters.forEach((value) => {
      if (typeof value.data.eq === 'string') {
        query[value.code] = encodeURI(value.data.eq);
      } else if (typeof value.data.in === 'object') {
        // @ts-ignore
        query[value.code] = encodeURI(value.data.in.join(','));
      }
    });
  }

  // pathname
  let pathname = '';
  const routerQuery = Router.query;
  if (routerQuery.hasOwnProperty('slug') && Array.isArray(routerQuery.slug)) {
    pathname = routerQuery.slug.join('/');
  } else {
    // console.error('only support on `slug` name page and products page');
  }
  return { pathname, query };
};
