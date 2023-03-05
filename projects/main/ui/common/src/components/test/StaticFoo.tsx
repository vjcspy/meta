import { combineHOC } from '@web/ui-extension';
import React from 'react';
import {isDevelopment} from "chitility/dist/util/environment";

if (isDevelopment()) {
  console.log('loaded StaticFoo');
}
const StaticFoo = combineHOC()(() => {
  return <>Static Foo</>;
});

export default StaticFoo;
