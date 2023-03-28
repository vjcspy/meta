import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useGetBedProductMoreInformationLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withBedkingdomProductMoreInfoData = createUiHOC((props) => {
  const [getBedProductMoreInformationQuery, getBedProductMoreInformationRes] =
    useGetBedProductMoreInformationLazyQuery({
      fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    });

  useEffect(() => {
    if (props.state?.product?.id) {
      getBedProductMoreInformationQuery({
        variables: {
          productId: props.state?.product?.id,
        },
      });
    }
  }, [props.state?.product?.id]);

  useEffect(() => {
    if (getBedProductMoreInformationRes.error) {
      console.error('Could not load Product More Information data');
    }
  }, [getBedProductMoreInformationRes.error]);

  return {
    dataProductMoreInformation:
      getBedProductMoreInformationRes?.data?.getProductMoreInformation || [],
  };
}, 'withBedkingdomProductMoreInfoData');
