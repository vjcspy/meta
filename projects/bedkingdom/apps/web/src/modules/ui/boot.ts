import { COMMON_ROOT_EXTENSION_CONFIGS } from '@modules/ui/components/common';
import { CMS_BLOCK_DEFAULT_CONFIG } from '@modules/ui/components/default-cms-block';
import { DEFAULT_HEADER_EXT_CFG } from '@modules/ui/components/header';
import { HtmlParseCPT } from '@modules/ui/components/html-parse';
import { UI_IMAGE_EXT_CFG } from '@modules/ui/components/Image';
import { WEB_LOADING_INDICATOR_CPT } from '@modules/ui/components/LoadingIndicator';
import { RESPONSIVE_EXT_CFG } from '@modules/ui/components/responsive';
import { SEO_EXT_CFG } from '@modules/ui/components/seo';
import { SLIDER_COMPONENTS } from '@modules/ui/components/slider';
import { UiManager } from '@web/ui-extension';

UiManager.config({
  extensionConfigs: [
    COMMON_ROOT_EXTENSION_CONFIGS,
    WEB_LOADING_INDICATOR_CPT,
    HtmlParseCPT,
    SLIDER_COMPONENTS,
    RESPONSIVE_EXT_CFG,
    // WEB_IMAGE_EXTENSION_CONFIGS,
    SEO_EXT_CFG,
    DEFAULT_HEADER_EXT_CFG,
    CMS_BLOCK_DEFAULT_CONFIG,
    // ...MUI_CPT_CFG,
    UI_IMAGE_EXT_CFG,
  ],
});

export function bootUiModule() {
  //EMPTY
}
