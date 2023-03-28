import type { StoreConfig } from '@vjcspy/apollo-bed-kingdom';
import { useMemo } from 'react';

export const useAppLogo = (uiConfig?: StoreConfig) => {
  const logoUrl = useMemo(() => {
    if (!uiConfig) {
      return null;
    }
    return uiConfig.secure_base_media_url + 'logo/' + uiConfig.header_logo_src;
  }, [uiConfig]);

  return {
    logoUrl,
    logoHeight: uiConfig?.logo_height,
    logoWidth: uiConfig?.logo_width,
  };
};
