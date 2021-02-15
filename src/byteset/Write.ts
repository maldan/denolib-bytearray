import { ByteSet, LengthType } from "./ByteSet.ts";

export class Write {
    private _byteSet: ByteSet;

    constructor(byteSet: ByteSet) {
        this._byteSet = byteSet;
    }

    /**
     * Write length info by length type
     * @param {LengthType} type
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
     * Writes a byte and shifts position by 1. Uint8 is a number between 0 and 255.
     * It won't throw an exception if you try to write for example 256.
     * If you write a value larger than a byte it simply cuts it to byte.
     * For example if you write 256 than value will be 1.
     * @param {number} value
     */
    uint8(value: number): Write {
        this._byteSet.buffer[this._byteSet.position++] = value;
        return this;
    }

    /**
     * Same as uint8. There is no difference. Just for convenience.
     * @param {number} number
     */
    int8(value: number): Write {
        return this.uint8(value);
    }

    /**
     * Writes a 2 bytes value and shifts position by 2. Uint16 is a number between 0 and 65535.
     * Same logic as uint8 for out of range numbers.
     * @param {number} number
     */
    uint16(value: number): Write {
        // Write to buffer
        if (this._byteSet.order === "little") {
            this._byteSet.buffer[this._byteSet.position++] = value & 0xff;
            this._byteSet.buffer[this._byteSet.position++] = value >> 8;
        } else throw new Error(`Not supported yet`);

        return this;
    }

    /**
     * Same as uint16. There is no difference. Just for convenience.
     * @param {number} number
     */
    int16(value: number): Write {
        return this.uint16(value);
    }

    /**
     * Writes a 4 bytes value and shifts position by 4. Uint32 is a number between 0 and 4294967295.
     * Same logic as uint8 for out of range numbers.
     * @param {number} number
     */
    uint32(value: number): Write {
        // Write to buffer
        if (this._byteSet.order === "little") {
            this._byteSet.buffer[this._byteSet.position++] = value & 0xff;
            this._byteSet.buffer[this._byteSet.position++] = (value >> 8) & 0xff;
            this._byteSet.buffer[this._byteSet.position++] = (value >> 16) & 0xff;
            this._byteSet.buffer[this._byteSet.position++] = value >> 24;
        } else throw new Error(`Not supported yet`);

        return this;
    }

    /**
     * Same as uint32. There is no difference. Just for convenience.
     * @param {number} number
     */
    int32(value: number): Write {
        return this.uint32(value);
    }

    /**
     * Writes a float number with 4 bytes length and shifts position by 4.
     * @param {number} value
     */
    float32(value: number): Write {
        this.float32Array(new Float32Array([value]));
        return this;
    }

    /**
     * Writes a float (double) number with 8 bytes length and shifts position by 8.
     * @param {number} value
     */
    float64(value: number): Write {
        this.float64Array(new Float64Array([value]));
        return this;
    }

    /**
     * Writes string. Shifts position by string length.
     * You can write utf8 strings, the function will automatically count length in bytes.
     * The second parameter means the size of length.
     * For example a.write.string("abc", LengthType.Uint8); will put 1 byte + 3 bytes of string. So it means
     * max length of string is 255. By default it won't store length info so string can be any length.
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
     * Writes Uint8Array and shifts position by array length. By default function won't store length information.
     * But you can use second parameter for this. If you pass LengthType.Uint8 you can store up until 255 values.
     * In this case function put byte before an array. If you pass uint16 you can store up until 65535 values and
     * function put 2 bytes before array. The same for uint32. It means size of "length".
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
     * Writes Int8Array and offsets position by array length. The same logic for second parameter as in uint8Array.
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
     * Writes Uint16Array and offsets position by array length * 2. The same logic for second parameter as in uint8Array.
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
     * Writes Int16Array and offsets position by array length * 2. The same logic for second parameter as in uint8Array.
     * @param {Int16Array} array
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
     * Writes Uint32Array and offset positions by array length * 4. The same logic for second parameter as in uint8Array.
     * @param {Uint32Array} array
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
     * Writes Int32Array and offset positions by array length * 4. The same logic for second parameter as in uint8Array.
     * @param {Int32Array} array
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
     * Writes Float32Array and offsets position by array length * 4. The same logic for second parameter as in uint8Array.
     * @param {Float32Array} array
     * @param {LengthType} lengthType
     */
    float32Array(array: Float32Array, lengthType: LengthType = LengthType.None): Write {
        this.uint8Array(new Uint8Array(array.buffer), lengthType);
        return this;
    }

    /**
     * Writes Float64Array and offsets position by array length * 8. The same logic for second parameter as in uint8Array.
     * @param {Float64Array} array
     * @param {LengthType} lengthType
     */
    float64Array(array: Float64Array, lengthType: LengthType = LengthType.None): Write {
        this.uint8Array(new Uint8Array(array.buffer), lengthType);
        return this;
    }
}
