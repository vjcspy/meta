import withCmsBlockData from '@modules/ui/hoc/cms-block/withCmsBlockData';
import { combineHOC } from '@web/ui-extension';
import React from 'react';

const CmsBlockDefault: React.FC = combineHOC(withCmsBlockData)((props) => {
  return (
    <>
      {props?.state?.cmsBlocks?.map((item: any, index: any) => (
        <div
          key={`cms-block-${index}`}
          dangerouslySetInnerHTML={{
            // @ts-ignore
            __html: item?.content,
          }}
        />
      ))}
    </>
  );
});

export default CmsBlockDefault;
