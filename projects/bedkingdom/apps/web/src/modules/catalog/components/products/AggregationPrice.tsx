import Slider from '@mui/material/Slider';
import { withProductsAggregationActions } from '@vjcspy/r/build/modules/catalog/hoc/products/withProductsAggregationActions';
import { withRangPriceFilterData } from '@vjcspy/r/build/modules/catalog/hoc/withRangPriceFilterData';
import { combineHOC } from '@web/ui-extension';
import clsx from 'clsx';
import React, { useCallback, useEffect, useState } from 'react';

const AggregationPrice = combineHOC(
  withProductsAggregationActions,
  withRangPriceFilterData
)((props) => {
  const [defaultRangeValue, setDefaultRangeValue] = useState<{
    min: number;
    max: number;
  }>({ min: 0, max: 0 });
  const [changeRangeValue, setChangeRangeValue] = useState<number[]>([]);

  useEffect(() => {
    if (props?.filter?.data?.eq && props?.filter?.data?.eq.includes('_')) {
      const defaultValue = props?.filter?.data?.eq.split('_');
      if (defaultValue[0] && defaultValue[1]) {
        setChangeRangeValue([
          parseInt(defaultValue[0]),
          parseInt(defaultValue[1]),
        ]);
      }
    } else {
      if (props?.aggregation?.options.length > 0) {
        const defaultValue = [];
        const count = parseInt(props?.aggregation?.options.length) - 1;
        if (props?.aggregation?.options[0]?.value) {
          defaultValue.push(
            parseInt(props?.aggregation?.options[0]?.value.split('_')[0])
          );
        }
        if (props?.aggregation?.options[count]?.value) {
          defaultValue.push(
            parseInt(props?.aggregation?.options[count]?.value.split('_')[1])
          );
        }
        setChangeRangeValue(defaultValue);
      }
    }

    if (props.rangePriceFilters) {
      setDefaultRangeValue(props.rangePriceFilters);
    }
  }, []);
  const onChangeRangeSuccess = useCallback((val: any) => {
    let valuePrice = '';
    if (val && val[1]) {
      valuePrice = val[0] + '_' + val[1];
      props.actions.toggleAggregationItem(
        props.aggregation['attribute_code'],
        valuePrice
      );
    }
  }, []);

  return (
    <div className={clsx('filter-item dropdown-parent')}>
      <div className="list-filter-content price">
        {defaultRangeValue.max && changeRangeValue && (
          <Slider
            min={defaultRangeValue.min}
            max={defaultRangeValue.max}
            color="secondary"
            valueLabelDisplay="on"
            value={changeRangeValue}
            onChange={(event, value) => {
              // @ts-ignore
              setChangeRangeValue(value);
            }}
            onChangeCommitted={(event, value) => {
              onChangeRangeSuccess(value);
            }}
            valueLabelFormat={(value) =>
              `${Intl.NumberFormat('en-EN').format(value)}`
            }
          />
        )}
      </div>
    </div>
  );
});

export default AggregationPrice;
