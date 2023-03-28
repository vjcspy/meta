import UrlRewrite from '@main/packages-web-storefront/src/modules/url-rewrite/components/url-rewrite';
import { withWebRewriteAdapter } from '@modules/core/util/adapter';
import type { NextPage } from 'next';

const RewriteRouterPage: NextPage = () => {
  return <UrlRewrite />;
};

export default withWebRewriteAdapter(RewriteRouterPage, {
  ssr: true,
});
