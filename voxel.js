//voxel bit magic
const TYPE_MASK = 0x07ff; // 0000011111111111 - 11 bits 2048 different types.
const LOCK_MASK = 0x8000; // 1000000000000000 - bit 15 - can the voxel be changed?
const VISIBLE_MASK = 0x0800; // 0000100000000000 - bit 11 is the voxel visible
const FLAG2_MASK = 0x1000; // bit 12 unused
const FLAG3_MASK = 0x2000; // bit 13 unused
const FLAG4_MASK = 0x4000; // bit 14 unused

export function createVoxel(type, visible, locked) {
  return (
    (type & TYPE_MASK) | (locked ? LOCK_MASK : 0) | (visible ? VISIBLE_MASK : 0)
  );
}

export function setVoxellock(voxel) {
  return voxel | LOCK_MASK;
}

export function clearVoxelLock(voxel) {
  return voxel & ~LOCK_MASK;
}

export function isVoxelLocked(voxel) {
  return (voxel & LOCK_MASK) !== 0;
}

export function setVoxelVisible(voxel) {
  return voxel | VISIBLE_MASK;
}

export function setVoxelHidden(voxel) {
  return voxel & ~VISIBLE_MASK;
}

export function isVoxelVisible(voxel) {
  return (voxel & VISIBLE_MASK) !== 0;
}

export function setVoxelType(voxel, type) {
  //clear old type
  voxel &= ~TYPE_MASK;

  // Set new type bits, mask to 11 bits just in case
  voxel |= type & TYPE_MASK;

  return voxel;
}

export function getVoxelType(voxel) {
  return voxel & TYPE_MASK;
}

export function showVoxelBits(voxel) {
  return voxel.toString(2).padStart(16, "0");
}
