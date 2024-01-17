module.exports = {
  apps: [
    {
      name: 'mc_rq',
      script: './dist/main.js',
      instances: '4',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        APP_NAME: 'ms_rq',
        NODE_ENV: 'production',
        CRON_ENABLE: false,
        QUEUE_CONSUMER_ENABLE: false,
      },
    },
    {
      name: 'mc_jb',
      script: './dist/main.js',
      instances: '4',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        APP_NAME: 'ms_jb',
        NODE_ENV: 'production',
        CRON_ENABLE: true,
        QUEUE_CONSUMER_ENABLE: true,
      },
    },
  ],
};
