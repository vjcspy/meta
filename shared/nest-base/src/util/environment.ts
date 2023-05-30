export function getAppName() {
  return `${process.env.APP_NAME}`;
}

/**
 * Work with pm2
 * @returns {string}
 */
export function getInstanceId() {
  return `${process.env.INSTANCE_ID ?? 0}`;
}
