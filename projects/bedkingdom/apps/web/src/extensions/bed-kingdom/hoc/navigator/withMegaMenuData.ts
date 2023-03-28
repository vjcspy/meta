import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useGetBedKingdomMegaMenuQuery } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';

export default createUiHOC((props) => {
  const { data } = useGetBedKingdomMegaMenuQuery({
    fetchPolicy: FetchPolicyResolve.CACHE_AND_NETWORK,
    nextFetchPolicy: 'cache-first',
    variables: {
      menuId: props.megamenuId,
    },
  });

  return {
    state: {
      megamenu: data?.getMenuItems,
    },
  };
}, 'withMegaMenuData');
