import { useTranslation } from '@main/packages-web-i18n';
import { withNavigatorSelectionAction } from '@main/packages-web-storefront/src/modules/content/hoc/navigator/withNavigatorSelectionAction';
import { combineHOC, UiExtension } from '@web/ui-extension';
import React, { useMemo } from 'react';

export default combineHOC(withNavigatorSelectionAction)(
  function NavigatorSelectionLink(props) {
    const { t } = useTranslation('catalog');
    const hrefData = useMemo(() => {
      let pathname;
      let query;
      if (props.action) {
        if (typeof props.action['data'] === 'string') {
          pathname = props.action['data'];
        } else if (typeof props.action['data'] === 'object') {
          pathname = props.action['data']['pathname'];
          query = props.action['data']['query'];
        }
      }

      return {
        pathname,
        query,
      };
    }, []);
    return (
      <div className="navigator-link mt-4">
        <UiExtension uiId="DEFAULT_LINK" hrefData={hrefData}>
          <a>{t(props.name.toLocaleLowerCase()).toLocaleUpperCase()}</a>
        </UiExtension>
      </div>
    );
  }
);
