module.exports = {
  apps: [
    {
      name: 'ms_dev',
      script: './dist/main.js',
      instances: '4',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        APP_NAME: 'ms_dev',
        CRON_ENABLE: false,
        QUEUE_CONSUMER_ENABLE: true,
      },
    },
  ],
};
