'use client';

import { withThemState } from '@modules/app/hoc/withThemState';
import { combineHOC } from '@web/ui-extension/dist';
import { ConfigProvider, theme } from 'antd';

export default combineHOC(withThemState)((props) => {
  return (
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
      {props.children}
    </ConfigProvider>
  );
});
