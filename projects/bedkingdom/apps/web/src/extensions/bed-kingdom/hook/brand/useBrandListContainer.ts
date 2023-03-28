import { useGetBedkingdomBrandListQuery } from '@vjcspy/apollo-bed-kingdom';
import { useUiConfigData } from '@vjcspy/r/build/modules/content/hook/useUiConfigData';
import { useCallback, useEffect, useMemo, useState } from 'react';

export const useBrandListContainer = () => {
  const { data, loading, refetch } = useGetBedkingdomBrandListQuery({
    fetchPolicy: 'cache-and-network',
  });

  // TODO: apollo error so we need manually call refetch
  useEffect(() => {
    refetch();
  }, []);

  const [filter, setFilter] = useState<any>({});
  const uiConfigData = useUiConfigData();
  const [searchString, setSearchString] = useState<any>('');

  const groupedBrands = useMemo(() => {
    if (Array.isArray(data?.ambrandlist?.items)) {
      return data?.ambrandlist?.items.reduce((pre, cur) => {
        const key = cur?.label?.charAt(0)?.toUpperCase();
        if (key) {
          if (
            typeof filter['char'] === 'string' &&
            key !== filter['char'] &&
            filter['char'] !== 'all'
          ) {
          } else {
            if (typeof pre[key] !== 'object') {
              pre[key] = [];
            }
            let curData = {
              ...cur,
              image:
                cur && cur['image']
                  ? `${uiConfigData?.state?.uiConfig?.secure_base_link_url}${cur['image']}`
                  : undefined,
            };
            pre[key].push(curData);
          }
        }
        return pre;
      }, {} as any);
    }
    return {};
  }, [
    data?.ambrandlist?.items,
    filter,
    uiConfigData?.state?.uiConfig?.secure_base_link_url,
  ]);

  const setCharacterFilter = useCallback((char: string) => {
    setFilter({
      char,
    });
  }, []);

  const searchResults = useMemo(() => {
    if (typeof searchString === 'string' && searchString !== '') {
      return data?.ambrandlist?.items?.filter(
        (brand) =>
          brand &&
          brand['label'] &&
          brand['label'].toLowerCase().indexOf(searchString.toLowerCase()) > -1
      );
    }

    return undefined;
  }, [searchString]);

  return {
    state: {
      brandListData: data?.ambrandlist,
      groupedBrands,
      filter,
      searchResults,
      searchString,
    },
    actions: { setCharacterFilter, setSearchString },
  };
};
