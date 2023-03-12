import find from 'lodash/find';
import first from 'lodash/first';
import isArray from 'lodash/isArray';
import size from 'lodash/size';

export const resolveProductRewriteUrl = (
  product: any,
  currentCategoryId?: number
) => {
  if (product && isArray(product['url_rewrites'])) {
    let urlRewriteData;
    if (typeof currentCategoryId === 'undefined') {
      urlRewriteData = find(
        product['url_rewrites'],
        (rw) => size(rw['parameters']) === 1
      );
    } else {
      urlRewriteData = find(product['url_rewrites'], (rw) => {
        if (isArray(rw['parameters'])) {
          const paramWithCat = find(
            rw['parameters'],
            (p) => p['name'] === 'category' && p['value'] == currentCategoryId
          );

          return !!paramWithCat;
        }
        return false;
      });
    }
    if (urlRewriteData) {
      return urlRewriteData['url'];
    } else {
      const fRewrite = first(product['url_rewrites']);
      if (fRewrite) {
        return fRewrite['url'];
      }
      console.warn(
        'cound not found url rewrite data',
        product,
        currentCategoryId
      );
    }
  } else {
    console.warn(
      'please check product data. Must have `url_rewrites` data',
      product
    );
  }

  return undefined;
};
