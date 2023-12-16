'use client';

import AnalysisSymbolTable from '@modules/analysis/components/AnalysisSymbolTable';
import MarketTickIntraDayTable from '@modules/analysis/components/MarketTickIntraDayTable';
import MarketTickRangeChart from '@modules/analysis/components/MarketTickRange/MarketTickRangeChart';
import MarketTickRangeConfig from '@modules/analysis/components/MarketTickRange/MarketTickRangeConfig';
import { withThemState } from '@modules/app/hoc/withThemState';
import { combineHOC } from '@web/ui-extension';
import { ConfigProvider, theme } from 'antd';

export default combineHOC(withThemState)((props) => {
  return (
    <>
      <ConfigProvider
        theme={{
          components: {
            // Table: {
            //   colorBgBase: 'transparent',
            //   colorTextBase: 'white',
            // },
          },
          algorithm: props.state.themeState.isDarkMode
            ? theme.darkAlgorithm
            : theme.defaultAlgorithm,
          token: { fontSize: 13 },
        }}
      >
        <AnalysisSymbolTable adjustMarketCat={true} />
        <MarketTickIntraDayTable />
        <MarketTickRangeConfig />
        <MarketTickRangeChart />
      </ConfigProvider>
    </>
  );
});
