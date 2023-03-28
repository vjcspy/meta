import { withBrandDetailContainer } from '@extensions/bed-kingdom/hoc/brand/withBrandDetailContainer';
import { combineHOC, useStackComponent } from '@web/ui-extension';
import React from 'react';

const BrandDetailContainer = combineHOC(withBrandDetailContainer)((props) => {
  const { Structures } = useStackComponent(props as any);
  return <>{!!props.state?.brandDetail && Structures}</>;
});

export default BrandDetailContainer;
