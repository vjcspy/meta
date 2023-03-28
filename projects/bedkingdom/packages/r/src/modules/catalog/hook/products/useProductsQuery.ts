import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import type {
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
} from '@vjcspy/apollo';
import { useGetCatalogProductsQuery } from '@vjcspy/apollo';

export const useProductsQuery: any = (
  search: string,
  filter: ProductAttributeFilterInput,
  currentPage = 1,
  pageSize = 20,
  sort?: ProductAttributeSortInput
) => {
  return useGetCatalogProductsQuery({
    variables: {
      search,
      filter,
      sort,
      currentPage,
      pageSize,
    },
    fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
  });
};
