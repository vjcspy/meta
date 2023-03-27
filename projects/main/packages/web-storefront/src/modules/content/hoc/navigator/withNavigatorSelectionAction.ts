import { useGetListCategoryLazyQuery } from '@main/packages-web-apollo-schema-mgt/dist/graphql/generated/_generated-hooks';
import { useDispatch } from '@main/packages-web-redux';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { createUiHOC } from '@web/ui-extension';
import { Registry } from 'chitility';
import filter from 'lodash/filter';
import find from 'lodash/find';
import first from 'lodash/first';
import { useCallback, useEffect, useState } from 'react';

import { filtersToUrl } from '../../../router/util/filtersToUrl';
import { WEB_STOREFRONT_CONTENT_KEY } from '../../etc/key';
import { navigatorUpdateMouseState } from '../../store/navigator/navigator.actions';

export const withNavigatorSelectionAction = createUiHOC(() => {
  const dispatch = useDispatch();
  const [getListCategoryQuery, getListCategoryRes] =
    useGetListCategoryLazyQuery();

  const [action, setAction] = useState<any>();

  const handleAction = useCallback((action: any) => {
    if (!action) {
      return;
    }

    if (
      action?.type === 'catalog_category_view' &&
      Array.isArray(action?.data)
    ) {
      // lấy url rewrite của category
      const cF = find(action.data, (f) => f.code === 'category_id');
      if (cF && cF.data?.eq) {
        const listCat = Registry.getInstance().registry(
          WEB_STOREFRONT_CONTENT_KEY.NAV_LIST_CATEGORY_KEY
        );
        if (listCat) {
          const cat = find(listCat, (_c: any) => _c.id == cF.data?.eq);

          if (cat) {
            const url = cat['url_path'] + '.html';

            dispatch(
              navigatorUpdateMouseState({
                isMouseInside: false,
              })
            );

            return RouterSingleton.go(url);
          }
        } else {
          getListCategoryQuery({
            variables: {
              ids: {
                eq: cF.data?.eq,
              },
            },
          });
          setAction(action);

          return;
        }
      } else {
        console.warn(
          'Kiểm tra lại config nếu có type là catalog_category_view thì phải có category_id ở action.data'
        );
      }
    } else if (action?.type === 'link') {
      if (action?.data?.url) {
        return RouterSingleton.go(action?.data?.url);
      }
    } else if (action?.type === 'attribute_filter') {
      // Phải có category
      if (Array.isArray(action?.data.filters)) {
        const cat = find(
          action.data.filters,
          (f: any) => f?.code === 'category_id'
        );

        if (cat) {
          console.log('here');
          getListCategoryQuery({
            variables: {
              ids: {
                eq: cat.data?.eq,
              },
            },
          });
          setAction(action);

          return;
        } else {
          console.warn(
            'Cấu hình filter attribute thì phải có category ở action.data.filters'
          );
        }
      }
    } else if (!action?.type) {
      return;
    }

    RouterSingleton.go('');
  }, []);

  useEffect(() => {
    if (action && getListCategoryRes?.data?.categoryList) {
      const cat = first(getListCategoryRes?.data?.categoryList);
      if (cat && action?.type === 'catalog_category_view') {
        const url = cat['url_path'] + '.html';
        dispatch(
          navigatorUpdateMouseState({
            isMouseInside: false,
          })
        );
        RouterSingleton.go(url);
        setAction(false);
      } else if (cat && action?.type === 'attribute_filter') {
        const url = cat['url_path'] + '.html';

        const attribute = action['attribute'];
        const optionValue = action['optionValue'];
        if (attribute && optionValue) {
          const urlData = filtersToUrl([
            {
              code: attribute.attribute_code,
              data: {
                eq: optionValue,
              },
            },
            ...filter(action.filters, (f: any) => f.code !== 'category_id'),
          ]);

          dispatch(
            navigatorUpdateMouseState({
              isMouseInside: false,
            })
          );

          RouterSingleton.push(
            {
              pathname: `/${url}`,
              query: urlData.query,
            },
            undefined
          );
          setAction(false);
        }
      }
    }
  }, [action, getListCategoryRes?.data]);
  return {
    handleAction,
  };
}, 'withNavigatorSelectionAction');
