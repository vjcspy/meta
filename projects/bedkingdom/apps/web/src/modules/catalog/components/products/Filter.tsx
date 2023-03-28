import { withProductsFilterActions } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsFilterActions';
import { withAttributeData } from '@vjcspy/r/build/modules/catalog/hoc/withAttributeData';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

const FilterLabelPrice = (props: any) => {
  if (!Array.isArray(props.prices) || props.prices.length !== 2) {
    return null;
  }

  return (
    <>
      <div
        className="filter_item"
        onClick={() =>
          props?.removeFilterAction(
            props.filter.code,
            props.prices[0] + '_' + props.prices[1]
          )
        }
      >
        <div className="filter_item_wrap">
          <div className="item_inner">
            <svg className="gl-icon cursor-pointer">
              <use href="#cross-small">
                <svg id="cross-small" viewBox="0 0 14 24">
                  <title>cross-small</title>
                  <path
                    d="M13 6l-6 6 6 6M1 6l6 6-6 6"
                    fill="none"
                    stroke="currentColor"
                    strokeMiterlimit={10}
                    strokeWidth={2}
                  />
                </svg>
              </use>
            </svg>
            <span className="filter-name">
              <UiExtension uiId="CURRENCY" price={props.prices[0]} /> -
              <UiExtension uiId="CURRENCY" price={props.prices[1]} />
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const FilterLabelItem = (props: any) => {
  return (
    <div
      className="filter_item"
      onClick={() =>
        props?.removeFilterAction(props.filter.code, props.option.value)
      }
    >
      <div className="filter_item_wrap">
        <div className="item_inner">
          <svg className="gl-icon cursor-pointer">
            <use href="#cross-small">
              <svg id="cross-small" viewBox="0 0 14 24">
                <title>cross-small</title>
                <path
                  d="M13 6l-6 6 6 6M1 6l6 6-6 6"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit={10}
                  strokeWidth={2}
                />
              </svg>
            </use>
          </svg>
          <span className="filter-name">{props?.option?.label}</span>
        </div>
      </div>
    </div>
  );
};

const FilterLabel = React.memo<{
  filter: any;
  attribute: any;
  removeFilterAction: (code: string, value: string) => void;
}>((props) => {
  const Label = useMemo(() => {
    if (props?.attribute) {
      if (Array.isArray(props?.filter?.data?.in)) {
        // TODO: bedkingdom chưa có kiểu multiple select, cần làm sau
        console.warn('Please implement multiple select attribute');
      } else if (props?.filter?.data?.eq) {
        if (props.filter.code === 'price') {
          const prices = props.filter.data.eq.split('_');
          if (Array.isArray(prices) && prices.length === 2) {
            return (
              <FilterLabelPrice
                prices={prices}
                filter={props.filter}
                removeFilterAction={props?.removeFilterAction}
              />
            );
          }
        } else {
          const option = props.attribute['attribute_options'].find(
            (value: any) => value['value'] == props.filter.data.eq
          );

          if (option) {
            return (
              <FilterLabelItem
                option={option}
                filter={props.filter}
                removeFilterAction={props?.removeFilterAction}
              />
            );
          }
        }
      }
    }

    return null;
  }, [props?.attribute]);
  return <>{Label}</>;
});

const Filter = combineHOC(
  withAttributeData,
  withProductsFilterActions
)((props) => {
  return (
    <FilterLabel
      filter={props?.filter}
      attribute={props.attribute}
      removeFilterAction={props?.actions?.removeFilterAction}
    />
  );
});

export default Filter;
