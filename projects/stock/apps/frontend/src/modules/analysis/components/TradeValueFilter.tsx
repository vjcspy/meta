import { withTradeValueFilter } from '@modules/analysis/hoc/withTradeValueFilter';
import { withThemState } from '@modules/app/hoc/withThemState';
import { combineHOC } from '@web/ui-extension/dist';
import Slider from 'antd/es/slider';

export default combineHOC(
  withTradeValueFilter,
  withThemState,
)((props) => {
  return (
    <div>
      <label>
        Trade Value:
        <span className="font-bold text-red-500">{` ${props?.state?.tradeValueFilter?.[1]} triệu`}</span>
      </label>
      <div className="mt-5">
        <Slider
          range
          max={10000}
          min={0}
          defaultValue={props?.state?.tradeValueFilter ?? 250}
          onChange={props?.actions?.debounceUpdateTradeValue}
          styles={{
            rail: {
              backgroundColor: props?.state.themeState.isDarkMode
                ? 'white'
                : 'rgba(0, 0, 0, 0.04)',
            },
          }}
        />
      </div>
    </div>
  );
});
