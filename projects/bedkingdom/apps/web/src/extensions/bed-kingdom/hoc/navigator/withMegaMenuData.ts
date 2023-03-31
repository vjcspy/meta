import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useGetBedKingdomMegaMenuQuery } from '@vjcspy/apollo-bed-kingdom';
import { absoluteUrl } from '@web/base/dist/util/absoluteUrl';
import { createUiHOC } from '@web/ui-extension';
import { isDevelopment } from 'chitility/dist/util/environment';
import { useEffect } from 'react';

export default createUiHOC((props) => {
  const { data } = useGetBedKingdomMegaMenuQuery({
    fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    nextFetchPolicy: 'cache-first',
    variables: {
      menuId: props.megamenuId,
    },
  });

  useEffect(() => {
    // pre-render megamenu
    if (data?.getMenuItems && !isDevelopment()) {
      fetch('/api/prerender/megamenu', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          megamenu: data?.getMenuItems,
          origin: absoluteUrl().origin,
        }),
      });
    }
  }, [data?.getMenuItems]);

  return {
    state: {
      megamenu: data?.getMenuItems,
    },
  };
}, 'withMegaMenuData');
