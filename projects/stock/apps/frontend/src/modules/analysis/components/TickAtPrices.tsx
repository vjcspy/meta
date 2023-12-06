import { withTicks } from '@modules/analysis/hoc/withTicks';
import { combineHOC } from '@web/ui-extension';

const TickAtPrices = combineHOC(withTicks)((props) => {
  return <></>;
});

export default TickAtPrices;
