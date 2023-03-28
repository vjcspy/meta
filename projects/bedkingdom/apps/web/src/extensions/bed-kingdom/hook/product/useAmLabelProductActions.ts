import { bedSetAmLabelProduct } from '@extensions/bed-kingdom/store/products/product.actions';
import { useAmLabelProviderLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export const useAmLabelProductActions = () => {
  const dispatch = useDispatch();
  const [amLabelProviderQuery, amLabelProviderRes] =
    useAmLabelProviderLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

  const amLabelProductActions = useCallback((productIds: any) => {
    if (productIds && productIds.length > 0) {
      amLabelProviderQuery({
        variables: {
          productIds: productIds,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (amLabelProviderRes.error) {
      console.error('Could not load home page categories data');
    }
    if (amLabelProviderRes.data) {
      if (
        amLabelProviderRes?.data?.amLabelProvider &&
        Array.isArray(amLabelProviderRes?.data?.amLabelProvider) &&
        amLabelProviderRes?.data?.amLabelProvider.length > 0
      ) {
        const arr: any = {};
        amLabelProviderRes?.data?.amLabelProvider.forEach((item: any) => {
          if (
            item?.items &&
            Array.isArray(item?.items) &&
            item?.items.length > 0 &&
            item?.items[0]?.product_id
          ) {
            arr[item?.items[0]?.product_id] = item?.items;
          }
        });

        if (arr) {
          dispatch(
            bedSetAmLabelProduct({
              data: arr,
            })
          );
        }
      }
    }
  }, [amLabelProviderRes.error, amLabelProviderRes.data]);

  return {
    amLabelProductActions,
  };
};
