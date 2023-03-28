import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useGetBedProductAttachmentsLazyQuery } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { useEffect } from 'react';

export const withBedkingdomProductAttachmentData = createUiHOC((props) => {
  const [getBedProductAttachmentsQuery, getBedProductAttachmentsRes] =
    useGetBedProductAttachmentsLazyQuery({
      fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    });
  useEffect(() => {
    if (props.state?.product?.id) {
      getBedProductAttachmentsQuery({
        variables: {
          productId: props.state?.product?.id,
        },
      });
    }
  }, [props.state?.product?.id]);

  useEffect(() => {
    if (getBedProductAttachmentsRes.error) {
      console.error('Could not load Product Attachments data');
    }
  }, [getBedProductAttachmentsRes.error]);

  return {
    dataProductAttachment:
      getBedProductAttachmentsRes?.data?.getProductAttachments || [],
  };
}, 'withBedkingdomProductAttachmentData');
