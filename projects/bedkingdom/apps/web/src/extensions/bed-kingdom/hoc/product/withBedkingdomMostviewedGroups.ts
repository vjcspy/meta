import { useBedkingdomMostviewedGroups } from '@extensions/bed-kingdom/hook/products/useBedkingdomMostviewedGroups';
import { createUiHOC } from '@web/ui-extension';

export const withBedkingomMostviewedGroups = createUiHOC(
  (props) => useBedkingdomMostviewedGroups(props),
  'withBedkingdomMostviewedGroups'
);
