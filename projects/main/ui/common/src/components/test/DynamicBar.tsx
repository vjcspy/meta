import { combineHOC } from '@web/ui-extension';
import { isDevelopment } from 'chitility/dist/util/environment';
import React from 'react';

if (isDevelopment()) {
  console.log('loaded DynamicBar');
}
const DynamicBar = combineHOC()(() => {
  return <>Dynamic Bar</>;
});

export default DynamicBar;
