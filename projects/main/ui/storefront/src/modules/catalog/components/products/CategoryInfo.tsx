import { withCategoryData } from '@main/packages-web-storefront/src/modules/catalog/hoc/products/withCategoryData';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

export default combineHOC(withCategoryData)(function ProductsCategoryInfo(
  props
) {
  if (typeof props.category === 'undefined') {
    return null;
  }
  return (
    <div className="ui-category__name">
      <span>{props.category.name}</span>
    </div>
  );
});
