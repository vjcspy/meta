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

/**
 * Process đầu tiên chạy job sẽ được coi là main process
 *
 * @returns {boolean}
 */
export function isMainProcess() {
  return process.env.INSTANCE_ID === '0' || process.env.POD_ORDINAL === '0';
}

export function getNodeEnv() {
  return process.env.NODE_ENV ?? 'development';
}

export function isProduction() {
  return getNodeEnv() === 'production';
}
