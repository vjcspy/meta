import COMMON from '@values/extendable/COMMON';
import { useGetChiakiConfigQuery } from '@vjcspy/apollo';
import { useMemo } from 'react';

export const useWebUiConfig = () => {
  const { data } = useGetChiakiConfigQuery({
    fetchPolicy: 'cache-and-network',
    variables: {
      storeId: 'default',
      userId: 'default',
      key: COMMON.r('CONFIG_PREFIX') + '_WEB_UI_CONFIG',
    },
  });

  const webUiConfig = useMemo(() => {
    if (data?.chiakiConfig) {
      if (
        Array.isArray(data?.chiakiConfig) &&
        data?.chiakiConfig.length === 1
      ) {
        const _config: any = data?.chiakiConfig[0];
        try {
          return JSON.parse(_config.value);
        } catch (e) {
          console.warn('could not parse web app ui config');
        }
      }
      return undefined;
    }
  }, [data]);

  return { state: { webUiConfig } };
};
