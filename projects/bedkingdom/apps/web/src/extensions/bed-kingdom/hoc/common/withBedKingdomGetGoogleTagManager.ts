import { useGetGoogleTagManagerLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withBedKingdomGetGoogleTagManager = createUiHOC(() => {
  const [getGoogleTagManagerQuery, getGoogleTagManagerRes] =
    useGetGoogleTagManagerLazyQuery({
      fetchPolicy: 'cache-and-network',
      nextFetchPolicy: 'cache-first',
    });

  useEffect(() => {
    getGoogleTagManagerQuery();
  }, []);

  return {
    state: {
      dataTagManager: getGoogleTagManagerRes?.data?.getGoogleTagManager || {},
    },
  };
}, 'withBedKingdomGetGoogleTagManager');
