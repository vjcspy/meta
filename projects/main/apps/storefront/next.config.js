// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextconfig = require('nextjs-config');

const config = nextconfig(12, {
  transpilePackages: [
    '@main/packages-web-storefront',
    '@main/packages-web-apollo',
    '@main/packages-web-apollo-schema-mgt',
    '@main/ui-testbed',
  ],
});

module.exports = config;
