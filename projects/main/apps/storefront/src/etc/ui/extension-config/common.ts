import DefaultImage from '@components/Image/DefaultImage';
import Image from '@components/Image/Image';
import DefaultLink from '@components/Link/DefaultLink';
import type { ExtensionConfig } from '@web/ui-extension';

export const UI_COMMON_EXT_CFG: ExtensionConfig[] = [
  {
    uiId: 'IMAGE',
    component: Image,
  },
  {
    uiId: 'DEFAULT_IMAGE',
    component: DefaultImage,
  },
  {
    uiId: 'DEFAULT_LINK',
    component: DefaultLink,
  },
];
