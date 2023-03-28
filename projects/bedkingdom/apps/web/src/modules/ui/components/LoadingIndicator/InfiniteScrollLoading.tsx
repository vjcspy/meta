import React from 'react';

const InfiniteScrollLoading = React.memo<{
  isDone: boolean;
}>((props) => {
  if (props?.isDone) {
    return null;
  }

  return (
    <div className="b-loading text-center mx-auto w-full">
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
});

InfiniteScrollLoading.displayName = 'InfiniteScrollLoading';
export default InfiniteScrollLoading;
