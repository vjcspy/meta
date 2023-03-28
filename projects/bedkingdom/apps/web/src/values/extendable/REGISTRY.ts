import { useResolveChiakiPageQuery } from '@vjcspy/apollo';
import { DataValueExtension } from 'chitility/dist/lib/extension/data-value-extension';
import process from 'process';
export default DataValueExtension.resolve('REGISTRY', {
  CLIENT_ID_KEY: 'YXBwbGljYXRpb25faWQ6YXBwbGljYXRpb25fc2VjcmV0',
  MGT_CE: true,
  URL_REWRITE_RESOLVE_QUERY: useResolveChiakiPageQuery,
  'CHITILITY_KEY.PROXY_URL_KEY': process.env.NEXT_PUBLIC_PROXY_DEFAULT_URL,
  'CHITILITY_KEY.PROXY_APP_NAME': process.env.NEXT_PUBLIC_PROXY_APP_NAME,
  'WEB_DOMAIN_KEY.DEFAULT_WEBSITE_IDS': [
    process.env.NEXT_PUBLIC_DEFAULT_WEBSITE_IDS,
  ],
});
