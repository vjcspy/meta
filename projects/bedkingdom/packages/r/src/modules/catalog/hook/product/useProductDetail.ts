import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useDispatch } from '@main/packages-web-redux';
import { gotProductData } from '@modules/catalog/store/product/product.actions';
import { useProductDetailBySkuLazyQuery } from '@vjcspy/apollo/build';
import { useCallback, useEffect, useState } from 'react';

export const useProductDetail = () => {
  const [productDetailQuery, productDetailResponse] =
    useProductDetailBySkuLazyQuery({
      fetchPolicy: FetchPolicyResolve.DEFAULT,
    });

  const [product, setProduct] = useState<any>();
  const dispatch = useDispatch();

  const queryProductDetailBySku = useCallback((sku: string) => {
    productDetailQuery({
      variables: {
        sku,
      },
    });
  }, []);

  useEffect(() => {
    if (productDetailResponse.error) {
      console.error(
        'Could not query product detail by sku',
        productDetailResponse.error
      );
    }

    if (
      Array.isArray(productDetailResponse.data?.products?.items) &&
      productDetailResponse.data?.products?.items.length === 1
    ) {
      setProduct(productDetailResponse.data?.products?.items[0]);
      dispatch(
        gotProductData({
          product: productDetailResponse.data?.products?.items[0],
        })
      );
    }
  }, [productDetailResponse]);

  return {
    actions: { queryProductDetailBySku },
    state: {
      product,
    },
  };
};
