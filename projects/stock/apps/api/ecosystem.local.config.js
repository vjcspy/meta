module.exports = {
  apps: [
    {
      name: 'meta-stock-development',
      script: './dist/main.js',
      instances: '8',
      instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {},
    },
  ],
};
