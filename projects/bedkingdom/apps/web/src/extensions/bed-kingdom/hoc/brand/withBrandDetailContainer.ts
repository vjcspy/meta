import { bedResolvedBrandDetail } from '@extensions/bed-kingdom/store/content/content.content.actions';
import { useDispatch } from '@main/packages-web-redux';
import { useGetBedkingdomBrandListQuery } from '@vjcspy/apollo-bed-kingdom';
import { createUiHOC } from '@web/ui-extension';
import { Registry } from 'chitility';
import { useRouter } from 'next/router';
import { useEffect, useMemo } from 'react';

export const withBrandDetailContainer = createUiHOC(() => {
  const { data } = useGetBedkingdomBrandListQuery();
  const router = useRouter();
  const dispatch = useDispatch();
  const brandDetail = useMemo(() => {
    if (
      Array.isArray(data?.ambrandlist?.items) &&
      data!.ambrandlist!.items.length > 0
    ) {
      const _d = data!.ambrandlist!.items.find(
        (_b: any) =>
          typeof _b?.url === 'string' && router.asPath.indexOf(_b.url) > -1
      );
      if (_d) {
        Registry.getInstance().register('CATALOG_CATEGORY_ADDITION_FILTERS', [
          {
            code: 'manufacturer',
            data: {
              eq: _d?.brandId,
            },
          },
        ]);
      }

      return _d;
    }

    return null;
  }, [data, router.asPath]);

  useEffect(() => {
    dispatch(
      bedResolvedBrandDetail({
        brandDetail,
      })
    );
  }, [brandDetail]);

  return {
    state: { brandDetail },
  };
}, 'withBrandDetailContainer');
