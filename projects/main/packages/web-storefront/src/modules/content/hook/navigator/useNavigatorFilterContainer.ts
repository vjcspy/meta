import { useGetFilterInputsQuery } from '@main/packages-web-apollo-schema-mgt/dist/graphql/generated/_generated-hooks';
import { useEffect } from 'react';

export const useNavigatorFilterContainer = () => {
  const filterInputsQuery = useGetFilterInputsQuery();

  useEffect(() => {
    if (filterInputsQuery.error) {
      console.error('Error fetching filter data.', filterInputsQuery.error);
    }
  }, [filterInputsQuery.error]);

  return {
    loading: filterInputsQuery.loading,
    data: filterInputsQuery.data,
  };
};
