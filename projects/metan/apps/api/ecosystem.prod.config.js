module.exports = {
  apps: [
    {
      name: 'metan_mexc_rq',
      script: './dist/main.js',
      instances: '2',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        APP_NAME: 'metan_mexc',
        NODE_ENV: 'production',
        CRON_ENABLE: false,
        QUEUE_CONSUMER_ENABLE: false,
      },
    },
  ],
};
