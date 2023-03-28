export const retrieveProductRewriteUrl = (
  product: any,
  currentCategoryId?: number
) => {
  if (product && Array.isArray(product['url_rewrites'])) {
    let urlRewriteData;
    if (typeof currentCategoryId === 'undefined') {
      urlRewriteData = product['url_rewrites'].find(
        (rw) => Array.isArray(rw['parameters']) && rw['parameters'].length === 1
      );
    } else {
      urlRewriteData = product['url_rewrites'].find((rw) => {
        if (Array.isArray(rw['parameters'])) {
          const paramWithCat = rw['parameters'].find(
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
      const fRewrite = product['url_rewrites'][0];
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
