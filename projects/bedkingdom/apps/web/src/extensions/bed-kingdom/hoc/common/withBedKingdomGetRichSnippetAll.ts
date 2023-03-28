import { useGetRichSnippetsLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { useCallback } from 'react';

export const withBedKingdomGetRichSnippetAll = createUiHOC(() => {
  const [getRichSnippetsQuery, getRichSnippetsRes] =
    useGetRichSnippetsLazyQuery({
      fetchPolicy: 'cache-and-network',
    });
  const getRichAllPage = useCallback(() => {
    getRichSnippetsQuery();
  }, []);

  return {
    actions: {
      getRichAllPage,
    },
    state: {
      datRichAllPage: getRichSnippetsRes?.data?.getRichSnippets || '',
    },
  };
}, 'withBedKingdomGetRichSnippetAll');
