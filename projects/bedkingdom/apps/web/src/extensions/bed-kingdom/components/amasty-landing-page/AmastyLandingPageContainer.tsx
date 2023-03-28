import { withAmastyPageContainer } from '@extensions/bed-kingdom/hoc/amasty-page/withAmastyPage';
import {
  combineHOC,
  UiExtension,
  useStackComponent,
} from '@web/ui-extension';
import React from 'react';

const AmastyLandingPageContainer = combineHOC(withAmastyPageContainer)(
  (props) => {
    const { Structures } = useStackComponent(props as any);

    if (
      props?.state?.amastyPage &&
      props?.state?.amastyPage?.page_id &&
      !props?.state?.amastyPage?.is_active
    ) {
      return <UiExtension uiId="404" />;
    }

    return (
      <>
        {props?.state?.loading && (
          <UiExtension uiId="LOADING_INDICATOR" global={true} />
        )}
        {props?.state?.amastyPage && Structures}
      </>
    );
  }
);

export default AmastyLandingPageContainer;
