import { useAmLabelProductActions } from '@extensions/bed-kingdom/hook/product/useAmLabelProductActions';
import BED_KINGDOM_COMMON from '@extensions/bed-kingdom/values/BED_KINGDOM_COMMON';
import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useExtAdditionConfig } from '@modules/ui/hook/config/useExtAdditionConfig';
import { useGetHomePageCategoriesQuery } from '@vjcspy/apollo-bed-kingdom';
import { useEffect, useMemo, useState } from 'react';

export const useHomePageCategoryData = (props: any) => {
  const [productIds, setProductIds] = useState<any[]>([]);
  const categoryIds = useExtAdditionConfig('category_ids', props);

  const { amLabelProductActions } = useAmLabelProductActions();
  const arrCategoryIds = useMemo(
    () =>
      typeof categoryIds === 'string' ? categoryIds.split(',') : undefined,
    [categoryIds]
  );

  useEffect(() => {
    if (productIds) {
      amLabelProductActions(productIds);
    }
  }, [productIds]);

  const getHomePageCategoriesQuery = useGetHomePageCategoriesQuery({
    fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    variables: {
      filters: {
        ids: { in: props?.arrCategoryIds ?? arrCategoryIds },
      },
      pageSize: BED_KINGDOM_COMMON.DEFAULT_PAGE_SIZE_CATEGORY_HOME,
      currentPage: 1,
    },
  });

  useEffect(() => {
    if (getHomePageCategoriesQuery.error) {
      console.error('Could not load home page categories data');
    }
    if (
      getHomePageCategoriesQuery.data?.categories?.items &&
      Array.isArray(getHomePageCategoriesQuery.data?.categories?.items) &&
      getHomePageCategoriesQuery.data?.categories?.items.length > 0
    ) {
      const listId: any[] = [];
      getHomePageCategoriesQuery.data?.categories?.items.forEach(
        (item: any) => {
          if (item?.products) {
            item?.products?.items.forEach((it: any) => {
              listId.push(it?.id);
            });
          }
        }
      );
      setProductIds(listId);
    }
  }, [getHomePageCategoriesQuery.error, getHomePageCategoriesQuery.data]);

  return {
    state: {
      dataCategories: getHomePageCategoriesQuery?.data?.categories?.items || [],
    },
  };
};
