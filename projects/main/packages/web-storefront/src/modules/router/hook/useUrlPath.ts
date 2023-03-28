import { isSSR } from '@web/base/dist/util/isSSR';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';

export const useUrlPath = () => {
  if (isSSR()) {
    return { pathname: null };
  } else {
    // pathname
    let pathname = '';
    const routerQuery = RouterSingleton.query;
    if (routerQuery.hasOwnProperty('slug') && Array.isArray(routerQuery.slug)) {
      pathname = routerQuery.slug.join('/');
    } else {
      console.error('only support on `slug` name page and products page');
    }

    return { pathname };
  }
};
