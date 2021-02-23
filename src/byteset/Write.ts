import { Endianness, LengthType } from "../../mod.ts";
import { ByteSet } from "./ByteSet.ts";

export class Write {
    private _byteSet: ByteSet;

    constructor(byteSet: ByteSet) {
        this._byteSet = byteSet;
    }

    /**
     * Write length info by length type
     * @param {LengthType} type
     * @param {number} length
     */
    private lengthByType(type: LengthType, length: number) {
        if (type === LengthType.Uint8) {
            if (length > 255) {
                throw new Error(
                    `You pass LengthType as Uint8 but actual length is more than Uint8 can store.`
                );
            }
            this.uint8(length);
        }
        if (type === LengthType.Uint16) {
            if (length > 65535) {
                throw new Error(
                    `You pass LengthType as Uint16 but actual length is more than Uint16 can store.`
                );
            }
            this.uint16(length);
        }
        if (type === LengthType.Uint32) {
            if (length > 4294967295) {
                throw new Error(
                    `You pass LengthType as Uint32 but actual length is more than Uint32 can store.`
                );
            }
            this.uint32(length);
        }
    }

    /**
     * Writes `1` byte and shifts position by `1`. **`Uint8`** is a number between `0` and `255`.
     * It won't throw an exception if you try to write for example `256`.
     * If you write a value larger than a byte it simply cuts it to byte.
     * For example if you write `256` than value will be `1`.
     * @param {number} value
     */
    uint8(value: number): Write {
        const p = this._byteSet.position++;
        this._byteSet.setValue(p, value);
        return this;
    }

    /**
     * Same as `uint8`. There is no difference. Just for convenience.
     * @param {number} number
     */
    int8(value: number): Write {
        return this.uint8(value);
    }

    /**
     * Writes a `2` bytes value and shifts position by `2`. **`Uint16`** is a number between `0` and `65535`.
     * Same logic as `uint8` for out of range numbers.
     * @param {number} number
     */
    uint16(value: number): Write {
        const p1 = this._byteSet.position++;
        const p2 = this._byteSet.position++;

        // Write to buffer
        if (this._byteSet.endianness === Endianness.LE) {
            this._byteSet.setValue(p1, value & 0xff);
            this._byteSet.setValue(p2, value >> 8);
        } else {
            this._byteSet.setValue(p1, value >> 8);
            this._byteSet.setValue(p2, value & 0xff);
        }

        return this;
    }

    /**
     * Same as `uint16`. There is no difference. Just for convenience.
     * @param {number} number
     */
    int16(value: number): Write {
        return this.uint16(value);
    }

    /**
     * Writes a `3` bytes value and shifts position by `3`. **`Uint24`** is a number between `0` and `16777215`.
     * Same logic as `uint8` for out of range numbers.
     * @param {number} number
     */
    uint24(value: number): Write {
        const p1 = this._byteSet.position++;
        const p2 = this._byteSet.position++;
        const p3 = this._byteSet.position++;

        // Write to buffer
        if (this._byteSet.endianness === Endianness.LE) {
            this._byteSet.setValue(p1, value & 0xff);
            this._byteSet.setValue(p2, (value >> 8) & 0xff);
            this._byteSet.setValue(p3, (value >> 16) & 0xff);
        } else {
            this._byteSet.setValue(p1, (value >> 16) & 0xff);
            this._byteSet.setValue(p2, (value >> 8) & 0xff);
            this._byteSet.setValue(p3, value & 0xff);
        }

        return this;
    }

    /**
     * Writes a `4` bytes value and shifts position by `4`. **`Uint32``* is a number between `0` and `4294967295`.
     * Same logic as `uint8` for out of range numbers.
     * @param {number} number
     */
    uint32(value: number): Write {
        const p1 = this._byteSet.position++;
        const p2 = this._byteSet.position++;
        const p3 = this._byteSet.position++;
        const p4 = this._byteSet.position++;

        if (this._byteSet.endianness === Endianness.LE) {
            this._byteSet.setValue(p1, value & 0xff);
            this._byteSet.setValue(p2, (value >> 8) & 0xff);
            this._byteSet.setValue(p3, (value >> 16) & 0xff);
            this._byteSet.setValue(p4, value >> 24);
        } else {
            this._byteSet.setValue(p1, value >> 24);
            this._byteSet.setValue(p2, (value >> 16) & 0xff);
            this._byteSet.setValue(p3, (value >> 8) & 0xff);
            this._byteSet.setValue(p4, value & 0xff);
        }

        return this;
    }

    /**
     * Same as `uint32`. There is no difference. Just for convenience.
     * @param {number} number
     */
    int32(value: number): Write {
        return this.uint32(value);
    }

    /**
     * Writes a float number with `4` bytes length and shifts position by `4`.
     * @param {number} value
     */
    float32(value: number): Write {
        this.float32Array(new Float32Array([value]));
        return this;
    }

