import { getListCategoryIdsFromSelections } from '@modules/content/util/getListCategoryIdsFromSelections';
import { useDomainContext } from '@modules/domain/context/domain';
import { useStoreContext } from '@modules/store/context/store';
import {
  useGetChiakiConfigQuery,
  useGetListCategoryLazyQuery,
} from '@vjcspy/apollo';
import { useEffect, useState } from 'react';

export const useNavigator = (key = 'navigator') => {
  const domainContextValue = useDomainContext();
  const storeContextValue = useStoreContext();
  const [navigator, setNavigator] = useState<any>();
  const [categories, setCategories] = useState<any>([]);

  const { data, error } = useGetChiakiConfigQuery({
    variables: {
      storeId: storeContextValue.storeData!.storeId,
      userId: domainContextValue.domainData.shopOwnerId,
      key,
    },
    fetchPolicy: 'cache-and-network',
  });

  const [getListCategoryQuery, getListCategoryRes] =
    useGetListCategoryLazyQuery();

  useEffect(() => {
    if (error) {
      console.error('Could not load navigator data');
    }
    if (data) {
      if (Array.isArray(data?.chiakiConfig)) {
        const navigatorData = data?.chiakiConfig[0];
        try {
          if (navigatorData) {
            setNavigator(JSON.parse(navigatorData.value));
          }
        } catch (e) {
          console.error('Could not parse navigator data from chiaki config');
        }
      } else {
        console.error('Wrong data format navigator from chiaki config');
      }
    }
  }, [error, data]);

  useEffect(() => {
    if (navigator) {
      const ids = getListCategoryIdsFromSelections(navigator.selections);
      if (Array.isArray(ids) && ids.length > 0) {
        getListCategoryQuery({
          variables: {
            ids: {
              in: ids,
            },
          },
        });
      }
    }
  }, [navigator]);

  useEffect(() => {
    if (getListCategoryRes?.data?.categoryList) {
      setCategories(getListCategoryRes?.data?.categoryList);
    }
  }, [getListCategoryRes?.data?.categoryList]);

  return { state: { navigator, categories } };
};
