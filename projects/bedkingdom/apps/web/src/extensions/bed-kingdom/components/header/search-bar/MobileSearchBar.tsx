import withSearchBar from '@extensions/bed-kingdom/hoc/header/SearchBar/withSearchBar';
import withSearchDataSuggest from '@extensions/bed-kingdom/hoc/header/SearchBar/withSearchDataSuggest';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const MobileSearchBar = combineHOC(
  withSearchBar,
  withSearchDataSuggest
)((props) => {
  return (
    <div
      className={`b-search ${props.activeSearchMobile && 'is-active'}`}
      ref={props.containerRef}
    >
      <UiExtension
        uiId="MOBILE_HEADER_SEARCH_BAR_SEARCH_FIELD"
        onChange={props.onChange}
        handleFocus={props.handleFocus}
        value={props.valueInput}
        setExpanded={props.setExpanded}
        setExpandedSuggest={props.setExpandedSuggest}
        setActiveSearchMobile={props.setActiveSearchMobile}
      />

      {props?.expandedSuggest && (
        <div className="b-searchautocomplete__wrapper is_active">
          <UiExtension
            uiId="HEADER_SEARCH_BAR_SUGGEST_TEXT"
            dataSuggest={props.state.topSearchesRes}
            onChange={props.onChange}
          />
        </div>
      )}

      {props.expanded && (
        <UiExtension
          uiId="HEADER_SEARCH_BAR_AUTO_COMPLETE"
          valid={props.valid}
          value={props.valueInput}
          message={props.message}
          categories={props.categories}
          products={props.products}
          countProduct={props.countProduct}
          setExpanded={props.setExpanded}
          setExpandedSuggest={props.setExpandedSuggest}
          loading={props.loading}
          setValueInput={props.setValueInput}
        />
      )}
    </div>
  );
});

export default MobileSearchBar;
