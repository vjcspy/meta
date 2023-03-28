import { useGetBedkingdomStoreConfigLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withBedKingdomGetConfigData = createUiHOC(() => {
  const [getStoreConfigQuery, getStoreConfigRes] =
    useGetBedkingdomStoreConfigLazyQuery({
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    });

  useEffect(() => {
    getStoreConfigQuery();
  }, []);

  return {
    state: {
      storeConfigData: getStoreConfigRes?.data?.storeConfig || {},
    },
  };
}, 'withBedKingdomGetConfigData');
