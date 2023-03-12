import { withStoreFilterActions } from '@main/packages-web-storefront/src/modules/catalog/hoc/withStoreFilterActions';
import { withStoreFiltersData } from '@main/packages-web-storefront/src/modules/catalog/hoc/withStoreFiltersData';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const Filters = combineHOC(
  withStoreFiltersData,
  withStoreFilterActions
)(
  React.memo((props) => {
    if (!Array.isArray(props.filters)) {
      return null;
    }

    return (
      <div className="ui-selected_filters">
        {props.filters.map((filter) => (
          <UiExtension
            key={filter.code}
            attributeCode={filter.code}
            uiId="PRODUCTS_FILTER"
            filter={filter}
          />
        ))}
        {props.filters.length > 0 && (
          <div className="ui-filter_Clear" onClick={props.actions.clearFilters}>
            <span>Bỏ lọc</span>
          </div>
        )}
      </div>
    );
  })
);

export default Filters;
