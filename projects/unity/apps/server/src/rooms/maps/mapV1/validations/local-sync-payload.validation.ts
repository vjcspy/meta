export const localSyncPayloadValidation = (data: any) => {
  if (
    typeof data !== 'object' ||
    data === null ||
    typeof data.x !== 'number' ||
    !Number.isFinite(data.x) ||
    typeof data.y !== 'number' ||
    !Number.isFinite(data.y) ||
    typeof data.z !== 'number' ||
    !Number.isFinite(data.z) ||
    (data.animationState !== undefined &&
      typeof data.animationState !== 'number')
  ) {
    return false;
  }

  if (data.facingDirection) {
    const fd = data.facingDirection;
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

  return true;
};
