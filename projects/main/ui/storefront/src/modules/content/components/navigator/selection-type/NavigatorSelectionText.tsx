import { useTranslation } from '@main/packages-web-i18n';
import { withNavigatorSelectionAction } from '@main/packages-web-storefront/src/modules/content/hoc/navigator/withNavigatorSelectionAction';
import { combineHOC } from '@web/ui-extension';
import React, { useCallback } from 'react';

export default combineHOC(withNavigatorSelectionAction)(
  function NavigatorSelectionText(props: any) {
    const { t } = useTranslation('catalog');
    const handleClick = useCallback(() => {
      if (props.handleAction) {
        props.handleAction(props.action);
      }
    }, [props.action]);
    return (
      <div className="cursor-pointer" onClick={() => handleClick()}>
        {t(props.name.toLocaleLowerCase()).toLocaleUpperCase()}
      </div>
    );
  }
);
