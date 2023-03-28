import { BEDKINGDOMN_BANNER_EXT_CFG } from '@extensions/bed-kingdom/components/home/Banner';
import { BEDKINGDOM_CATEGORY_CONTENT_CFG } from '@extensions/bed-kingdom/components/home/CategoryContent';
import { HOME_SUBSCRIBER_CONTENT_CFG } from '@extensions/bed-kingdom/components/home/Subscriber';
import { ExtensionConfig } from '@web/ui-extension';

export const BEDKINGDOM_HOME_PAGE_CONTENT_CFG: ExtensionConfig[] = [
  ...BEDKINGDOM_CATEGORY_CONTENT_CFG,
  ...HOME_SUBSCRIBER_CONTENT_CFG,
  ...BEDKINGDOMN_BANNER_EXT_CFG,
];
