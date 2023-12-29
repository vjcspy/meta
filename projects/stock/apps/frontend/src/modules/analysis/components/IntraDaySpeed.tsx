'use client';

import withIntraDaySpeedData from '@modules/analysis/hoc/intra-day-speed/withIntraDaySpeedData';
import { combineHOC } from '@web/ui-extension/dist';

export default combineHOC(withIntraDaySpeedData)((props) => {
  return <>Intraday speed</>;
});
