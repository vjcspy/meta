import { withAggregationActions } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withAggregationActions';
import { isAttributeFilterSelected } from '@main/packages-web-storefront/src/modules/catalog/util/isAttributeFilterSelected';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const AggregationSwatchVisual = combineHOC(withAggregationActions)(
  React.memo((props) => {
    return (
      <div className="ui-filter-options">
        {props.aggregation['options'].map((option: any) => {
          const swatch = props.attribute.swatches.find(
            (s: any) => s['option_id'] == option['value']
          );
          if (!swatch) {
            console.warn('Could not found swatch data for attribute', props);
            return null;
          }
          const isChecked = isAttributeFilterSelected(
            option.value,
            props.filter
          );
          return (
            <div
              className="ui-checkbox__label swatch-grid"
              key={option['value']}
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
                style={{
                  backgroundSize: 'initial',
                  backgroundColor: swatch['value'],
                }}
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
            </div>
          );
        })}
      </div>
    );
  })
);

export default AggregationSwatchVisual;
