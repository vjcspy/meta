import { gotCmsPageData } from '@modules/content/store/banner/actions';
import { useGetCmsPageLazyQuery } from '@vjcspy/apollo';
import { useCallback, useEffect } from 'react';
import { useDispatch } from '@main/packages-web-redux';

export const useCmsPage = () => {
  const dispatch = useDispatch();

  const [getCmsPageInfoQuery, { data, error, loading }] =
    useGetCmsPageLazyQuery();

  const getCmsPageData = useCallback((id: any) => {
    getCmsPageInfoQuery({
      variables: {
        id: id,
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
