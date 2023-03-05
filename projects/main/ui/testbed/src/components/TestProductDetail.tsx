import { useProductDetailBySkuQuery } from '@main/packages-web-apollo-schema-mgt';
import { useDebugRender } from '@web/base/dist/hook/useDebugRender';
import { pick } from 'lodash';

export default function TestProductDetail() {
  useDebugRender('TestProductDetail');
  const { data } = useProductDetailBySkuQuery({
    ssr: true,
    variables: {
      sku: '24-MB01',
    },
  });

  return (
    <div>
      <pre>
        {JSON.stringify(
          pick(
            data?.products?.items?.find(() => true),
            ['name', 'sku']
          ),
          undefined,
          4
        )}
      </pre>
    </div>
  );
}
