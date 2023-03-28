import { useGetBedKingdomAutocompleteResultsLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import debounce from 'lodash/debounce';
import { useCallback, useMemo, useState } from 'react';

export const useSearchBarContainer = () => {
  const [textSearch, setTextSearch] = useState('');
  const [runSearch, productResult] =
    useGetBedKingdomAutocompleteResultsLazyQuery({
      fetchPolicy: 'cache-and-network',
    });

  // Create a debounced function so we only search some delay after the last
  // keypress.
  const debouncedRunQuery = useMemo(
    () =>
      debounce((inputText) => {
        setTextSearch(inputText);
        runSearch({ variables: { inputText, pageSize: 10 } });
      }, 500),
    [runSearch]
  );

  const { data, error, loading } = productResult;

  // Handle results.
  const products =
    data && data.products && data.products.items ? data.products.items : [];
  const hasResult = products?.length > 0;
  const resultCount = data && data.products && data.products.total_count;
  const countProduct = data?.products?.total_count;
  let message = '';

  if (error) {
    message = 'An error occurred while fetching results.';
  } else if (loading) {
    message = 'Fetching results...';
  } else if (!!data && !resultCount) {
    message = `Sorry, nothing has been found for '${textSearch}'`;
  } else if (hasResult) {
    message = ` Popular Products (${resultCount}) `;
  }

  // navigate on submit
  // @ts-ignore
  const handleSubmit = useCallback(({ search_query }) => {
    if (search_query != null && search_query.trim().length > 0) {
      // push(`/search.html?query=${search_query}`);
    }
  }, []);

  return {
    products,
    loading,
    message,
    handleSubmit,
    countProduct,
    handleChange: (value: string) => debouncedRunQuery(value),
  };
};
