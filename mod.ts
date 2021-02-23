/**
 * Information about how much bytes needs for store length of array.
 */
export enum LengthType {
    None = "none",
    Uint8 = "uint8",
    Uint16 = "uint16",
    Uint32 = "uint32",
}

/**
 * Contains type of a number.
 * Is it unsigned or signed?
 * How much bits need to represent a number?
 */
export enum NumberType {
    Uint8 = "uint8",
    Uint16 = "uint16",
    Uint24 = "uint24",
    Uint32 = "uint32",
    Int8 = "int8",
    Int16 = "int16",
    Int32 = "int32",
}

/**
 * Order of bytes
 */
export enum Endianness {
    /**
     * Big Endian
     */
    BE = "big",
    /**
     * Little Endian
     */
    LE = "little",
}

export * from "./src/byteset/ByteSet.ts";
export * from "./src/bytearray/ByteArray.ts";
export * from "./src/bitarray/BitArray.ts";
