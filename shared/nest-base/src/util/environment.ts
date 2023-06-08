export function getAppName() {
  return `${process.env.APP_NAME}`;
}

/**
 * Work with pm2
 * @returns {string}
 */
export function getInstanceId() {
  return process.env.INSTANCE_ID ? `PM2_${process.env.INSTANCE_ID}` : '_';
}

export function isMainProcess() {
  return (
    process.env.INSTANCE_ID === '0' ||
    typeof process.env.INSTANCE_ID === 'undefined'
  );
}

export function isProduction() {
  return getNodeEnv() === 'production';
}

export function getNodeEnv() {
  return process.env.NODE_ENV;
}
