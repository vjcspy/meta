module.exports = {
  apps: [
    {
      name: 'meta-stock',
      script: './build/main.js',
      instances: '4',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
