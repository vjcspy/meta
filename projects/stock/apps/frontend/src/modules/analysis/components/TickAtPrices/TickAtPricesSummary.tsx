import React, { useMemo } from 'react';

const TickAtPricesSummary = React.memo((props: { ticks: any[] }) => {
  const mdData = useMemo(() => {
    return ``;
  }, [props.ticks]);

  return <>{mdData}</>;
});

export default TickAtPricesSummary;
