import { bootstrap } from '@modules/bootstrap';
import { RouterSingleton } from '@web/base/dist/util/router-singleton';
import { UiExtension } from '@web/ui-extension';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

bootstrap();
const CheckoutCallback: NextPage = () => {
  const [resolved, setResolved] = useState(false);
  const router = useRouter();

  useEffect(() => {
    switch (router?.query?.return_type) {
      case 'checkout_success':
        const orderId = router.query?.order_id;
        if (orderId) {
          setResolved(true);
          RouterSingleton.push('/order-complete?order_number=' + orderId);
        }

        return;
    }
  }, [router.query]);

  return (
    <>
      {!resolved && (
        <UiExtension uiId="LOADING_INDICATOR" global={true} defaultMessage />
      )}
    </>
  );
};

export default CheckoutCallback;
