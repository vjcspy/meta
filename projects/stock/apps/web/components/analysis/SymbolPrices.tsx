import { combineHOC } from '@web/ui-extension';

// You can import any component you want as a named export from 'react-virtualized', eg
import VisualizedTable from '@/components/VisualizedTable';
import { withSymbolPrice } from '@/hoc/analysis/withSymbolPrice';

const SymbolPrices = combineHOC(withSymbolPrice)((props) => {
    return (
        <>
            <VisualizedTable
                data={props.state.prices}
                title={`Symbol price: ${props.state.prices.length} recors`}
                height={250}
                picks={['date', 'high', 'low', 'close', 'open']}
            />
        </>
    );
});

export default SymbolPrices;
