import { useDispatch, useSelector } from '@main/packages-web-redux';
import { gotProductCategoryBaseOnUrlAfterAction } from '@modules/catalog/store/product/product.actions';
import { selectProduct } from '@modules/catalog/store/product/product.selectors';
import { useUrlRewriteContext } from '@main/packages-web-storefront/src/modules/url-rewrite/context/url-rewrite';
import { WEB_URL_REWRITE_KEY } from '@modules/router/values/WEB_URL_REWRITE_KEY';
import { useGetCategoryDetailForListingLazyQuery } from '@vjcspy/apollo';
import { useEffect, useState } from 'react';

export const useProductCategoryBaseOnUrl = () => {
  const urlRewriteContextValue = useUrlRewriteContext();
  const [queryCategoryDetail, categoryDetailResult] =
    useGetCategoryDetailForListingLazyQuery();
  const product: any = useSelector(selectProduct);
  const dispatch = useDispatch();
  const [productCategoryBaseOnUrl, setProductCategoryBaseOnUrl] =
    useState<any>();

  useEffect(() => {
    if (
      urlRewriteContextValue.urlRewriteData &&
      urlRewriteContextValue.urlRewriteData.type ===
        WEB_URL_REWRITE_KEY.URL_REWRITE_PRODUCT_TYPE &&
      typeof urlRewriteContextValue.urlRewriteData.metadata === 'string'
    ) {
      try {
        const metadata: any = JSON.parse(
          urlRewriteContextValue.urlRewriteData.metadata
        );

        if (metadata.hasOwnProperty('category_id')) {
          queryCategoryDetail({
            variables: {
              category_id: metadata['category_id'],
            },
          });
        }
      } catch (e) {
        console.warn('Could not resolve product breadcrumbs');
        console.warn(e);
      }
    }
  }, [product?.id]);

  useEffect(() => {
    if (categoryDetailResult.data?.category) {
      dispatch(
        gotProductCategoryBaseOnUrlAfterAction({
          category: categoryDetailResult.data.category,
        })
      );

      setProductCategoryBaseOnUrl(categoryDetailResult.data!.category);
    }
  }, [categoryDetailResult?.data]);

  return { productCategoryBaseOnUrl };
};
