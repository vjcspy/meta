import { withAggregationActions } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withAggregationActions';
import { isAttributeFilterSelected } from '@main/packages-web-storefront/src/modules/catalog/util/isAttributeFilterSelected';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const AggregationSwatchText = combineHOC(withAggregationActions)(
  React.memo((props) => {
    return (
      <div className="ui-filter-options">
        {props.aggregation['options'].map((option: any) => {
          const swatch = props.attribute.swatches.find(
            (s: any) => s['option_id'] == option['value']
          );
          const isChecked = isAttributeFilterSelected(
            option.value,
            props.filter
          );
          if (swatch) {
            return (
              <div
                className="ui-checkbox__text"
                key={option['value']}
                onClick={() =>
                  props.actions.toggleAggregationItem(
                    props.aggregation['attribute_code'],
                    option.value
                  )
                }
              >
                <button
                  className={
                    isChecked ? 'swatch-options active' : 'swatch-options'
                  }
                  key={option.value}
                  value={option.value}
                  name={'aggregation_' + props.aggregation['attribute_code']}
                >
                  <span>{option.label}</span>
                </button>
              </div>
            );
          } else {
            console.warn('Could not found swatch data for attribute', props);
            return null;
          }
        })}
      </div>
    );
  })
);

export default AggregationSwatchText;
