import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useGetTopSearchesLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { useEffect } from 'react';

export const useGetDataSuggest = () => {
  const [getTopSearchesQuery, getTopSearchesRes] = useGetTopSearchesLazyQuery({
    fetchPolicy: FetchPolicyResolve.withLifetime('useGetTopSearchesLazyQuery'),
    nextFetchPolicy: 'cache-first',
  });

  useEffect(() => {
    getTopSearchesQuery();
  }, []);

  useEffect(() => {
    if (getTopSearchesRes.error) {
      console.error('Could not load get Top Searches data');
    }
  }, [getTopSearchesRes.error]);

  return {
    state: {
      topSearchesRes: getTopSearchesRes?.data?.getTopSearches,
    },
  };
};
