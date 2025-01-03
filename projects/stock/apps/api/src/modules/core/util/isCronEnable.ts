/**
 * Cron only run in POD Ordinal 0 (K8s StatefulSet)
 * @returns {boolean}
 */
export const isCronEnable = (): boolean => {
  return process.env.CRON_ENABLE === 'true' && process.env.POD_ORDINAL === '0';
};
