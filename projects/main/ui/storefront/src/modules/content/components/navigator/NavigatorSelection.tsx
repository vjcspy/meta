import { withNavigatorSelection } from '@main/packages-web-storefront/src/modules/content/hoc/navigator/withNavigatorSelection';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

export default combineHOC(withNavigatorSelection)(function NavigatorSelection(
  props
) {
  const SELECTIONS = useMemo(() => {
    if (Array.isArray(props.selection['selections'])) {
      return props.selection['selections'].map((selection, index) => (
        <UiExtension
          key={index + Math.random()}
          uiId="NAVIGATOR_SELECTION"
          selection={selection}
          level={props.level + 1}
        />
      ));
    }

    return null;
  }, []);

  const Selection = useMemo(() => {
    if (props.selection['action']) {
      switch (props.selection.action['type']) {
        case 'catalog_category_view':
          return (
            <UiExtension
              uiId="NAVIGATOR_SELECTION_TEXT"
              name={props.selection.name}
              action={props.selection.action}
              additionalData={props.selectionAdditionalData}
            />
          );

        case 'attribute_filter':
          return (
            <UiExtension
              uiId="NAVIGATOR_SELECTION_ATTRIBUTE"
              name={props.selection.name}
              action={props.selection.action}
              additionalData={props.selectionAdditionalData}
            />
          );

        case 'link':
          return (
            <UiExtension
              uiId="NAVIGATOR_SELECTION_LINK"
              name={props.selection.name}
              action={props.selection.action}
              additionalData={props.selectionAdditionalData}
            />
          );

        default:
          return <div>{props.selection.name}</div>;
      }
    }

    return null;
  }, [props.selectionAdditionalData]);

  return (
    <div className="navigator-selection-container">
      <div className={'navigator-selection selection-lv' + props.level}>
        <div className="sub-selection mb-3 navigator-name">{Selection}</div>
        <div className="navigator-selections">{SELECTIONS}</div>
      </div>
    </div>
  );
});
