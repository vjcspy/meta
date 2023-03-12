import { useTranslation } from '@main/packages-web-i18n';
import { withSearchBar } from '@main/packages-web-storefront/src/modules/content/hoc/searchbar/withSearchBar';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

export interface SearchBarProps {
  /**
   * Dựa vào open hay không mà class root sẽ dung là `root_open` hay `root`
   */
  isOpen: boolean;
  handleChange?: (value: string) => void;
  message?: string;
  categories?: any[];
  products?: any[];
  containerRef: any;
  expanded: boolean;
  handleFocus: any;
  onChange: any;
  valid: boolean;
  value: string;
}

export default combineHOC(withSearchBar)(function SearchBar(props) {
  const { t } = useTranslation(['common']);
  const rootClassName =
    'search-bar-root ' + props.isOpen
      ? 'search-bar-root-open'
      : 'search-bar-root-close';

  return (
    <div
      className={`${rootClassName} ${props.expanded ? ' is-openSearch ' : ''}`}
    >
      <div className="search-bar-container" ref={props.containerRef}>
        <form autoComplete="off" className="search-bar-form">
          {props.expanded && (
            <UiExtension
              uiId="HEADER_SEARCH_BAR_AUTO_COMPLETE"
              message={
                props.valid && props.message
                  ? props.message
                  : t('enter_keywords_to_search')
              }
              valid={props.valid}
              value={props.value}
              categories={props.categories}
              products={props.products}
            />
          )}

          <div className="search-bar-search">
            <UiExtension
              uiId="HEADER_SEARCH_BAR_SEARCH_FIELD"
              onChange={props.onChange}
              handleFocus={props.handleFocus}
            />
          </div>
        </form>
      </div>
    </div>
  );
});
