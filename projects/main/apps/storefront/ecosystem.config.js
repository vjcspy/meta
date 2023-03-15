module.exports = {
  apps: [
    {
      name: 'meta',
      script: './dist/index.js',
      instances: '2',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 3001,
      },
    },
  ],
};
