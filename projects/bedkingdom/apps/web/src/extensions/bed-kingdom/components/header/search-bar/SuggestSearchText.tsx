import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import ROUTES from '@values/extendable/ROUTES';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC } from '@web/ui-extension';
import isArray from 'lodash/isArray';
import React, { useCallback } from 'react';

const SuggestSearchText = combineHOC(withRouterWithStoreActions)(
  // eslint-disable-next-line react/display-name
  React.memo((props) => {
    // eslint-disable-next-line unused-imports/no-unused-vars
    const goToPage = useCallback((string: any) => {
      if (string) {
        RouterSingleton.push(`${ROUTES.r('CATALOG_SEARCH')}/?q=${string}`);
      }
    }, []);

    if (
      !props?.dataSuggest ||
      (!isArray(props?.dataSuggest) && props?.dataSuggest.length === 0)
    ) {
      return null;
    }
    return (
      <ul className="b-searchautocomplete__suggestText">
        {props?.dataSuggest.map((item: any) => (
          <li
            className="is_active"
            key={item?.query_id}
            onClick={() => {
              // goToPage(item?.query_text);
              props?.onChange(item?.query_text);
            }}
          >
            <div>{item?.query_text}</div>
          </li>
        ))}
      </ul>
    );
  })
);

export default SuggestSearchText;
