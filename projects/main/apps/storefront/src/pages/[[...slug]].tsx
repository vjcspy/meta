import { withDefaultAdapter } from '@main/packages-web-storefront/src';
import UrlRewrite from '@main/packages-web-storefront/src/modules/url-rewrite/components/url-rewrite';
import type { NextPage } from 'next';

const RewriteRouterPage: NextPage = () => {
  return <UrlRewrite />;
};

export default withDefaultAdapter(RewriteRouterPage);
