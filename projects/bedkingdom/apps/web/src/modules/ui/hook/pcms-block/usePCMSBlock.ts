import { useGetCmsBlockDetailByUserQuery } from '@vjcspy/apollo';
import { useDomainContext } from '@vjcspy/r/build/modules/domain/context/domain';
import { useEffect, useState } from 'react';

export const usePCMSBlock = (identifier: string) => {
  const domainContext = useDomainContext();
  const [block, setBlockData] = useState<any>();
  useEffect(() => {
    setBlockData({
      content: `
    <div style="margin-top: 15px;font-size: 13px;margin-bottom: 5px">
    ${'not_yet_config_pcms_block'} 
    <strong style="color: darkred">${identifier}</strong>
    </div>
    `,
    });
  }, []);
  const pcmsBlockQuery = useGetCmsBlockDetailByUserQuery({
    variables: {
      identifier,
      userId: domainContext.domainData.shopOwnerId,
    },
  });

  useEffect(() => {
    if (pcmsBlockQuery.error) {
      // logger.warn('Fetch PCMS Block error', pcmsBlockQuery.error);
    }
    if (pcmsBlockQuery.data?.cmsBlockByUser) {
      setBlockData(pcmsBlockQuery.data?.cmsBlockByUser);
    }
  }, [pcmsBlockQuery.error, pcmsBlockQuery.data?.cmsBlockByUser]);

  return {
    block,
  };
};
