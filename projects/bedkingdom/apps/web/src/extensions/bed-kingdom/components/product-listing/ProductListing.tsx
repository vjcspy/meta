import { withBedChangeTypeListActions } from '@extensions/bed-kingdom/hoc/products/withBedChangeTypeListActions';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React from 'react';

const ProductListing = combineHOC(withBedChangeTypeListActions)(
  React.memo((props) => {
    return (
      <div className="container mx-auto md:px-4">
        {props.selectedType === 'list' ? (
          <UiExtension
            uiId="PRODUCT_LISTING_LIST"
            products={props?.products}
            loadMorePage={props?.loadMorePage}
            loadMorePageButton={props?.loadMorePageButton}
            isDone={props?.isDone}
            isLoading={props?.isLoading}
            pageInfo={props?.pageInfo}
            pageFilterInfo={props?.pageFilterInfo}
          />
        ) : (
          <UiExtension
            uiId="PRODUCT_LISTING_GRID"
            products={props?.products}
            loadMorePage={props?.loadMorePage}
            loadMorePageButton={props?.loadMorePageButton}
            isDone={props?.isDone}
            isLoading={props?.isLoading}
            pageInfo={props?.pageInfo}
            pageFilterInfo={props?.pageFilterInfo}
          />
        )}
      </div>
    );
  })
);
export default ProductListing;
