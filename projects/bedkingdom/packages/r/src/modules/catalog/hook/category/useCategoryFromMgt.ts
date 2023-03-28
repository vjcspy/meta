import { useDomainContext } from '@modules/domain/context/domain';
import { useStoreContext } from '@modules/store/context/store';
import { useGetChiakiConfigQuery } from '@vjcspy/apollo';
import { useEffect, useState } from 'react';

import { useCategoryList } from './useCategoryList';

export const useCategoryFromMgt = (props: any) => {
  const domainContextValue = useDomainContext();
  const storeContextValue = useStoreContext();

  const [configCategory, setConfigCategory] = useState({
    navigatorLevel: 2,
    isShowNavigatorTab: false,
    rootCategory: null,
  });

  const { data, error } = useGetChiakiConfigQuery({
    variables: {
      storeId: storeContextValue.storeData!.storeId,
      userId: domainContextValue.domainData.shopOwnerId,
      key: 'APP_NAVIGATOR_CFG',
    },
  });

  useEffect(() => {
    if (error) {
      console.error(
        'could not get useGetChiakiConfigQuery with key: APP_NAVIGATOR_CFG'
      );
    }
    if (data) {
      if (Array.isArray(data?.chiakiConfig) && data?.chiakiConfig.length > 0) {
        const jsonData: any = data?.chiakiConfig[0];
        try {
          if (jsonData) {
            setConfigCategory(JSON.parse(jsonData.value));
          }
        } catch (e) {
          console.error(
            'Could not parse APP_NAVIGATOR_CFG data from chiaki config'
          );
        }
      } else {
        console.warn('Wrong data format APP_NAVIGATOR_CFG from chiaki config');
      }
    }
  }, [data, error]);

  const { state } = useCategoryList({
    categoryId: configCategory.rootCategory,
    ...props,
  });

  return {
    state: {
      configCategory,
      categoryList: state.categoryList,
    },
  };
};
