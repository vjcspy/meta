import { combineHOC } from '@web/ui-extension';

import CandleStick from '@/components/plot/CandleStick';
import { withSymbolPrice } from '@/hoc/analysis/withSymbolPrice';

const PlotHullma = combineHOC(withSymbolPrice)((props) => {
    return (
        <>
            <CandleStick prices_data={props.state.prices} />
        </>
    );
});

export default PlotHullma;
