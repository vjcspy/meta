import {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
} from '@vjcspy/apollo';
import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useGetBedKingdomCatalogProductsQuery } from '@vjcspy/apollo-bed-kingdom';

export const useBedKingdomProductsQuery = (
  search: string,
  filter: ProductAttributeFilterInput,
  currentPage = 1,
  pageSize = 20,
  sort?: ProductAttributeSortInput
) => {
  return useGetBedKingdomCatalogProductsQuery({
    variables: {
      search,
      filter,
      sort,
      currentPage,
      pageSize,
    },
    fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    nextFetchPolicy: 'cache-first',
  });
};
