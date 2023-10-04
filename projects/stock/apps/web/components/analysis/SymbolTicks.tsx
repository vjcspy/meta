import { combineHOC } from '@web/ui-extension';

import VisualizedTable from '@/components/VisualizedTable';
import { withSymbolTicks } from '@/hoc/analysis/withSymbolTicks';

const SymbolTicks = combineHOC(withSymbolTicks)((props) => {
    return (
        <>
            <VisualizedTable
                data={props.state.ticks}
                title={`Symbol ticks: ${props.state.ticks.length} recors`}
                height={250}
                picks={['date']}
            />
        </>
    );
});

export default SymbolTicks;
