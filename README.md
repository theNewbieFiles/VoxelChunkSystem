# Voxel Storage System  

A high-performance, memory-efficient voxel storage system using chunk-based architecture and bit-packing. Designed to handle massive voxel worlds with low memory overhead, fast lookups, and packed voxel attributes (type, visibility, lock state).  

## Features  
- **Chunk-Based Architecture** – Divides the world into fixed-size chunks 16×16×16 for efficient memory and lookup operations.  
- **Bit-Packed Storage** – Stores voxel attributes in a compact Uint16Array to minimize memory usage.  
- **Packed Coordinates** – Combines chunk coordinates into a single 32-bit integer key for fast retrieval.  
- **Voxel Attributes** – Supports type IDs, visibility flags, lock state, and future custom flags.  
- **Scalable Design** – Handles worlds up to 4096 × 256 × 4096 chunks.  

## Voxel Format (16-bit)  
Each voxel is stored in a 16-bit integer with the following bit layout:   
`[1 bit]` Lock flag (bit 15)  
`[3 bits]` Reserved / custom flags (bits 12–14)  
`[1 bit]` Visibility flag (bit 11)  
`[11 bits]` Type ID (bits 0–10, up to 2048 types)  
