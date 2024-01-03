'use client';

import IntraDaySpeedChart from '@modules/analysis/components/IntraDaySpeed/IntraDaySpeedChart';
import SymbolList from '@modules/analysis/components/SymbolList';
import withIntraDaySpeedData from '@modules/analysis/hoc/intra-day-speed/withIntraDaySpeedData';
import withMarketSymbolCategories from '@modules/analysis/hoc/withMarketSymbolCategories';
import { CommonValue } from '@modules/analysis/value/common.value';
import { combineHOC } from '@web/ui-extension/dist';
import { find } from 'lodash-es';
import { useMemo } from 'react';

export default combineHOC(
  withIntraDaySpeedData,
  withMarketSymbolCategories,
)((props) => {
  const symbols = useMemo(() => {
    const defaultCat = find(
      props.state?.marketCategories,
      (c) => c.key === CommonValue.DEFAULT_MARKET_SYMBOL_CAT,
    );

    const data = [CommonValue.VNINDEX_CODE, ...(defaultCat?.symbols ?? [])];

    return data;
  }, [props.state?.marketCategories]);

  return (
    <>
      <SymbolList symbols={symbols} toDate={true} timeRes={true} />
      <IntraDaySpeedChart intraDaySpeedData={props.state.intraDaySpeedData} />
    </>
  );
});
