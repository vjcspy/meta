import {
  useGetChiakiConfigQuery,
  useGetListCategoryLazyQuery,
} from '@main/packages-web-apollo-schema-mgt/dist/graphql/generated/_generated-hooks';
import { json } from '@web/base/dist/util/json';
import { Registry } from 'chitility';
import debounce from 'lodash/debounce';
import first from 'lodash/first';
import size from 'lodash/size';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import { useDomainContext } from '../../../domain/context/domain';
import { useStoreContext } from '../../../store/context/store';
import { WEB_STOREFRONT_CONTENT_KEY } from '../../etc/key';
import { getListCategoryIdsFromSelections } from '../../util/getListCategoryIdsFromSelections';
import { useNavigatorData } from './useNavigatorData';

let initListCategory = false;

/**
 * Retrieve nav item base on config
 * @param props
 * @returns {{categories: Array<Maybe<{__typename?: "CategoryTree"} & Pick<CategoryTree, "id" | "name" | "url_key" | "url_path" | "children_count" | "path" | "image"> & {productImagePreview?: Maybe<{__typename?: "CategoryProducts"} & {items?: Maybe<Array<Maybe<({__typename?: "VirtualProduct"} & Pick<VirtualProduct, "id"> & {small_image?: Maybe<{__typename?: "ProductImage"} & Pick<ProductImage, "url">>}) | ({__typename?: "SimpleProduct"} & Pick<SimpleProduct, "id"> & {small_image?: Maybe<{__typename?: "ProductImage"} & Pick<ProductImage, "url">>}) | ({__typename?: "DownloadableProduct"} & Pick<DownloadableProduct, "id"> & {small_image?: Maybe<{__typename?: "ProductImage"} & Pick<ProductImage, "url">>}) | ({__typename?: "GiftCardProduct"} & Pick<GiftCardProduct, "id"> & {small_image?: Maybe<{__typename?: "ProductImage"} & Pick<ProductImage, "url">>}) | ({__typename?: "BundleProduct"} & Pick<BundleProduct, "id"> & {small_image?: Maybe<{__typename?: "ProductImage"} & Pick<ProductImage, "url">>}) | ({__typename?: "GroupedProduct"} & Pick<GroupedProduct, "id"> & {small_image?: Maybe<{__typename?: "ProductImage"} & Pick<ProductImage, "url">>}) | ({__typename?: "ConfigurableProduct"} & Pick<ConfigurableProduct, "id"> & {small_image?: Maybe<{__typename?: "ProductImage"} & Pick<ProductImage, "url">>})>>>}>}>> | null | undefined, loading: boolean, actions: {}}}
 */
export const useNavigatorContainer = () => {
  const domainContextValue = useDomainContext();
  const storeContextValue = useStoreContext();
  const navigatorDataQuery = useGetChiakiConfigQuery({
    variables: {
      storeId: storeContextValue.storeData?.storeId,
      userId: domainContextValue.domainData.shopOwnerId,
      key: 'WEB_NAVIGATOR',
    },
  });

  const [getListCategoryQuery, getListCategoryRes] =
    useGetListCategoryLazyQuery();

  const navigatorStore = useNavigatorData();

  useEffect(() => {
    if (navigatorDataQuery.error) {
      console.error('Could not load navigator data');
    }
  }, [navigatorDataQuery.error]);

  /*
   * @warning: Bắt buộc phải lấy được giá trị ra và trả về chứ không update vào  store rồi lấy.
   * Nếu update vào store thì bắt buộc phải qua effects -> Client sẽ không lấy được giá trị, như thế SSR không có tác dụng gì
   * */
  const selections = useMemo(() => {
    if (
      navigatorDataQuery.data &&
      size(navigatorDataQuery.data?.chiakiConfig) > 0
    ) {
      let data: any = first(navigatorDataQuery.data.chiakiConfig);
      data = json.unserialize(data?.value);

      if (data && data['selections']) {
        return data['selections'];
      } else {
        console.error('could not serialize nav data');
        return [];
      }
    }
  }, [navigatorDataQuery.data]);

  useEffect(() => {
    navigatorStore.actions.navigatorGotDataAction(selections);

    if (!initListCategory) {
      const ids = getListCategoryIdsFromSelections(selections);
      if (Array.isArray(ids) && ids.length > 0) {
        getListCategoryQuery({
          variables: {
            ids: {
              in: ids,
            },
          },
        });
      }
      initListCategory = true;
    }
  }, [selections]);

  useEffect(() => {
    if (getListCategoryRes?.data?.categoryList) {
      Registry.getInstance().register(
        WEB_STOREFRONT_CONTENT_KEY.NAV_LIST_CATEGORY_KEY,
        getListCategoryRes?.data?.categoryList
      );
    }
  }, [getListCategoryRes?.data?.categoryList]);

  const updateMouseState = useRef(
    debounce((state: boolean) => {
      navigatorStore.actions.updateMouseLocation('navigator-container', state);
    }, 50)
  );

  const whenMouseLeave = useCallback(() => {
    updateMouseState.current(false);
  }, []);

  const whenMouseEnter = useCallback(() => {
    updateMouseState.current(true);
  }, []);

  return {
    whenMouseLeave,
    whenMouseEnter,
    state: {
      selections: selections,
      isMouseInside: navigatorStore.state.mouseState,
    },
    actions: {
      updateMouseLocation: navigatorStore.actions.updateMouseLocation,
      activateNav: navigatorStore.actions.activateNav,
    },
  };
};
