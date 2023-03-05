import { combineHOC } from '@web/ui-extension';
import { isDevelopment } from 'chitility/dist/util/environment';
import React from 'react';

if (isDevelopment()) {
  console.log('loaded DynamicFoo');
}
const DynamicFoo = combineHOC()(() => {
  return <>Dynamic Foo</>;
});

export default DynamicFoo;
