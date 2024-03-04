module.exports = {
  apps: [
    {
      name: 'mc_rq',
      script: './dist/main.js',
      instances: '2',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        APP_NAME: 'mc_rq',
        NODE_ENV: 'production',
        CRON_ENABLE: false,
        QUEUE_CONSUMER_ENABLE: false,
      },
    },
  ],
};
