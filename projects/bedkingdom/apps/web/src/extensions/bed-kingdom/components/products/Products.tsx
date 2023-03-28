import { withBedKingdomProductsContainer } from '@extensions/bed-kingdom/hoc/products/withBedKingdomProductsContainer';
import ROUTES from '@values/extendable/ROUTES';
import {
  combineHOC,
  UiExtension,
  useExtensionForHook,
} from '@web/ui-extension';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

const Products = combineHOC(withBedKingdomProductsContainer)(
  React.memo((props) => {
    const { asPath, query } = useRouter();
    const ProductsStack = useExtensionForHook('products', props);

    useEffect(() => {
      if (asPath.includes(ROUTES.r('CATALOG_SEARCH'))) {
        if (query?.q && props?.setSearchStringAction) {
          props?.setSearchStringAction(query?.q.toString());
        }
      }
    }, [asPath]);

    console.debug('>>> Render Products', props?.products?.length);

    if (!props.products) {
      return <UiExtension uiId="LOADING_INDICATOR" global={true} />;
    }

    return (
      <>
        {ProductsStack}
        {query?.q &&
          asPath.includes(ROUTES.r('CATALOG_SEARCH')) &&
          props?.isDone === undefined && (
            <UiExtension uiId="INFINITE_SCROLL_LOADING" />
          )}
        <UiExtension
          uiId="PRODUCT_LISTING"
          products={props?.products}
          loadMorePage={props?.loadMorePage}
          isDone={props?.isDone}
          isLoading={props?.loadingList}
          pageInfo={props?.pageInfo}
          pageFilterInfo={props?.pageFilterInfo}
          loadMorePageButton={props?.loadMorePageButton}
        />
      </>
    );
  })
);

export default Products;
