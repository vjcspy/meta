import { combineHOC } from '@web/ui-extension';
import { isDevelopment } from 'chitility/dist/util/environment';
import React from 'react';

if (isDevelopment()) {
  console.log('loaded StaticBar');
}
const StaticBar = combineHOC()(() => {
  return <>Static Bar</>;
});

export default StaticBar;
