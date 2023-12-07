import Symbol from '@modules/analysis/components/Symbol';
import TickRange from '@modules/analysis/components/TickRange';

export default function TickDates() {
  return (
    <>
      <Symbol fromDate={true} toDate={true} tradeValue={true} />
      <TickRange />
    </>
  );
}
