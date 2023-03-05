import { combineHOC } from '@web/ui-extension';
import React from 'react';

const Info = combineHOC()(() => {
  return <>Info</>;
});

export default Info;
