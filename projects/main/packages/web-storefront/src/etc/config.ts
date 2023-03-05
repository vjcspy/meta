import { withApollo } from '@main/packages-web-apollo/dist';

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
  // withRedux,
  withUrlRewrite,
];