    /**
     * Writes a `float` (double) number with `8` bytes length and shifts position by `8`.
     * @param {number} value
     */
    float64(value: number): Write {
        this.float64Array(new Float64Array([value]));
        return this;
    }

    /**
     * Writes `utf8` string. Shifts position by string length in bytes.
     * The second parameter means the size of length.
     * For example `string("abc", LengthType.Uint8);` will put `1` byte + `3` bytes of string.
     * It means the first byte (uint8) will containt length of string.
     * By default it won't store length info so string can be any length.
     * @param {string} str
     * @param {LengthType} lengthType
     */
    string(str: string, lengthType: LengthType = LengthType.None): Write {
        const byteStr = new TextEncoder().encode(str);
        this.lengthByType(lengthType, byteStr.length);
        for (let i = 0; i < byteStr.length; i++) {
            this.uint8(byteStr[i]);
        }

        return this;
    }

    /**
     * Writes `Uint8Array` and shifts position by array length. By default function won't store length information.
     * If you pass `LengthType.Uint8` you can store up until `255` values.
     * In this case function put a byte before an array. If you pass `LengthType.Uint16`
     * you can store up until `65535` values and function put `2` bytes before array.
     * The same for `Uint32`.
     * @param {Uint8Array} array
     * @param {LengthType} lengthType
     */
    uint8Array(array: Uint8Array, lengthType: LengthType = LengthType.None): Write {
        this.lengthByType(lengthType, array.length);
        for (let i = 0; i < array.length; i++) {
            this.uint8(array[i]);
        }
        return this;
    }

    /**
     * Same as `Uint8Array` but for `Int8Array`.
     * @param {Int8Array} array
     * @param {LengthType} lengthType
     */
    int8Array(array: Int8Array, lengthType: LengthType = LengthType.None): Write {
        this.lengthByType(lengthType, array.length);
        for (let i = 0; i < array.length; i++) {
            this.int8(array[i]);
        }
        return this;
    }

    /**
     * Same as `Uint8Array` but for `Uint16Array`. You need `2` bytes for each element.
     * @param {Uint16Array} array
     * @param {LengthType} lengthType
     */
    uint16Array(array: Uint16Array, lengthType: LengthType = LengthType.None): Write {
        this.lengthByType(lengthType, array.length);
        for (let i = 0; i < array.length; i++) {
            this.uint16(array[i]);
        }
        return this;
    }

    /**
     * Same as `Uint8Array` but for `Int16Array`. You need `2` bytes for each element.
     * @param {Uint16Array} array
     * @param {LengthType} lengthType
     */
    int16Array(array: Int16Array, lengthType: LengthType = LengthType.None): Write {
        this.lengthByType(lengthType, array.length);
        for (let i = 0; i < array.length; i++) {
            this.int16(array[i]);
        }
        return this;
    }

    /**
     * Same as `Uint8Array` but for `Uint32Array`. You need `4` bytes for each element.
     * @param {Uint16Array} array
     * @param {LengthType} lengthType
     */
    uint32Array(array: Uint32Array, lengthType: LengthType = LengthType.None): Write {
        this.lengthByType(lengthType, array.length);
        for (let i = 0; i < array.length; i++) {
            this.uint32(array[i]);
        }
        return this;
    }

    /**
     * Same as `Uint8Array` but for `Int32Array`. You need `4` bytes for each element.
     * @param {Uint16Array} array
     * @param {LengthType} lengthType
     */
    int32Array(array: Int32Array, lengthType: LengthType = LengthType.None): Write {
        this.lengthByType(lengthType, array.length);
        for (let i = 0; i < array.length; i++) {
            this.int32(array[i]);
        }
        return this;
    }

    /**
     * Same as `Uint8Array` but for `Float32Array`. You need `4` bytes for each element.
     * @param {Uint16Array} array
     * @param {LengthType} lengthType
     */
    float32Array(array: Float32Array, lengthType: LengthType = LengthType.None): Write {
        this.uint8Array(new Uint8Array(array.buffer), lengthType);
        return this;
    }

    /**
     * Same as `Uint8Array` but for `Float64Array`. You need `8` bytes for each element.
     * @param {Uint16Array} array
     * @param {LengthType} lengthType
     */
    float64Array(array: Float64Array, lengthType: LengthType = LengthType.None): Write {
        this.uint8Array(new Uint8Array(array.buffer), lengthType);
        return this;
    }

    /*putUInt64(number: number) {
        const big = ~~(number / 0x0100000000);
        const low = number % 0x0100000000;

        if (this._order === "big") {
            this.putUInt32(big);
            this.putUInt32(low);
        } else {
            this.putUInt32(low);
            this.putUInt32(big);
        }
    }

    getUInt64() {
        let l = this.getUInt32();
        let h = this.getUInt32();
        return h + l * 0x0100000000;
    }*/
}
