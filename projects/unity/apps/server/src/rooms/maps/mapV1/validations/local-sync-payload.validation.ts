export const localSyncPayloadValidation = (data: any): boolean => {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  // Validate position
  const pos = data.position;
  if (
    typeof pos !== 'object' ||
    pos === null ||
    typeof pos.x !== 'number' ||
    !Number.isFinite(pos.x) ||
    typeof pos.y !== 'number' ||
    !Number.isFinite(pos.y) ||
    typeof pos.z !== 'number' ||
    !Number.isFinite(pos.z) ||
    typeof pos.timestamp !== 'number' ||
    !Number.isFinite(pos.timestamp)
  ) {
    return false;
  }

  // Validate facingDirection (optional but if present must be valid)
  const fd = data.facingDirection;
  if (fd !== undefined) {
    if (
      typeof fd !== 'object' ||
      fd === null ||
      typeof fd.x !== 'number' ||
      !Number.isFinite(fd.x) ||
      typeof fd.y !== 'number' ||
      !Number.isFinite(fd.y) ||
      typeof fd.z !== 'number' ||
      !Number.isFinite(fd.z)
    ) {
      return false;
    }
  }

  // Validate animationState (optional)
  if (
    data.animationState !== undefined &&
    (typeof data.animationState !== 'number' ||
      !Number.isFinite(data.animationState))
  ) {
    return false;
  }

  return true;
};
