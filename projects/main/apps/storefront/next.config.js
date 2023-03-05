// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextconfig = require('nextjs-config');

/**
 * @type {import('next').NextConfig}
 **/
const config = nextconfig(12, {
  transpilePackages: [
    '@main/packages-web-storefront',
    '@main/ui-testbed',
    '@main/ui-common',
  ],
  publicRuntimeConfig: {
    nextVersion: 12,
  },
});

module.exports = config;
