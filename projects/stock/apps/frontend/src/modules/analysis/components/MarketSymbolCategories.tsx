import withMarketSymbolCategories from '@modules/analysis/hoc/withMarketSymbolCategories';
import { combineHOC } from '@web/ui-extension';
import { find } from 'lodash-es';
import { useEffect } from 'react';

export default combineHOC(withMarketSymbolCategories)((props) => {
  useEffect(() => {
    // TODO: Only support default market category
    if (Array.isArray(props.state?.marketCategories)) {
      const defaultCat = find(
        props.state?.marketCategories,
        (c) => c?.key === 'DEFAULT_MARKET_CAT_KEY',
      );

      if (defaultCat) {
        props?.actions?.selectMarketCat(defaultCat);
      }
    }
  }, [props.state?.marketCategories]);

  return <></>;
});
