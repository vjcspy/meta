module.exports = {
  apps: [
    {
      name: 'meta-stock',
      script: './dist/main.js',
      instances: '8',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
