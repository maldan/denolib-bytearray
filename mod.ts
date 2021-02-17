export enum LengthType {
    None = "none",
    Uint8 = "uint8",
    Uint16 = "uint16",
    Uint32 = "uint32",
}

export enum NumberType {
    Uint8 = "uint8",
    Uint16 = "uint16",
    Uint24 = "uint24",
    Uint32 = "uint32",
    Int8 = "int8",
    Int16 = "int16",
    Int32 = "int32",
}

export * from "./src/byteset/ByteSet.ts";
export * from "./src/bitarray/BitArray.ts";
