import {
  ExtensionDataConfig,
  useExtensionForHook,
} from '@web/ui-extension';
import React from 'react';

const TwoColumns = React.memo<{
  extensionDataConfig: ExtensionDataConfig;
}>((props) => {
  const ColumnOne = useExtensionForHook('columnOne', props);
  const ColumnTwo = useExtensionForHook('columnTwo', props);

  return (
    <section className="b-customer-page b-page mx-auto px-4">
      <h4 className="b-page-title text-26px text-center mdm:mb-6 mb-14 mt-10 mdm:mt-5 font-bold">
        Customer Login
      </h4>
      <div className="grid md:grid-cols-2 md:gap-20">
        <div className="column-one">{ColumnOne}</div>
        <div className="column-two">{ColumnTwo}</div>
      </div>
    </section>
  );
});
TwoColumns.displayName = 'TWO_COLUMNS';
export default TwoColumns;
