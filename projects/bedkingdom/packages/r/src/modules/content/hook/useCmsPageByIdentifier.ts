import { gotCmsPageData } from '@modules/content/store/banner/actions';
import { useGetCmsPageByIdentifierLazyQuery } from '@vjcspy/apollo';
import { useCallback, useEffect } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCmsPageByIdentifier = () => {
  const dispatch = useDispatch();

  const [getCmsPageInfoQuery, { data, error, loading }] =
    useGetCmsPageByIdentifierLazyQuery();

  const getCmsPageData = useCallback((identifier: any) => {
    getCmsPageInfoQuery({
      variables: {
        identifier: identifier,
      },
    });
  }, []);

  useEffect(() => {
    if (error) {
      console.warn('Could not get cms page information');
    }
    if (data) {
      dispatch(
        gotCmsPageData({
          cmsPage: data?.cmsPage,
        })
      );
    }
  }, [data, error]);

  return {
    state: { data, loading },
    actions: {
      getCmsPageData,
    },
  };
};
