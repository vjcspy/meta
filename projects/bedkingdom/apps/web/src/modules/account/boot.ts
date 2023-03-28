import { ACCOUNT_EXTENSION_CONFIGS } from '@modules/account/components';
import { UiManager } from '@web/ui-extension';

UiManager.config({
  extensionConfigs: [ACCOUNT_EXTENSION_CONFIGS],
});

export function bootAccount() {}
