import { CHITILITY_KEY } from 'chitility/dist/etc/key';
import { Registry } from 'chitility/dist/util/registry';
import * as process from 'process';

import { WEB_DOMAIN_KEY } from '../modules/domain/etc/WebDomainKey';

export function bootstrap(): void {
  // define proxy environment
  Registry.getInstance().register(
    CHITILITY_KEY.PROXY_URL_KEY,
    process.env.NEXT_PUBLIC_PROXY_DEFAULT_URL
  );
  Registry.getInstance().register(
    CHITILITY_KEY.PROXY_APP_NAME,
    process.env.NEXT_PUBLIC_PROXY_APP_NAME
  );

  // WebsiteID used in web-domain
  Registry.getInstance().register(
    WEB_DOMAIN_KEY.DEFAULT_WEBSITE_IDS,
    process.env.NEXT_PUBLIC_DEFAULT_WEBSITE_IDS?.split(',')
  );
}
