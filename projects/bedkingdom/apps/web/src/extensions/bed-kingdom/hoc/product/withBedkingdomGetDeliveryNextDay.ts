import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import {
  useCalculateDeliveryNextDayLazyQuery,
  useCustomAttributeMetadataLazyQuery,
} from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { useCallback, useEffect, useState } from 'react';

export const withBedkingdomGetDeliveryNextDay = createUiHOC((props) => {
  const [dataDeliveryNextDay, setDataDeliveryNextDay] = useState<any>({});
  const [attributeCustom, setAttributeCustom] = useState<any[]>([]);
  const [calculateDeliveryNextDayQuery, calculateDeliveryNextDayRes] =
    useCalculateDeliveryNextDayLazyQuery({
      fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    });
  const [customAttributeMetadataQuery, customAttributeMetadataRes] =
    useCustomAttributeMetadataLazyQuery({
      fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    });

  const calculateDeliveryNextDay = useCallback(() => {
    if (props?.state?.product?.id) {
      calculateDeliveryNextDayQuery({
        variables: {
          productId: props?.state?.product?.id,
        },
      });
    }
  }, [props?.state?.product?.id]);

  const customAttributeMetadata = useCallback(() => {
    customAttributeMetadataQuery({
      variables: {
        attributes: [
          {
            attribute_code: 'delivery',
            entity_type: 'catalog_product',
          },
          {
            attribute_code: 'manufacturer',
            entity_type: 'catalog_product',
          },
        ],
      },
    });
  }, []);

  useEffect(() => {
    if (calculateDeliveryNextDayRes.error) {
      console.error('Could not load calculateDeliveryNextDay Product data');
    }
    if (calculateDeliveryNextDayRes.data?.calculateDeliveryNextDay) {
      setDataDeliveryNextDay(
        calculateDeliveryNextDayRes.data?.calculateDeliveryNextDay
      );
    }
  }, [calculateDeliveryNextDayRes.error, calculateDeliveryNextDayRes.data]);

  useEffect(() => {
    if (customAttributeMetadataRes.error) {
      console.error('Could not load customAttributeMetadataRes Product data');
    }
    if (customAttributeMetadataRes.data?.customAttributeMetadata?.items) {
      setAttributeCustom(
        customAttributeMetadataRes.data?.customAttributeMetadata?.items
      );
    }
  }, [customAttributeMetadataRes.error, customAttributeMetadataRes.data]);

  return {
    state: {
      dataDeliveryNextDay: dataDeliveryNextDay || {},
      attributeCustom: attributeCustom || [],
    },
    actions: {
      calculateDeliveryNextDay,
      customAttributeMetadata,
    },
  };
}, 'withBedkingdomGetDeliveryNextDay');
