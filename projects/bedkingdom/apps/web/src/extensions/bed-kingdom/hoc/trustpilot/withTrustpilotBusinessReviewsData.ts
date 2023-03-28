import { useTrustpilotBusinessReviewsData } from '@extensions/bed-kingdom/hook/trustpilot/useTrustpilotBusinessReviewsData';
import { createUiHOC } from '@web/ui-extension';

export default createUiHOC(() => {
  return useTrustpilotBusinessReviewsData();
}, 'withTrustpilotBusinessReviewsContainer');
