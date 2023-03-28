import { AlertService } from '@extensions/bed-kingdom/components/common/page-message/AlertService';
import { useContactSubmitMutation } from '@vjcspy/apollo-bed-kingdom';
import { useCallback, useEffect, useState } from 'react';

export const useBedKingdomContactActions = () => {
  const [contactSubmitMutation, contactSubmitRes] = useContactSubmitMutation();
  const [statusButton, setStatusButton] = useState(false);

  const contactSubmit = useCallback((formData: string) => {
    setStatusButton(true);
    contactSubmitMutation({
      variables: {
        form_data: formData,
      },
    });
  }, []);

  useEffect(() => {
    if (
      contactSubmitRes.data?.contactSubmit?.code &&
      contactSubmitRes.data?.contactSubmit?.code !== 'error'
    ) {
      AlertService.success(
        "Thanks for contacting us with your comments and questions. We'll respond to you very soon."
      );
      setStatusButton(false);
    }

    if (
      contactSubmitRes.data?.contactSubmit?.code &&
      contactSubmitRes.data?.contactSubmit?.code === 'error'
    ) {
      AlertService.error('Unable to submit contact, please try again.');
      setStatusButton(false);
    }

    if (contactSubmitRes.error) {
      AlertService.error('Unable to submit contact, please try again.');
      setStatusButton(false);
    }
  }, [contactSubmitRes.data, contactSubmitRes.error]);

  return {
    actions: {
      contactSubmit,
    },
    state: {
      statusButton,
    },
  };
};
