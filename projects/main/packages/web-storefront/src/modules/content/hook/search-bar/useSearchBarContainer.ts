import { useGetAutocompleteResultsLazyQuery } from '@main/packages-web-apollo-schema-mgt';
import { useTranslation } from '@main/packages-web-i18n';
import debounce from 'lodash/debounce';
import { useCallback, useMemo } from 'react';

export const useSearchBarContainer = () => {
  const [runSearch, productResult] = useGetAutocompleteResultsLazyQuery({
    fetchPolicy: 'cache-and-network',
  });
  const { t } = useTranslation(['common']);

  // Create a debounced function so we only search some delay after the last
  // keypress.
  const debouncedRunQuery = useMemo(
    () =>
      debounce((inputText) => {
        console.debug('run search bar query');
        runSearch({ variables: { inputText, pageSize: 10 } });
      }, 500),
    [runSearch]
  );

  const { data, error, loading } = productResult;

  // Handle results.
  const products =
    data && data.products && data.products.items ? data.products.items : [];
  const filters: any = data && data?.products?.aggregations;
  const hasResult = products?.length > 0;
  const resultCount = data && data.products && data.products.total_count;
  let message = '';

  if (error) {
    message = 'An error occurred while fetching results.';
  } else if (loading) {
    message = 'Fetching results...';
  } else if (!!data && !resultCount) {
    message = 'No results were found.';
  } else if (hasResult) {
    message =
      `${resultCount} ` +
      (parseInt(resultCount + '') > 1 ? t('items') : t('item'));
  }

  // navigate on submit
  // @ts-ignore
  const handleSubmit = useCallback(({ search_query }) => {
    if (search_query != null && search_query.trim().length > 0) {
      // push(`/search.html?query=${search_query}`);
    }
  }, []);

  let categories = null;

  // find categories, but only if the component is going to render
  if (filters) {
    const categoryFilter =
      filters.find((filter: any) => filter.label === 'Category') || {};

    categories = categoryFilter.options || [];
  }

  return {
    categories,
    products,
    message,
    handleSubmit,
    handleChange: (value: string) => debouncedRunQuery(value),
  };
};
