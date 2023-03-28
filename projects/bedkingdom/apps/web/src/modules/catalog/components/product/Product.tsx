import { withProductCategoryBaseOnUrl } from '@vjcspy/r/build/modules/catalog/hoc/product/withProductCategoryBaseOnUrl';
import { withProductContainer } from '@vjcspy/r/build/modules/catalog/hoc/product/withProductContainer';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const Product = combineHOC(
  withProductContainer,
  withProductCategoryBaseOnUrl
)((props) => {
  console.log(props);
  return <></>;
});

export default Product;
