import {
  SortEnum,
  useGetCategoryListingDataQuery,
} from '@main/packages-web-apollo-schema-mgt';
import { useDispatch, useSelector } from '@main/packages-web-redux';
import { useEffect } from 'react';

import {
  productsGotData,
  selectIsUpdatingProducts,
  selectPageFilterInfo,
} from '../../store/products';
import { useResolveProductFilterFromUrl } from './useResolveProductFilterFromUrl';

export const useProductsContainer = () => {
  const { filters } = useResolveProductFilterFromUrl();
  const isUpdatingProducts = useSelector(selectIsUpdatingProducts);
  const pageFilterInfo = useSelector(selectPageFilterInfo) ?? {
    sort: {
      position: SortEnum.Desc,
    },
    currentPage: 1,
  };

  const productsQuery = useGetCategoryListingDataQuery({
    variables: {
      search: '',
      currentPage: pageFilterInfo.currentPage ?? 1,
      filters,
      pageSize: 20,
      sort: pageFilterInfo.sort,
    },
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (productsQuery.error) {
      dispatch(
        productsGotData({
          products: [],
          aggregations: [],
        })
      );
    }
  }, [productsQuery.error]);

  const dispatch = useDispatch();
  // save to store
  useEffect(() => {
    if (!productsQuery.loading && productsQuery.data) {
      dispatch(
        productsGotData({
          products: productsQuery.data.catalogCategoryListingData?.items!,
          aggregations:
            productsQuery.data.catalogCategoryListingData?.aggregations!,
        })
      );
    }
  }, [productsQuery.data, productsQuery.loading]);

  return {
    products: productsQuery?.data?.catalogCategoryListingData?.items || [],
    aggregations: productsQuery?.data?.catalogCategoryListingData?.aggregations,
    isUpdatingProducts: isUpdatingProducts || productsQuery.loading,
  };
};
