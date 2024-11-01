export function getAppName() {
  return `${process.env.APP_NAME}`;
}

/**
 * Work with pm2
 * @returns {string}
 */
export function getInstanceId() {
  return process.env.POD_NAME ? `${process.env.POD_NAME}` : '';
}

export function isMainProcess() {
  return (
    process.env.INSTANCE_ID === '0' ||
    typeof process.env.INSTANCE_ID === 'undefined'
  );
}

export function getNodeEnv() {
  return process.env.NODE_ENV ?? 'development';
}

export function isProduction() {
  return getNodeEnv() === 'production';
}
