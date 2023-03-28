import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useSelector } from '@main/packages-web-redux';
import { useGetProductMattressOffersLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { selectProduct } from '@vjcspy/r/build/modules/catalog/store/product/product.selectors';
import { createUiHOC } from '@web/ui-extension';
import { useEffect, useState } from 'react';

export const withOfferProductState = createUiHOC(() => {
  const [listAmMattress, setListAmMattress] = useState<any[]>([]);
  const product = useSelector(selectProduct);
  const [amMattressOffersQuery, amMattressOffersRes] =
    useGetProductMattressOffersLazyQuery({
      fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    });

  useEffect(() => {
    if (product?.id) {
      amMattressOffersQuery({ variables: { id: product?.id } });
    }
  }, [product?.id]);

  useEffect(() => {
    if (amMattressOffersRes.error) {
      console.error('Could not load get Top Searches data');
    }
    if (amMattressOffersRes?.data?.getProductMattressOffers) {
      setListAmMattress(amMattressOffersRes?.data?.getProductMattressOffers);
    }
  }, [amMattressOffersRes.error, amMattressOffersRes?.data]);

  return {
    state: {
      listAmMattress,
    },
  };
}, 'withOfferProductState');
