import { withProductsAggregationActions } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsAggregationActions';
import { isAttributeFilterSelected } from '@vjcspy/r/build/modules/catalog/util/isAttributeFilterSelected';
import { combineHOC } from '@web/ui-extension';
import React, { useMemo } from 'react';

const AggregationMultiselect = combineHOC(withProductsAggregationActions)(
  (props) => {
    const Items = useMemo(() => {
      if (typeof props.aggregation !== 'object') {
        return null;
      }

      return props.aggregation.options.map((option: any) => {
        const isChecked = isAttributeFilterSelected(option.value, props.filter);
        return (
          <li
            className="ui-checkbox__label"
            key={option.value + '' + isChecked}
            onClick={() =>
              props.actions.toggleAggregationItem(
                props.aggregation['attribute_code'],
                option.value
              )
            }
          >
            <input
              type="checkbox"
              name={'aggregation_' + props.aggregation['attribute_code']}
              defaultChecked={isChecked}
              className="ui-checkbox__input"
            />
            <svg
              className="ui-icon ui-checkbox__icon"
              data-di-res-id="ff83228c-48204f48"
              data-di-rand="1603770848259"
            >
              <use href="#checkbox-checkmark">
                <svg id="checkbox-checkmark" viewBox="0 0 16 24">
                  <title>checkbox-checkmark</title>
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit="10"
                    strokeWidth="2"
                    d="M1 13l4 4L15 7"
                  />
                </svg>
              </use>
            </svg>
            <span className="ui-filter-item-value">
              {option.label}
              <span className="pl-2">({option['count']})</span>
            </span>
          </li>
        );
      });
    }, [props.aggregation]);

    return <>{Items}</>;
  }
);

export default AggregationMultiselect;
