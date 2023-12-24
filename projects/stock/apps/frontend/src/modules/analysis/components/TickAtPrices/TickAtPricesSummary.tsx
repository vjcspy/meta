import withTickAtPriceWorker from '@modules/analysis/hoc/tickAtPrices/withTickAtPriceWorker';
import { combineHOC } from '@web/ui-extension/dist';
import React, { useEffect } from 'react';

export default combineHOC(withTickAtPriceWorker)((props) => {
  useEffect(() => {
    props.actions.calSummaryData(props.data);
  }, [props?.data]);

  console.log(props.state.summaryData);

  if (!props?.state?.summaryData) {
    return <></>;
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 pt-5 lg:grid-cols-2">
        <div className="panel">
          <h5 className="mb-5 text-lg font-semibold dark:text-white-light">
            Heading
          </h5>
          <div className="mb-5 flex items-center justify-center">
            <div className="w-full max-w-xs overflow-hidden rounded-md border border-white-dark/20 dark:border-[#191e3a]">
              <div className="bg-white p-4 dark:bg-[#191e3a]">
                <p className="text-4xl leading-[60px] text-[#515365] dark:text-white-light">
                  The quick brown fox
                </p>
              </div>
              <div className="border-border-white-dark/20 border-t bg-dark-light p-4 dark:border-black dark:bg-[#191e3a]">
                <h5 className="text-base dark:text-white-light">Nunito</h5>
                <button className="text-[13px] text-primary">
                  Google Fonts
                </button>
                <div className="mt-7 flex justify-center">
                  <button className="btn btn-primary">View Family</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});
