import { useProductDetailBySkuQuery } from '@main/packages-web-apollo-schema-mgt/src/graphql/generated/_generated-hooks';

export default function TestProductDetail() {
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
          data?.products?.items?.find(() => true),
          undefined,
          4
        )}
      </pre>
    </div>
  );
}
