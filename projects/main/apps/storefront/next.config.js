// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextconfig = require('nextjs-config');

/**
 * @type {import('next').NextConfig}
 **/
const config = nextconfig(12, {
  transpilePackages: [
    '@main/packages-web-storefront',
    '@main/packages-web-apollo',
    '@main/packages-web-apollo-schema-mgt',
    '@main/ui-testbed',
  ],
  publicRuntimeConfig: {
    nextVersion: 12,
  },
});

module.exports = config;
