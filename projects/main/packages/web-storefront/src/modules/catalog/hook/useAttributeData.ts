import { useGetNavigatorAttributeFilterDataLazyQuery } from '@main/packages-web-apollo-schema-mgt/dist/graphql/generated/_generated-hooks';
import { useDispatch, useSelector } from '@main/packages-web-redux';
import first from 'lodash/first';
import size from 'lodash/size';
import { useEffect } from 'react';

import { productsGotAttribute } from '../store/products/products.actions';
import { selectAttribute } from '../store/products/products.selectors';

/**
 * Retrieve attribute data
 * @param attributeCode
 * @returns {{attribute: any}}
 */
export const useAttributeData = (attributeCode: string) => {
  const selectAttributeFn: any = useSelector(selectAttribute);
  const attributeInStore: any = selectAttributeFn(attributeCode);
  const dispatch = useDispatch();

  /*
   * IMPROVE PERFORMANCE/CODE QUALITY BY SAVE ATTRIBUTE TO STATE
   *
   * Lưu attribute data vào trong state -> query
   * Bởi vì sau khi query thì đã lưu attribute vào cache nên không cần thiết phải implement thêm cache ở đây
   * */
  const [attributeQuery, attributeRes] =
    useGetNavigatorAttributeFilterDataLazyQuery();

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
      size(attributeRes.data.customAttributeMetadata?.items) === 1
    ) {
      dispatch(
        productsGotAttribute({
          attribute: first(attributeRes.data!.customAttributeMetadata!.items),
        })
      );
    }
  }, [attributeRes.data]);

  return {
    attribute: attributeInStore,
  };
};
