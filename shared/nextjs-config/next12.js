const tm = require("next-transpile-modules");

const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  disable: process.env.NODE_ENV !== "production",
  dest: "public",
  runtimeCaching,
  buildExcludes: [/server\/.*$/, /chunks\/.*$/],
  register: true,
  skipWaiting: true
});
module.exports = {
  config: (config) => {
    const { transpilePackages, isPWA = false, publicRuntimeConfig = {} } = config;
    const withTM = tm(transpilePackages);
    const plugins = [withTM, ...(isPWA ? [withPWA] : [])];
    return plugins.reduce((acc, next) => next(acc), {
      // sassOptions: {
      //   includePaths: [
      //     path.join(__dirname, 'src/assets/style'),
      //     path.join(__dirname, 'src/extensions/../assets/style'),
      //   ],
      // },

      /**
       * Cac module code chua duoc build ra ma dang de es6 thi can compile truoc khi su dung voi next
       * */
      // transpilePackages: ['@vjcspy/react-360-view'],
      webpack: (config, { isServer }) => {
        // Import SVG https://react-svgr.com/docs/webpack/
        const fileLoaderRule = config.module.rules.find(
          (rule) => rule.test && rule.test.test(".svg")
        );
        fileLoaderRule.exclude = /\.svg$/;
        config.module.rules.push({
          test: /\.svg$/,
          // loader: [require.resolve('@svgr/webpack')require.resolve('@svgr/webpack'),],
          issuer: /\.[jt]sx?$/,
          use: ["@svgr/webpack", "url-loader"]
        });

        /*
         * Do I18n depend vào fs module, chạy server side sẽ throw lỗi Module not found: Can't resolve 'fs'
         * */
        if (!isServer) {
          config.resolve.fallback.fs = false;

          // Config ignore resolve module này trên client
          config.resolve.alias["i18next-fs-backend"] = false;
        }
        return config;
      },
      publicRuntimeConfig
    });
  }

};
