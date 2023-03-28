import { useGetBestSellerLazyQuery } from '@vjcspy/apollo';
import { createUiHOC } from '@web/ui-extension';
import { useEffect, useState } from 'react';

export const withBestSellerData = createUiHOC(() => {
  const [bestSellerProducts, setBestSellerProducts] = useState<any[]>([]);
  const [getBestSellerQuery, getBestSellerRes] = useGetBestSellerLazyQuery({
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    getBestSellerQuery();
  }, []);

  useEffect(() => {
    if (getBestSellerRes.error) {
      console.log('get bestseller data error', getBestSellerRes.error);
    }

    if (getBestSellerRes.data?.bestSellerProduct?.items) {
      setBestSellerProducts(getBestSellerRes!.data!.bestSellerProduct?.items);
    }
  }, [getBestSellerRes.data, getBestSellerRes.error]);

  return { state: { bestSellerProducts } };
}, 'withBestSellerData');
