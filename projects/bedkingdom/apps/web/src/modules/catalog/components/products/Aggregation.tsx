import { withProductsFiltersData } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsFiltersData';
import { withAttributeData } from '@vjcspy/r/build/modules/catalog/hoc/withAttributeData';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const Aggregation = combineHOC(
  withAttributeData,
  withProductsFiltersData
)((props) => {
  const filter = useMemo(() => {
    if (!props.attribute || !Array.isArray(props.filters)) {
      return null;
    }
    return props.filters.find(
      (f) => f.code === props.attribute?.attribute_code
    );
  }, [props.attribute, props.filters]);

  const AttributeOptions = useMemo(() => {
    if (!props.attribute) {
      return null;
    }

    // Kiểm tra xem có phải kiểu swatch ko?
    if (
      Array.isArray(props.attribute['swatches']) &&
      props.attribute['swatches'].length > 0
    ) {
      // @ts-ignore
      const swatchType = props.attribute.swatches[0]['type'];
      if (swatchType == 1) {
        return (
          <UiExtension
            uiId="PRODUCTS_AGGREGATION_SWATCH_VISUAL"
            attribute={props.attribute}
            filter={filter}
            aggregation={props.aggregation}
          />
        );
      } else if (swatchType == 0) {
        return (
          <UiExtension
            uiId="PRODUCTS_AGGREGATION_SWATCH_TEXT"
            attribute={props.attribute}
            filter={filter}
            aggregation={props.aggregation}
          />
        );
      } else {
        console.warn(
          "We still haven't implemented the url swatch type yet",
          props
        );
        return null;
      }
    } else {
      // Can be used only with catalog input type Yes/No, Dropdown, Multiple Select and Price.
      if (props.attribute.input_type === 'multiselect') {
        return (
          <UiExtension
            uiId="PRODUCTS_AGGREGATION_MULTISELECT"
            attribute={props.attribute}
            filter={filter}
            aggregation={props.aggregation}
          />
        );
      } else if (props.attribute.input_type === 'price') {
        return (
          <UiExtension
            uiId="PRODUCTS_AGGREGATION_PRICE"
            attribute={props.attribute}
            filter={filter}
            aggregation={props.aggregation}
          />
        );
      } else {
        return (
          <UiExtension
            uiId="PRODUCTS_AGGREGATION_SELECT"
            attribute={props.attribute}
            filter={filter}
            aggregation={props.aggregation}
          />
        );
      }
    }
  }, [filter, props.attribute, props.aggregation]);

  return (
    <div className="b-horizontal-filter">
      <div className="b-filter__title title">
        <span title="Size" className="gl-label gl-label--l ">
          {props.aggregation.label}
        </span>
        <svg className="gl-icon cursor-pointer">
          <use href="#arrow-down">
            <svg id="arrow-down" viewBox="0 0 16 24">
              <title>arrow-down</title>
              <path
                fill="none"
                stroke="currentColor"
                strokeMiterlimit={10}
                strokeWidth={2}
                d="M1.5 9L8 15.5 14.5 9"
              />
            </svg>
          </use>
        </svg>
      </div>
      <div className="b-filter__content">{AttributeOptions}</div>
    </div>
  );
});

export default Aggregation;
