import { useDispatch, useSelector } from '@main/packages-web-redux';
import { productsGotAttribute } from '@modules/catalog/store/products/products.actions';
import { selectAttribute } from '@modules/catalog/store/products/products.selectors';
import { useGetNavigatorAttributeFilterDataLazyQuery } from '@vjcspy/apollo';
import { useEffect } from 'react';

/**
 * Retrieve attribute data
 * @param attributeCode
 * @returns {{attribute: any}}
 */
export const useAttributeData = (
  attributeCode: string,
  queryHook = useGetNavigatorAttributeFilterDataLazyQuery
) => {
  const selectAttributeFn = useSelector(selectAttribute);
  // @ts-ignore
  const attributeInStore = selectAttributeFn(attributeCode);
  const dispatch = useDispatch();

  /*
   * IMPROVE PERFORMANCE/CODE QUALITY BY SAVE ATTRIBUTE TO STATE
   *
   * Lưu attribute data vào trong state -> query
   * Bởi vì sau khi query thì đã lưu attribute vào cache nên không cần thiết phải implement thêm cache ở đây
   * */
  const [attributeQuery, attributeRes] = queryHook({
    fetchPolicy: 'cache-first',
  });

  useEffect(() => {
    if (attributeCode) {
      if (!attributeInStore) {
        attributeQuery({
          variables: {
            code: attributeCode,
          },
        });
      }
    }
  }, [attributeCode]);

  useEffect(() => {
    if (
      attributeRes.data &&
      Array.isArray(attributeRes.data.customAttributeMetadata?.items) &&
      attributeRes.data.customAttributeMetadata?.items.length === 1
    ) {
      // @ts-ignore
      dispatch(
        productsGotAttribute({
          attribute: attributeRes.data!.customAttributeMetadata!.items[0],
        })
      );
    }
  }, [attributeRes.data]);

  return {
    attribute: attributeInStore,
  };
};
