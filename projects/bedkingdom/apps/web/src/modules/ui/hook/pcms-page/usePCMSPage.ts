import { useGetCmsPageDetailByUserQuery } from '@vjcspy/apollo';
import { useDomainContext } from '@vjcspy/r/build/modules/domain/context/domain';
import { useEffect, useState } from 'react';

export const usePCMSPage = (urlKey: string) => {
  const domainContext = useDomainContext();

  const [page, setPageData] = useState<any>({
    content: `
    <div style="margin-top: 15px;font-size: 13px;margin-bottom: 5px">
    ${'not_yet_config_pcms_page'} 
    <strong style="color: darkred">${urlKey}</strong>
    </div>
    `,
  });

  const pcmsPageQuery = useGetCmsPageDetailByUserQuery({
    variables: {
      urlKey: urlKey,
      userId: domainContext.domainData.shopOwnerId,
    },
  });

  useEffect(() => {
    if (pcmsPageQuery.error) {
      console.warn('Fetch PCMS Page error', pcmsPageQuery.error);
    }
    if (pcmsPageQuery.data?.cmsPageByUser) {
      setPageData(pcmsPageQuery.data?.cmsPageByUser);
    }
  }, [pcmsPageQuery.error, pcmsPageQuery.data?.cmsPageByUser]);

  return {
    page,
  };
};
