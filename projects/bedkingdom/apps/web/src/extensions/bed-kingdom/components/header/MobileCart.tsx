import withMegaMenuData from '@extensions/bed-kingdom/hoc/navigator/withMegaMenuData';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const MobileCart = combineHOC(withMegaMenuData)(() => {
  return <></>;
});

export default MobileCart;
