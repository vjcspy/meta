import { useAmLabelProductActions } from '@extensions/bed-kingdom/hook/product/useAmLabelProductActions';
import { useResolveProductFilterFromUrl } from '@modules/catalog/util/useResolveProductFilterFromUrl';
import {
  GetCatalogProductsQueryHookResult,
  ProductAttributeFilterInput,
  ProductAttributeSortInput,
  SortEnum,
} from '@vjcspy/apollo';
import {
  productsGotData,
  rangePriceFilterAction,
  removeSearchString,
  setPageFilterInfo,
  setSearchString,
} from '@vjcspy/r/build/modules/catalog/store/products/products.actions';
import {
  selectAggregations,
  selectPageFilterInfo,
  selectPageInfo,
  selectSearchString,
} from '@vjcspy/r/build/modules/catalog/store/products/products.selectors';
import { filtersToProductAttributeFilterInput } from '@vjcspy/r/build/modules/catalog/util/filtersToProductAttributeFilterInput';
import R_CATALOG from '@vjcspy/r/build/modules/catalog/values/extendable/R_CATALOG';
import debounce from 'lodash/debounce';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useBedKingdomProductsContainer = (
  productsQueryHook: (
    search: string,
    filter: ProductAttributeFilterInput,
    currentPage: number,
    pageSize: number,
    sort?: ProductAttributeSortInput
  ) => GetCatalogProductsQueryHookResult
) => {
  const { filters } = useResolveProductFilterFromUrl();
  const pageFilterInfo = useSelector(selectPageFilterInfo);
  const searchString = useSelector(selectSearchString);
  const aggregations = useSelector(selectAggregations);
  const pageInfo = useSelector(selectPageInfo);

  const { amLabelProductActions } = useAmLabelProductActions();

  const productsQuery = productsQueryHook(
    searchString ?? '',
    filtersToProductAttributeFilterInput(filters),
    pageFilterInfo.currentPage ?? 1,
    R_CATALOG.r('PRODUCTS_PAGE_SIZE'),
    pageFilterInfo.sort
  );

  useEffect(() => {
    if (productsQuery.error) {
      console.error('Could not load `products` data');
    }
  }, [productsQuery.error]);

  const refetchDebounceQuery = useMemo(
    () =>
      debounce(() => {
        if (searchString || filtersToProductAttributeFilterInput(filters)) {
          console.info('refresh products');
          productsQuery.refetch({
            search: searchString ?? '',
            currentPage: pageFilterInfo.currentPage ?? 1,
            filter: filtersToProductAttributeFilterInput(filters),
            pageSize: R_CATALOG.r('PRODUCTS_PAGE_SIZE'),
            sort:
              typeof searchString === 'string' && searchString !== ''
                ? {
                    relevance: SortEnum.Desc,
                  }
                : pageFilterInfo.sort,
          });
        }
      }, 100),
    [searchString, pageFilterInfo]
  );

  // trigger refetch
  useEffect(() => {
    refetchDebounceQuery();
  }, [searchString, pageFilterInfo]);

  /*
   * Khi filters thay đổi thì load lại từ page 1
   * */
  useEffect(() => {
    dispatch(
      setPageFilterInfo({
        pageFilterInfo: {
          sort: pageFilterInfo.sort,
          currentPage: 1,
        },
      })
    );
  }, [filters]);

  const dispatch = useDispatch();

  // save to store
  useEffect(() => {
    if (productsQuery?.data?.products) {
      dispatch(
        productsGotData({
          products: productsQuery.data.products?.items!,
          aggregations: productsQuery.data.products?.aggregations!,
          pageInfo: productsQuery.data.products?.page_info!,
          mergeWithExisting: true,
        })
      );
      if (
        productsQuery?.data?.products?.items?.length &&
        productsQuery?.data?.products?.items?.length > 0
      ) {
        const listId: any[] = [];
        productsQuery.data.products?.items.forEach((item: any) => {
          if (item?.id) {
            listId.push(item?.id);
          }
        });
        if (listId.length > 0) {
          amLabelProductActions(listId);
        }
      }
    }
  }, [productsQuery.data]);

  /*
   * Tránh việc scroll và dispatch liên tục load more page
   * */
  const loadMorePage = useMemo(() => {
    return debounce(() => {
      if (productsQuery.loading) {
        return;
      }
      if (
        pageInfo &&
        pageFilterInfo.currentPage &&
        pageInfo.total_pages &&
        pageInfo.total_pages > 0 &&
        pageFilterInfo.currentPage < pageInfo.total_pages
      ) {
        console.info('load more page...');
        dispatch(
          setPageFilterInfo({
            pageFilterInfo: {
              currentPage: pageFilterInfo.currentPage! + 1,
            },
          })
        );
      }
    }, 50);
  }, [pageFilterInfo, productsQuery.loading, pageInfo]);

  const loadMorePageButton = useCallback(() => {
    dispatch(
      setPageFilterInfo({
        pageFilterInfo: {
          currentPage: pageFilterInfo.currentPage! + 1,
        },
      })
    );
  }, [pageFilterInfo]);

  const isDone = useMemo(
    () =>
      (pageInfo && pageInfo?.total_pages === 0) ||
      (pageFilterInfo?.currentPage &&
        pageInfo?.total_pages &&
        pageFilterInfo.currentPage >= pageInfo.total_pages),
    [pageInfo, pageFilterInfo]
  );

  useEffect(() => {
    if (
      filters &&
      aggregations &&
      aggregations.length > 0 &&
      filters.filter((fi: any) => fi.code === 'price').length === 0
    ) {
      const aggregationPrice = aggregations.filter(
        (agg: any) => agg?.attribute_code === 'price'
      );

      if (
        aggregationPrice[0] &&
        aggregationPrice[0]?.options &&
        aggregationPrice[0]?.options.length > 0
      ) {
        const defaultValue = {
          min: 0,
          max: 0,
        };
        const count = parseInt(aggregationPrice[0]?.options.length) - 1;
        if (aggregationPrice[0].options[0]?.value) {
          defaultValue.min = parseInt(
            aggregationPrice[0]?.options[0]?.value.split('_')[0]
          );
        }
        if (aggregationPrice[0]?.options[count]?.value) {
          defaultValue.max = parseInt(
            aggregationPrice[0]?.options[count]?.value.split('_')[1]
          );
        }

        dispatch(rangePriceFilterAction({ data: defaultValue }));
      }
    }
  }, [filters, aggregations]);

  const setSearchStringAction = useCallback((searchString: string) => {
    dispatch(setSearchString({ searchString }));
  }, []);

  const removeSearchStringAction = useCallback(() => {
    dispatch(removeSearchString());
  }, []);

  return {
    products: productsQuery?.data?.products?.items,
    aggregations,
    isUpdatingProducts: productsQuery.loading,
    pageInfo,
    pageFilterInfo,
    loadMorePage,
    isDone,
    setSearchStringAction,
    removeSearchStringAction,
    loadingList: productsQuery.loading,
    // @ts-ignore
    richSnippets: productsQuery?.data?.products?.rich_snippets ?? null,
    loadMorePageButton,
  };
};
