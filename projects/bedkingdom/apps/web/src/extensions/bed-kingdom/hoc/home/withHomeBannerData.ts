import { FetchPolicyResolve } from '@main/packages-web-apollo/dist/util/fetch-policy-resolve';
import { useGetBedKingdomHomeBannerQuery } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';

export const withHomeBannerData = createUiHOC((props: any) => {
  const { data } = useGetBedKingdomHomeBannerQuery({
    fetchPolicy: FetchPolicyResolve.NO_CACHE,
    variables: {
      sliderId: parseInt(props?.sliderId) ?? 1,
    },
  });

  return {
    state: {
      bannerConfig: data?.getBannerHomepage,
    },
  };
}, 'withHomeBannerData');
