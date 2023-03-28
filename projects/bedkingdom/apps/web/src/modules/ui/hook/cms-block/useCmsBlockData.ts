import { useExtAdditionConfig } from '@modules/ui/hook/config/useExtAdditionConfig';
import { useCmsBlocksLazyQuery } from '@vjcspy/apollo';
import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import isArray from 'lodash';
import { useEffect } from 'react';

export const useCmsBlockData = (props: any) => {
  const cmsBlockId = useExtAdditionConfig('cms_block_id', props);

  const arrCmsBlockIds = cmsBlockId ? cmsBlockId.split(',') : [];
  const [getCmsBlockQuery, getCmsBlockRes] = useCmsBlocksLazyQuery({
    fetchPolicy: FetchPolicyResolve.withLifetime('getHomePageCategoriesQuery'),
    nextFetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (isArray(arrCmsBlockIds) && arrCmsBlockIds.length > 0) {
      getCmsBlockQuery({
        variables: {
          identifiers: arrCmsBlockIds,
        },
      });
    }
  }, []);

  useEffect(() => {
    if (getCmsBlockRes.error) {
      console.error('Could not load home page categories data');
    }
  }, [getCmsBlockRes.error]);

  return {
    state: {
      cmsBlocks: getCmsBlockRes?.data?.cmsBlocks?.items || [],
    },
  };
};
