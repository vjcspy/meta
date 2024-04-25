module.exports = {
  apps: [
    {
      name: 'mc_dev',
      script: './dist/main.js',
      instances: '2',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        APP_NAME: 'mc_dev',
        CRON_ENABLE: false,
        QUEUE_CONSUMER_ENABLE: true,
      },
    },
  ],
};
