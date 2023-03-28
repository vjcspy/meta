import { useStoreContext } from '@modules/store/context/store';
import { StoreConfig, useUiStoreConfigDataLazyQuery } from '@vjcspy/apollo';
import { useEffect, useState } from 'react';

export const useUiConfigData = () => {
  const storeContextValue = useStoreContext();
  const [uiConfigRequest, uiConfigRes] = useUiStoreConfigDataLazyQuery({
    fetchPolicy: 'cache-first',
  });

  const [uiConfig, setUiConfig] = useState<StoreConfig>();

  useEffect(() => {
    uiConfigRequest();
  }, [storeContextValue.storeData?.storeId]);

  useEffect(() => {
    if (uiConfigRes.data?.storeConfig) {
      // @ts-ignore
      setUiConfig(uiConfigRes.data.storeConfig);
    }
  }, [uiConfigRes.data]);

  return {
    state: {
      uiConfig,
    },
  };
};
