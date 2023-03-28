import { useRewardPoints } from '@modules/account/hook/useRewardPointsState';
import { createUiHOC } from '@web/ui-extension';

export const withRewardPoints = createUiHOC(
  () => useRewardPoints(),
  'withRewardPoints'
);

export const withRewardPointData = createUiHOC(
  () => useRewardPoints(),
  'withRewardPointData'
);
