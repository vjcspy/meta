import { withAttributeData } from '@main/packages-web-storefront/src/modules/catalog/hoc/withAttributeData';
import { withStoreFilterActions } from '@main/packages-web-storefront/src/modules/catalog/hoc/withStoreFilterActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useMemo } from 'react';

const Filter = combineHOC(
  withAttributeData,
  withStoreFilterActions
)(
  React.memo((props) => {
    const createFilterElem = useCallback(
      (option: { value: string; label: any }) => (
        <div
          key={option.value}
          className="filter-option ui-filter_item"
          onClick={() =>
            props.actions?.removeFilterAction(props.filter.code, option.value)
          }
        >
          <span>
            <svg
              className="gl-icon"
              width="9"
              height="9"
              viewBox="0 0 9 9"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M8 1L1 8"
                stroke="#333333"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M1 1L8 8"
                stroke="#333333"
                strokeMiterlimit="10"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {option.label}
          </span>
        </div>
      ),
      []
    );

    const createPriceCpt = useCallback((prices: any) => {
      return (
        <>
          <UiExtension uiId="CURRENCY" price={prices[0]} /> -
          <UiExtension uiId="CURRENCY" price={prices[1]} />
        </>
      );
    }, []);

    const Label = useMemo(() => {
      if (
        !props.attribute ||
        !Array.isArray(props.attribute['attribute_options'])
      ) {
        return null;
      }

      if (props.filter.data.eq) {
        if (props.filter.code === 'price') {
          const prices = props.filter.data.eq.split('_');
          if (Array.isArray(prices) && prices.length === 2) {
            return createFilterElem({
              label: createPriceCpt(prices),
              value: props.filter.data.eq,
            });
          }
        }

        const option: any = props.attribute['attribute_options'].find(
          (value) => value?.value == props.filter.data.eq
        );

        if (option) {
          return createFilterElem(option);
        } else {
          console.error('Could not found filter data option', props.filter);
          return null;
        }
      } else if (props.filter.data.in) {
        const options = props.attribute['attribute_options'].filter(
          (value) => props.filter.data.in!.indexOf(value?.value) > -1
        );

        return <>{options.map((option: any) => createFilterElem(option))}</>;
      } else {
        console.error('filter data wrong format', props.filter);
        return null;
      }
    }, [props.attribute, props.filter]);

    return <>{Label}</>;
  })
);

export default Filter;
