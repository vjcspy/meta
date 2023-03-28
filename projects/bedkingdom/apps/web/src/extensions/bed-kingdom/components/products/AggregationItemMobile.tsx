import { withProductsFiltersData } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsFiltersData';
import { withDefaultAttributeData } from '@vjcspy/r/build/modules/catalog/hoc/withDefaultAttributeData';
import { combineHOC, UiExtension } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';

const AggregationItemMobile = combineHOC(
  withDefaultAttributeData,
  withProductsFiltersData
)((props) => {
  const [showData, setShowData] = useState(false);
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
            closeFilter={props.closeFilter}
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
            closeFilter={props.closeFilter}
          />
        );
      }
    }
  }, [filter, props.attribute, props.aggregation]);

  return (
    <>
      <div className={clsx('b-filter-item  ', showData && 'active')}>
        <div
          className="b-filter-item__label"
          onClick={() => {
            setShowData(!showData);
          }}
        >
          <span>{props?.aggregation.label}</span>
          {showData ? (
            <i className="fa fa-angle-right" />
          ) : (
            <i className="fa fa-angle-down" />
          )}
        </div>
        <div className="b-filter-item__content"> {AttributeOptions} </div>
      </div>
    </>
  );
});

export default AggregationItemMobile;
