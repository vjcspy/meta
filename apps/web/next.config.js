module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui', 'chitility'],
  webpack: (
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
  ) => {
    /*
     * Do I18n depend on fs module, chạy server side sẽ throw lỗi Module not found: Can't resolve 'fs'
     * */
    if (!isServer) {
      config.resolve.fallback.fs = false;

      // Config ignore resolve module này trên client
      config.resolve.alias['i18next-fs-backend'] = false;
    }

    // Important: return the modified config
    return config;
  },
};
