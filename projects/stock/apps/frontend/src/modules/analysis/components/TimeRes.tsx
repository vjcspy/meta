import withTimeRes from '@modules/analysis/hoc/withTimeRes';
import { getTimeResolutionOptions } from '@modules/analysis/util/getTimeResolutionOptions';
import { combineHOC } from '@web/ui-extension/dist';
import { useCallback } from 'react';

export default combineHOC(withTimeRes)((props) => {
  const onTimeResChange = useCallback((e: any) => {
    props.actions.setTimeRes(e.target.value);
  }, []);
  return (
    <>
      <div>
        <label>Time Resolution</label>
        <select
          value={props?.state.timeRes}
          className="form-select text-white-dark"
          onChange={onTimeResChange}
        >
          {getTimeResolutionOptions().map((d) => (
            <option key={d.value} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>
    </>
  );
});
