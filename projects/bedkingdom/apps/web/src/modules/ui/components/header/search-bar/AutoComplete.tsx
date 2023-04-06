import { withRouterWithStoreActions } from '@main/packages-web-storefront/src/modules/store/hoc/withRouterWithStoreActions';
import ROUTES from '@values/extendable/ROUTES';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback } from 'react';

const AutoComplete: React.FC<{
  message?: string;
  value?: string;
  categories?: any[];
  products?: any[];
  catLimit?: number;
  prodLimit?: number;
  valid: boolean;
  countProduct?: any;
}> = combineHOC(withRouterWithStoreActions)(
  // eslint-disable-next-line react/display-name
  (props) => {
    const { products, prodLimit = 10, valid, message, countProduct } = props;

    const go = useCallback((url: any) => {
      if (url) {
        RouterSingleton.push(url);
      }
    }, []);

    return (
      <div className="b-searchautocomplete__wrapper is_active">
        {valid && (
          <>
            <div className="b-searchautocomplete__index-title">
              <div className="flex items-center justify-between">
                <span>{message}</span>
                <span
                  className="b-searchautocomplete__close cursor-pointer"
                  onClick={() => {
                    props.setExpanded(false);
                    props.setValueInput('');
                  }}
                >
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    role="presentation"
                    className="icon icon-close"
                    viewBox="0 0 37 40"
                  >
                    <path d="M21.3 23l11-11c.8-.8.8-2 0-2.8-.8-.8-2-.8-2.8 0l-11 11-11-11c-.8-.8-2-.8-2.8 0-.8.8-.8 2 0 2.8l11 11-11 11c-.8.8-.8 2 0 2.8.4.4.9.6 1.4.6s1-.2 1.4-.6l11-11 11 11c.4.4.9.6 1.4.6s1-.2 1.4-.6c.8-.8.8-2 0-2.8l-11-11z" />
                  </svg>
                </span>
              </div>
            </div>
            {!props.loading && (
              <ul className="b-searchautocomplete__list">
                {Array.isArray(products) &&
                  products.slice(0, prodLimit).map((product) => {
                    return (
                      <li
                        className="b-searchautocomplete__item flex"
                        key={product?.uid}
                      >
                        <UiExtension
                          uiId="PRODUCT_ITEM_RESULT_SEARCH"
                          product={product}
                          go={go}
                        />
                      </li>
                    );
                  })}
              </ul>
            )}

            {!props.loading && countProduct > 0 && (
              <div
                className="b-searchautocomplete__index-title"
                onClick={() => {
                  go(`${ROUTES.r('CATALOG_SEARCH')}?q=${props.value}`);
                  props.setExpanded(false);
                }}
              >
                <div className="b-buttons__added flex cursor-pointer justify-center">
                  <span className="b-btn minus flex items-center justify-between">
                    Show all {countProduct} results
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    );
  }
);

export default AutoComplete;
