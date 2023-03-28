import { useAmLabelProductActions } from '@extensions/bed-kingdom/hook/product/useAmLabelProductActions';
import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useSelector } from '@main/packages-web-redux';
import { useAmMostviewedGroupsLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { selectProduct } from '@vjcspy/r/build/modules/catalog/store/product/product.selectors';
import { useEffect, useState } from 'react';

export const useBedkingdomMostviewedGroups = (_props: any) => {
  const [productIds, setProductIds] = useState<any[]>([]);
  const [listMostViewed, setListMostViewed] = useState<any[]>([]);
  const product = useSelector(selectProduct);
  const [amMostviewedGroupsQuery, amMostviewedGroupsRes] =
    useAmMostviewedGroupsLazyQuery({
      fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    });

  const { amLabelProductActions } = useAmLabelProductActions();

  useEffect(() => {
    if (productIds) {
      amLabelProductActions(productIds);
    }
  }, [productIds]);

  useEffect(() => {
    if (product?.uid) {
      amMostviewedGroupsQuery({
        variables: {
          id: product?.uid,
        },
      });
    }
  }, [product?.uid]);

  useEffect(() => {
    if (amMostviewedGroupsRes.error) {
      console.error('Could not load get Top Searches data');
    }
    if (
      amMostviewedGroupsRes?.data?.amMostviewedGroups?.items &&
      amMostviewedGroupsRes?.data?.amMostviewedGroups?.items.length > 0 &&
      amMostviewedGroupsRes?.data?.amMostviewedGroups?.items[0] &&
      amMostviewedGroupsRes?.data?.amMostviewedGroups?.items[0]?.items
    ) {
      setListMostViewed(
        amMostviewedGroupsRes?.data?.amMostviewedGroups?.items[0]?.items
      );
      const listId: any[] = [];
      amMostviewedGroupsRes?.data?.amMostviewedGroups?.items[0]?.items.forEach(
        (item: any) => {
          if (item?.products) {
            item?.products?.items.forEach((it: any) => {
              listId.push(it?.id);
            });
          }
        }
      );
      setProductIds(listId);
    }
  }, [amMostviewedGroupsRes.error, amMostviewedGroupsRes?.data]);

  return {
    state: {
      listMostViewed: listMostViewed,
    },
  };
};
