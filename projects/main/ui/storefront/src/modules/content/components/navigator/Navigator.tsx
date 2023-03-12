import { useTranslation } from '@main/packages-web-i18n';
import { withNavigator } from '@main/packages-web-storefront/src/modules/content/hoc/navigator/withNavigator';
import { withNavigatorSelectionAction } from '@main/packages-web-storefront/src/modules/content/hoc/navigator/withNavigatorSelectionAction';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useCallback, useEffect, useState } from 'react';

export default combineHOC(
  withNavigator,
  withNavigatorSelectionAction
)(function Navigator(props) {
  const { t } = useTranslation('catalog');
  const [indexHover, setIndexHover] = useState(-1);

  useEffect(() => {
    if (props.state.isMouseInside === false) {
      setIndexHover(-1);
    }
  }, [props.state.isMouseInside]);

  const whenActivate = useCallback(
    (selection: any, index: number) => {
      setIndexHover(index);
      if (typeof props.actions.activateNav === 'function') {
        props.actions.activateNav(selection);
      }
    },
    [props.actions.activateNav]
  );

  const handleAction = useCallback((action: any) => {
    if (props?.handleAction && action) {
      props.handleAction(action);
    }
  }, []);

  if (!Array.isArray(props.state.selections)) {
    return null;
  }

  return (
    <>
      <div
        id="navigator-container"
        onMouseLeave={props.whenMouseLeave}
        onMouseEnter={props.whenMouseEnter}
      >
        <ul className="ui-navigator-container" style={{ margin: 25 }}>
          {props.state.selections.map((child: any, index: any) => {
            return (
              <li
                key={index}
                className={
                  indexHover === index && props.state.isMouseInside === true
                    ? 'navigator-item navigator-item-activated'
                    : 'navigator-item'
                }
                onMouseEnter={() => whenActivate(child, index)}
                onClick={() => handleAction(child?.action)}
              >
                <span>
                  {t(child.name.toLocaleLowerCase()).toLocaleUpperCase()}
                </span>
              </li>
            );
          })}
        </ul>
        {props?.state?.isMouseInside && <UiExtension uiId="NAVIGATOR_FLYOUT" />}
      </div>
    </>
  );
});
