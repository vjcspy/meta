import * as React from 'react';

const ProductListingItemGrouped: React.FC<{ product: any }> = (props) => {
  return (
    <div>
      <div>Grouped Product</div>
      <div>{props.product.name}</div>
    </div>
  );
};

export default ProductListingItemGrouped;
