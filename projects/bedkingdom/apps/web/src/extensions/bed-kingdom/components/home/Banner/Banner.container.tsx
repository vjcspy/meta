import { useExtAdditionConfig } from '@modules/ui/hook/config/useExtAdditionConfig';
import { UiExtension } from '@web/ui-extension';
import React from 'react';

const BannerContainer = React.memo((props) => {
  const sliderId = useExtAdditionConfig('slider_id', props);
  return (
    <>
      {!isNaN(sliderId) && (
        <UiExtension uiId="BEDKINGDOM_HOME_BANNER" sliderId={sliderId} />
      )}
    </>
  );
});

BannerContainer.displayName = 'BannerContainer';
export default BannerContainer;
