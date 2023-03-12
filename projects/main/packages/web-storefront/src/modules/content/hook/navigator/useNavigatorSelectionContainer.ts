import { useGetNavigatorAttributeFilterDataLazyQuery } from '@main/packages-web-apollo-schema-mgt';
import { useEffect, useMemo } from 'react';

export const useNavigatorSelectionContainer = (selection: any) => {
  const [getAttributeFilterQuery, attributeFilerResponse] =
    useGetNavigatorAttributeFilterDataLazyQuery();

  useEffect(() => {
    if (
      selection['action'] &&
      selection['action']['type'] === 'attribute_filter'
    ) {
      const actionData = selection['action']['data'];

      if (actionData['code']) {
        getAttributeFilterQuery({
          variables: {
            code: actionData['code'],
          },
        });
      }
    }
  }, []);

  const selectionAdditionalData = useMemo(() => {
    if (attributeFilerResponse.error) {
      console.error('Fail to get attribute data for selection', selection);
    }

    return Array.isArray(
      attributeFilerResponse?.data?.customAttributeMetadata?.items
    )
      ? attributeFilerResponse?.data?.customAttributeMetadata?.items[0]
      : null;
  }, [attributeFilerResponse]);

  return {
    selectionAdditionalData,
  };
};
