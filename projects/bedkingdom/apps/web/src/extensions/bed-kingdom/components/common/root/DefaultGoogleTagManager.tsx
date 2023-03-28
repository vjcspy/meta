import { withBedKingdomGetGoogleTagManager } from '@extensions/bed-kingdom/hoc/common/withBedKingdomGetGoogleTagManager';
import { combineHOC } from '@web/ui-extension';
import React, { useEffect } from 'react';

const DefaultGoogleTagManager = combineHOC(withBedKingdomGetGoogleTagManager)(
  React.memo((props) => {
    useEffect(() => {
      let scriptGTMHead: any = null;
      if (props?.state?.dataTagManager?.head) {
        scriptGTMHead = document.createElement('script');
        scriptGTMHead.innerHTML = props?.state?.dataTagManager?.head
          .replaceAll('<script>', '')
          .replaceAll('</script>', '');

        document.head.appendChild(scriptGTMHead);
      }

      let scriptGTMBody: any = null;
      if (props?.state?.dataTagManager?.body) {
        if (props?.state?.dataTagManager?.body.includes('<noscript>')) {
          scriptGTMBody = document.createElement('noscript');
          scriptGTMBody.innerHTML = props?.state?.dataTagManager?.body
            .replaceAll('<noscript>', '')
            .replaceAll('</noscript>', '');
          document.body.appendChild(scriptGTMBody);
        } else if (props?.state?.dataTagManager?.body.includes('<script>')) {
          scriptGTMBody = document.createElement('script');
          scriptGTMBody.innerHTML = props?.state?.dataTagManager?.body
            .replaceAll('<script>', '')
            .replaceAll('</script>', '');
          document.body.appendChild(scriptGTMBody);
        }
      }

      return () => {
        if (scriptGTMHead) {
          document.head.removeChild(scriptGTMHead);
        }
        if (scriptGTMBody) {
          document.body.removeChild(scriptGTMBody);
        }
      };
    }, [props?.state?.dataTagManager]);

    return <></>;
  })
);

DefaultGoogleTagManager.displayName = 'DefaultGoogleTagManager';

export default DefaultGoogleTagManager;
