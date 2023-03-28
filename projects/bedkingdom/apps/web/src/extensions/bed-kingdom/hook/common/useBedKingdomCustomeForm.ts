import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import {
  useAmCustomFormSubmitMutation,
  useCustomformLazyQuery,
} from '@vjcspy/apollo-bed-kingdom';
import { useCallback, useEffect, useState } from 'react';

export const useBedKingdomCustomeForm = () => {
  const [statusLoading, setStatusLoading] = useState(false);
  const [customFormData, setCustomFormData] = useState<any>({});

  const [customFormQuery, customFormRes] = useCustomformLazyQuery();

  const [amCustomFormSubmitMutation, amCustomFormSubmitRes] =
    useAmCustomFormSubmitMutation();

  const getCustomForm = useCallback((formId: any) => {
    setStatusLoading(true);
    customFormQuery({
      variables: {
        formId,
      },
    });
  }, []);

  const amCustomFormSubmit = useCallback((formData: string) => {
    setStatusLoading(true);
    amCustomFormSubmitMutation({
      variables: {
        form_data: formData,
      },
    }).catch(() => {});
  }, []);

  useEffect(() => {
    if (customFormRes.data?.customform) {
      setStatusLoading(false);
      setCustomFormData(customFormRes.data?.customform);
    }

    if (customFormRes.error) {
      // AlertService.error('Unable to submit contact, please try again.');
      setStatusLoading(false);
    }
  }, [customFormRes.data, customFormRes.error]);

  useEffect(() => {
    if (amCustomFormSubmitRes.data?.amCustomFormSubmit) {
      if (amCustomFormSubmitRes.data?.amCustomFormSubmit?.status === 200) {
        AlertService.success(
          customFormData?.customFormData?.success_message ||
            "Thanks for contacting us with your comments and questions. We'll respond to you very soon."
        );
      } else {
        AlertService.error('Unable to submit contact, please try again.');
      }
      setStatusLoading(false);
    }

    if (amCustomFormSubmitRes.error) {
      AlertService.error('Unable to submit contact, please try again.');
      setStatusLoading(false);
    }
  }, [amCustomFormSubmitRes.data, amCustomFormSubmitRes.error]);

  return {
    actions: {
      amCustomFormSubmit,
      getCustomForm,
    },
    state: {
      statusLoading,
      customFormData,
    },
  };
};
