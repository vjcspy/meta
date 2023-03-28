import { withPriceFormat } from '@main/packages-web-storefront/src/modules/catalog/hoc/withPriceFormat';
import { useProductDetailBySkuQuery } from '@vjcspy/apollo/build/graphql/generated/_generated-hooks';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

export default combineHOC(withPriceFormat)(() => {
  console.log('TestProductSSRComponent');
  const { data } = useProductDetailBySkuQuery({
    ssr: true,
    variables: {
      sku: '2744LISU',
    },
  });

  return (
    <div>
      <pre>
        {JSON.stringify(
          data?.products?.items?.find(() => true),
          undefined,
          4
        )}
      </pre>
    </div>
  );
});
