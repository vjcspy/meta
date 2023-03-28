import { useSubscribeEmailToNewsletterMutation } from '@vjcspy/apollo';
import { createUiHOC } from '@web/ui-extension';
import { useCallback, useEffect, useState } from 'react';

export const withSubscriberNewsletterActions = createUiHOC(() => {
  const [statusButton, setStatusButton] = useState<boolean>(false);
  const [statusSubscriber, setStatusSubscriber] = useState<any>(null);
  const [subscribeEmailToNewsletterMutation, subscribeEmailToNewsletterRes] =
    useSubscribeEmailToNewsletterMutation({});

  const subscribeEmailToNewsletter = useCallback((email: string) => {
    setStatusButton(true);
    subscribeEmailToNewsletterMutation({
      variables: {
        email: email,
      },
    })
      .then()
      .catch((error) => {
        console.log('show error', error.message);
      });
  }, []);

  useEffect(() => {
    if (subscribeEmailToNewsletterRes.error) {
      setStatusButton(false);
      if (subscribeEmailToNewsletterRes.error.message) {
        setStatusSubscriber(subscribeEmailToNewsletterRes.error.message);
      }
    }

    if (subscribeEmailToNewsletterRes.data?.subscribeEmailToNewsletter) {
      setStatusButton(false);
      setStatusSubscriber('Your email subscribe success.');
    }
  }, [subscribeEmailToNewsletterRes.error, subscribeEmailToNewsletterRes.data]);

  return {
    actions: { subscribeEmailToNewsletter, setStatusSubscriber },
    states: { statusSubscriber: statusSubscriber, statusButton },
  };
}, 'withSubscriberNewsletterActions');
