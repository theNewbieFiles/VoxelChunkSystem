const arraySize = 4096; //16*16*16
const BINARY15 = 0xf // 0xf = 15 or 00001111
const SHIFTOVER8 = 8; //shift  8 bits 
const SHIFTOVER4 = 4; //shift to the left 4 bits
 
// Bit allocations
//const X_BIT_COUNT = 12; // 4096 possible values (0 - 4095)
const Y_BIT_COUNT = 8;  // 256 possible values (0 - 255)
const Z_BIT_COUNT = 12; // 4096 possible values (0 - 4095)

// Bit masks (limit to allowed range)
const X_MASK = 0xfff; // 12 bits
const Y_MASK = 0xff;  // 8 bits
const Z_MASK = 0xfff; // 12 bits

// Bit shifts (to pack into a 32-bit integer)
const X_SHIFT = Y_BIT_COUNT + Z_BIT_COUNT; // 20
const Y_SHIFT = Z_BIT_COUNT;               // 12
const Z_SHIFT = 0;                         // for clarity

export const ChunkSystem = () => {
  const chunks= new Map();

  const setVoxel = (x, y, z, voxel) => {
    //get chunk;
    const chunkKey = coordsToChunkKey(x, y, z);

    let chunk = chunks.get(chunkKey);;

    if (!chunk) {
      chunk = createChunk(); 
      chunks.set(chunkKey, chunk);
    }

    chunk[getIndex(x, y, z)] = voxel;
  };

  const getVoxel = (x, y, z) => {
    const chunkKey = coordsToChunkKey(x, y, z);
    const chunk = chunks.get(chunkKey);
    if (!chunk) return 0;
    return chunk[getIndex(x, y, z)];
  };

  const showChunkAt = (x, y, z) => {
    //get chunk;
    const chunkKey = coordsToChunkKey(x, y, z);

    let chunk = null;

    if (chunks.has(chunkKey)) {
      console.log(chunks.get(chunkKey)?.toString());
    } else {
      console.log(`No chunk at ${x}, ${y}, ${z}.`);
    }
  };

  const deleteChunkAt = (x, y, z) => {
    const chunkKey = coordsToChunkKey(x, y, z);
    chunks.delete(chunkKey);
  };

  return {
    setVoxel,
    getVoxel,
    deleteChunkAt,
    showChunkAt,
  };
};

//Get the local x, y, z
//"& 15" is functionally identical to the % 16 but faster
const getIndex = (x, y, z) =>
  ((y & BINARY15) << SHIFTOVER8) | ((z & BINARY15) << SHIFTOVER4) | (x & BINARY15);

const createChunk = () => {
  return new Uint16Array(arraySize);
};

/**
 * Packs chunk coordinates (x, y, z) into a 32-bit integer key.
 * Assumes x, y, z are world coordinates and shifts them down to chunk level (by 16).
 * Throws an error if any coordinate is negative.
 * 
 * Limits chunk grid to 4096×256×4096
 * 12 | 8 | 12 = 32 bit number
 * this crams x, y, z into one number for the key.
 * XXXXXXXXXXXXYYYYYYYYZZZZZZZZZZZZ
 */
export function coordsToChunkKey(x, y, z) {
  // if (x < 0 || y < 0 || z < 0) {
  //   throw new Error("coordsToChunkKey: negative coordinates are not supported");
  // }

  const chunkX = (x >> 4) & X_MASK;
  const chunkY = (y >> 4) & Y_MASK;
  const chunkZ = (z >> 4) & Z_MASK;

  return (chunkX << X_SHIFT) | (chunkY << Y_SHIFT) | (chunkZ << Z_SHIFT);
}
