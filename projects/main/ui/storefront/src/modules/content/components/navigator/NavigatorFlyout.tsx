import { withNavigatorFlyout } from '@main/packages-web-storefront/src/modules/content/hoc/navigator/withNavigatorFlyout';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

export default combineHOC(withNavigatorFlyout)(function NavigatorFlyout(props) {
  const Flyout = useMemo(() => {
    if (!props.selection || !Array.isArray(props.selection.selections)) {
      return null;
    }

    return (
      <div
        id="navigator-flyout-container"
        className="navigator-flyout-container"
        onMouseLeave={() => props.whenMouseLeave}
        onMouseEnter={() => props.whenMouseEnter}
      >
        <div className="navigator-flyout">
          {props.selection.selections.map((s: any, index: number) => (
            <UiExtension
              key={index + Math.random()}
              uiId="NAVIGATOR_SELECTION"
              selection={s}
              level={1}
            />
          ))}
        </div>
      </div>
    );
  }, [props.selection]);

  return <>{Flyout}</>;
});
