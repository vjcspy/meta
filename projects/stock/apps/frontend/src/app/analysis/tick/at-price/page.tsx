import Symbol from '@modules/analysis/components/Symbol';
import TickAtPrices from '@src/modules/analysis/components/TickAtPrices';

export default function TickAtPrice() {
  return (
    <>
      <Symbol fromDate={true} toDate={true} />
      <TickAtPrices />
    </>
  );
}
