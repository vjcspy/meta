import { R_CONTENT_ADDRESS_EFFECTS } from '@modules/content/store/address/effects';
import { R_CONTENT_BANNER_EFFECTS } from '@modules/content/store/banner/effects';

export const R_CONTENT_EFFECTS = [
  ...R_CONTENT_BANNER_EFFECTS,
  ...R_CONTENT_ADDRESS_EFFECTS,
];
