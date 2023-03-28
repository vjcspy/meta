import { setSearchString } from '@modules/catalog/store/products/products.actions';
import { selectSearchString } from '@modules/catalog/store/products/products.selectors';
import { useGetAutocompleteResultsLazyQuery } from '@vjcspy/apollo';
import throttle from 'lodash/throttle';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useSearchBarContainer = () => {
  const [runSearch, productResult] = useGetAutocompleteResultsLazyQuery();
  const dispatch = useDispatch();
  const searchString = useSelector(selectSearchString);

  // Create a debounced function so we only search some delay after the last keypress.
  const debouncedRunQuery = useMemo(
    () =>
      throttle(
        (inputText) => {
          console.log('run search bar query', inputText);
          runSearch({ variables: { inputText, pageSize: 10 } });
        },
        1000,
        {
          trailing: true,
        }
      ),
    []
  );

  useEffect(() => {
    if (typeof searchString === 'string' && searchString.length > 1) {
      debouncedRunQuery(searchString);
    }
  }, [searchString]);

  const handleChange = useCallback((searchString: string) => {
    dispatch(setSearchString({ searchString }));
  }, []);

  const { data, error, loading } = productResult;

  // Handle results.
  const products =
    data && data.products && data.products.items ? data.products.items : [];
  const filters: any = data && data?.products?.aggregations;
  const hasResult = products?.length > 0;
  const resultCount = data && data.products && data.products.total_count;
  let message = '';

  if (error) {
    message = 'an_error_occurred_while_fetching_results';
  } else if (loading) {
    message = 'fetching_results';
  } else if (!!data && !resultCount) {
    message = 'no_results_were_found';
  } else if (hasResult) {
    message = `${resultCount} `;
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
    searchString,
    categories,
    products,
    resultCount,
    loading,
    message,
    handleSubmit,
    handleChange: handleChange,
  };
};
