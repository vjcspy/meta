import withSearchBar from '@extensions/bed-kingdom/hoc/header/SearchBar/withSearchBar';
import withSearchDataSuggest from '@extensions/bed-kingdom/hoc/header/SearchBar/withSearchDataSuggest';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const SearchBar = combineHOC(
  withSearchBar,
  withSearchDataSuggest
)((props) => {
  return (
    <div className="b-search relative w-3/4" ref={props?.containerRef}>
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
          loading={props.loading}
          setValueInput={props.setValueInput}
        />
      )}

      <UiExtension
        uiId="HEADER_SEARCH_BAR_SEARCH_FIELD"
        onChange={props.onChange}
        handleFocus={props.handleFocus}
        value={props.valueInput}
        setExpanded={props.setExpanded}
        setExpandedSuggest={props.setExpandedSuggest}
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
    </div>
  );
});

export default SearchBar;
