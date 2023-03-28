import { URL_REWRITE_CPT } from '@main/packages-web-storefront/src/modules/url-rewrite/components';
import { TEST_CPT_CFG } from '@modules/core/components';
import { UiManager } from '@web/ui-extension';

UiManager.config({
  extensionConfigs: [TEST_CPT_CFG, URL_REWRITE_CPT],
});

export function bootCore() {
  //EMPTY
}
