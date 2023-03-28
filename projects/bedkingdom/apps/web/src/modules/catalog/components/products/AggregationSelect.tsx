import { withProductsAggregationActions } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsAggregationActions';
import { isAttributeFilterSelected } from '@vjcspy/r/build/modules/catalog/util/isAttributeFilterSelected';
import { combineHOC } from '@web/ui-extension';
import React, { useMemo } from 'react';

const AggregationSelect = combineHOC(withProductsAggregationActions)(
  (props) => {
    const Items = useMemo(() => {
      if (
        typeof props.aggregation !== 'object' &&
        typeof props.attribute !== 'object'
      ) {
        return null;
      }

      return [...props.aggregation.options].reverse().map((option: any) => {
        const attribute = props.attribute.attribute_options.find(
          (a: any) => a['value'] == option['value']
        );

        const isChecked = isAttributeFilterSelected(option.value, props.filter);

        return (
          <li
            className="ui-checkbox__label"
            key={option.value + '-' + isChecked}
            onClick={() =>
              props.actions.toggleAggregationItem(
                props.aggregation['attribute_code'],
                option.value
              )
            }
          >
            <input
              type="radio"
              name={'aggregation_' + props.aggregation['attribute_code']}
              defaultChecked={isChecked}
              className="ui-checkbox__input"
            />
            <svg className="ui-icon ui-checkbox__icon">
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
              {attribute ? attribute['label'] : option.label}
              <span className="pl-2">({option['count']})</span>
            </span>
          </li>
        );
      });
    }, [props.aggregation, props.filter]);

    return <>{Items}</>;
  }
);

export default AggregationSelect;
