import * as React from 'react';

const ProductListingItemBundle: React.FC<{ product: any }> = (props) => {
  return (
    <div>
      <div>Bundle Product</div>
      <div>{props.product.name}</div>
    </div>
  );
};

export default ProductListingItemBundle;
