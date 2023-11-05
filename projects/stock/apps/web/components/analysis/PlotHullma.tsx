import { combineHOC } from '@web/ui-extension';

import CandleStick from '@/components/plot/CandleStick';

const PlotHullma = combineHOC()((props) => {
    return (
        <>
            <CandleStick
                prices_data={props.hullmaIntraDay}
                title={props?.title}
            />
        </>
    );
});

export default PlotHullma;
