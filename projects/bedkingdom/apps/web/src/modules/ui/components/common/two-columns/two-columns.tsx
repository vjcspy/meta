import type { ExtensionDataConfig } from '@web/ui-extension';
import { useExtensionForHook } from '@web/ui-extension';
import React from 'react';

const TwoColumns = React.memo<{
  extensionDataConfig: ExtensionDataConfig;
}>((props) => {
  const ColumnOne = useExtensionForHook('columnOne', props);
  const ColumnTwo = useExtensionForHook('columnTwo', props);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12 col-sm-6">
          <div className="column-one">{ColumnOne}</div>
        </div>
        <div className="col-12 col-sm-6">
          <div className="column-two">{ColumnTwo}</div>
        </div>
      </div>
    </div>
  );
});
TwoColumns.displayName = 'TWO_COLUMNS';
export default TwoColumns;
