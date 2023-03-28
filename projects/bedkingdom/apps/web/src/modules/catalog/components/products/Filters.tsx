import { withProductsFilterActions } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsFilterActions';
import { withProductsFiltersData } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsFiltersData';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const Filters: React.FC = combineHOC(
  withProductsFiltersData,
  withProductsFilterActions
)((props) => {
  if (!Array.isArray(props.filters)) {
    return null;
  }

  return (
    <>
      {props.filters.length > 0 && (
        <section className="b-content__listing container mx-auto md:px-4">
          <div className="b-category-info">
            <div className="selected-filters__container">
              <div className="selected_filters horizontal">
                {props.filters.map((filter) => (
                  <UiExtension
                    key={filter.code}
                    attributeCode={filter.code}
                    uiId="PRODUCTS_FILTER"
                    filter={filter}
                  />
                ))}

                {Array.isArray(props.filters) &&
                  props.filters?.filter(
                    (it: any) => it?.code !== 'landing_page_id'
                  ).length > 0 && (
                    <div
                      className="gl-link gl-body--s cursor-pointer"
                      onClick={props.actions.clearFilters}
                    >
                      <span>Clear All</span>
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
});

export default Filters;
