import { withApollo } from '@main/packages-web-apollo/dist';
import { withI18n } from '@main/packages-web-i18n/dist/drivers/i18n';
import { withRedux } from '@main/packages-web-redux';

import { withStorefrontCatalog } from '../modules/catalog/driver/catalog';
import { withStorefrontContent } from '../modules/content/drivers/withStorefrontContent';
import { withDomain } from '../modules/domain/drivers/domain';
import { withStore } from '../modules/store/drivers/store';
import { withUrlRewrite } from '../modules/url-rewrite/drivers/url-rewrite';

export const ADAPTERS = [
  /*
   * Phải để Apllo lên đầu cùng, bởi vì trong driver của apollo, nó sẽ gọi getInitData của Page và lấy giá trị đó truyền xuống AppTree để render.
   * Nếu không để nó trên cùng, sẽ không có đủ data cho các component khác.
   * */
  withApollo,
  withDomain,
  withStore,
  withRedux,
  withI18n,
  withUrlRewrite,

  // Storefront logic
  withStorefrontContent,
  withStorefrontCatalog,
];
