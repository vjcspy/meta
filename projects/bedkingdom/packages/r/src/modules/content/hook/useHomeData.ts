import { getCmsPageAfterAction } from '@modules/content/store/cmsPages/cmsPage.actions';
import { selectCmsPages } from '@modules/content/store/selectors';
import { useGetCmsPagesByUserLazyQuery } from '@vjcspy/apollo';
import isEmpty from 'lodash/isEmpty';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '@main/packages-web-redux';

export const useHomeData = () => {
  const cmsPages = useSelector(selectCmsPages);
  const dispatch = useDispatch();
  const [cmsPagesQuery, cmsPagesRes] = useGetCmsPagesByUserLazyQuery({
    fetchPolicy: 'cache-and-network',
  });

  useEffect(() => {
    if (isEmpty(cmsPages)) {
      cmsPagesQuery({
        variables: {
          userId: 'default',
        },
      });
    }
  }, [cmsPages]);

  useEffect(() => {
    if (cmsPagesRes.data?.cmsPagesByUser) {
      dispatch(
        getCmsPageAfterAction({
          cmsPages: cmsPagesRes.data.cmsPagesByUser,
        })
      );
    }
  }, [cmsPagesRes.error, cmsPagesRes.data]);

  return {
    state: {
      cmsPages,
    },
  };
};
