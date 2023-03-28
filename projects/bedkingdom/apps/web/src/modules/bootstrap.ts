import { bootBedKingdom } from '@extensions/bed-kingdom/bootstrap';
import { bootAccount } from '@modules/account/boot';
import { bootCatalog } from '@modules/catalog/boot';
import { bootCheckout } from '@modules/checkout/boot';
import { bootCore } from '@modules/core/boot';
import { bootUiModule } from '@modules/ui/boot';
import REGISTRY from '@values/extendable/REGISTRY';
import { boostrapR } from '@vjcspy/r';
import { R_DEFAULT_VALUE } from '@vjcspy/r/build/values/R_DEFAULT_VALUE';
import { BrowserPersistence } from '@web/base/dist/lib/persistent/BrowserPersistence';
import { Registry } from 'chitility';
import { forEach } from 'lodash';

const browserPersistence: any = new BrowserPersistence();

Registry.getInstance().register(
  R_DEFAULT_VALUE.ASYNC_STORAGE_INSTANCE_KEY,
  () => browserPersistence
);

export function bootstrap() {
  boostrapR();

  // boot modules
  bootCore();
  bootUiModule();

  bootAccount();
  bootCatalog();
  bootCheckout();

  // boot extensions
  bootBedKingdom();

  // INIT CONFIG
  forEach(REGISTRY.getData(), (v, k) => Registry.getInstance().register(k, v));
}
