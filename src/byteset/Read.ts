import { LengthType, NumberType } from "../../mod.ts";
import { ByteSet } from "./ByteSet.ts";

export class Read {
    private _byteSet: ByteSet;

    constructor(byteSet: ByteSet) {
        this._byteSet = byteSet;
    }

    /**
     * Returns length by length type
     * @param {string} type
     */
    private lengthByType(type: LengthType): number {
        if (type === "uint8") {
            return this.uint8();
        } else if (type === "uint16") {
            return this.uint16();
        } else if (type === "uint32") {
            return this.uint32();
        } else throw new Error(`Unknown type`);
    }

    /**
     * Reads a byte from buffer and shifts position by 1. Number between 0 and 255.
     */
    uint8(): number {
        return this._byteSet.buffer[this._byteSet.position++];
    }

    /**
     * Reads a byte from buffer and shifts position by 1. Number between -128 and 127.
     */
    int8(): number {
        return (this.uint8() << 24) >> 24;
    }

    /**
     * Reads 2 bytes from buffer and shifts position by 2. Number between 0 and 65535.
     */
    uint16(): number {
        if (this._byteSet.order === "little") {
            return (
                this._byteSet.buffer[this._byteSet.position++] +
                this._byteSet.buffer[this._byteSet.position++] * 256
            );
        } else {
            return (
                this._byteSet.buffer[this._byteSet.position++] * 256 +
                this._byteSet.buffer[this._byteSet.position++]
            );
        }
    }

    /**
     * Reads 2 bytes from buffer and shifts position by 2. Number between -32768 and 32767.
     */
    int16(): number {
        return (this.uint16() << 16) >> 16;
    }

    /**
     * Reads 3 bytes from buffer and shifts position by 3. Number between 0 and 16777215.
     */
    uint24(): number {
        if (this._byteSet.order === "little") {
            return (
                this._byteSet.buffer[this._byteSet.position++] +
                this._byteSet.buffer[this._byteSet.position++] * 256 +
                this._byteSet.buffer[this._byteSet.position++] * 65536
            );
        } else {
            return (
                this._byteSet.buffer[this._byteSet.position++] * 65536 +
                this._byteSet.buffer[this._byteSet.position++] * 256 +
                this._byteSet.buffer[this._byteSet.position++]
            );
        }
    }

    /**
     * Reads 4 bytes from buffer and shifts position by 4. Number between 0 and 4294967295.
     */
    uint32(): number {
        if (this._byteSet.order === "little") {
            return (
                this._byteSet.buffer[this._byteSet.position++] +
                this._byteSet.buffer[this._byteSet.position++] * 256 +
                this._byteSet.buffer[this._byteSet.position++] * 65536 +
                this._byteSet.buffer[this._byteSet.position++] * 16777216
            );
        } else {
            return (
                this._byteSet.buffer[this._byteSet.position++] * 16777216 +
                this._byteSet.buffer[this._byteSet.position++] * 65536 +
                this._byteSet.buffer[this._byteSet.position++] * 256 +
                this._byteSet.buffer[this._byteSet.position++]
            );
        }
    }

    /**
     * Reads 4 bytes from buffer and shifts position by 4. Number between -2147483648 and 2147483647.
     */
    int32(): number {
        return (this.uint32() << 0) >> 0;
    }

    /**
     * Reads 4 bytes from buffer shifts position by 4. Float number with 32 bits precision.
     */
    float32(): number {
        return this.float32Array(1)[0];
    }

    /**
     * Reads 8 bytes from buffer shifts position by 8. Float number with 64 bits precision (aka double).
     */
    float64(): number {
        return this.float64Array(1)[0];
    }

    /**
     * Read string with automatic length of specific. By default it reads first 4 bytes for length info.
     * Then it reads remaind bytes. If you pass actual number it will read only n bytes. For example
     * a.read.string(1) will read 1 byte of string. Shifts position by length info + string bytes length.
     * @param {number|string} length - Actual length or uint8 | uint16 | uint32
     */
    string(length: number | LengthType = LengthType.Uint32): string {
        if (typeof length === "number") {
            const str = new TextDecoder().decode(
                this._byteSet.buffer.slice(this._byteSet.position, this._byteSet.position + length)
            );
            this._byteSet.position += length;
            return str;
        } else {
            const len = this.lengthByType(length);
            const str = new TextDecoder().decode(
                this._byteSet.buffer.slice(this._byteSet.position, this._byteSet.position + len)
            );
            this._byteSet.position += len;
            return str;
        }
    }

    /**
     * Reads n bytes from buffer and returns it as uint8Array. Shifts position by n.
     * The length can be specific if you pass a number. But if an array was stored with
     * length information you can pass the size of length and read it automatically.
     * For example if you write an array like a.write.uintArray8(arr, "uint8"); you can
     * read it as a.read.uintArray8("uint8"); But you can't pass "uint16" if it was stored
     * with uint8. The types must be matched.
     * @param {number|string} length - Actual length or uint8 | uint16 | uint32
     */
    uint8Array(length: number | LengthType = LengthType.None): Uint8Array {
        if (typeof length === "number") {
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + length
            );
            this._byteSet.position += length;
            return new Uint8Array(slice);
        } else {
            const realLength = this.lengthByType(length);

            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + realLength
            );
            this._byteSet.position += realLength;
            return new Uint8Array(slice);
        }
    }

    /**
     * The same as uint8Array. The difference is uint8Array has numbers between 0 and 255.
     * But int8Array has numbers between -128 and 127.
     * @param {number|string} length - Actual length or uint8 | uint16 | uint32
     */
    int8Array(length: number | LengthType = LengthType.None): Int8Array {
        if (typeof length === "number") {
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + length
            );
            this._byteSet.position += length;
            return new Int8Array(slice);
        } else {
            const realLength = this.lengthByType(length);

            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + realLength
            );
            this._byteSet.position += realLength;
            return new Int8Array(slice);
        }
    }

    uint16Array(length: number | LengthType = LengthType.None): Uint16Array {
        if (typeof length === "number") {
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + length * 2
            );
            const arr = new Uint16Array(slice, 0, length);
            this._byteSet.position += length * 2;
            return arr;
        } else {
            const realLength = this.lengthByType(length);

            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + realLength * 2
            );
            const arr = new Uint16Array(slice, 0, realLength);
            this._byteSet.position += realLength * 2;
            return arr;
        }
    }

    int16Array(length: number | LengthType = LengthType.None): Int16Array {
        if (typeof length === "number") {
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + length * 2
            );

            this._byteSet.position += length * 2;
            return new Int16Array(slice, 0, length);
        } else {
            const realLength = this.lengthByType(length);

            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + realLength * 2
            );

            this._byteSet.position += realLength * 2;
            return new Int16Array(slice, 0, realLength);
        }
    }

    float32Array(length: number | LengthType = LengthType.None): Float32Array {
        if (typeof length === "number") {
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + length * 4
            );
            const arr = new Float32Array(slice, 0, length);
            this._byteSet.position += length * 4;
            return arr;
        } else {
            const realLength = this.lengthByType(length);
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + realLength * 4
            );
            const arr = new Float32Array(slice, 0, realLength);
            this._byteSet.position += realLength * 4;
            return arr;
        }
    }

    float64Array(length: number | LengthType = LengthType.None): Float64Array {
        if (typeof length === "number") {
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + length * 8
            );
            const arr = new Float64Array(slice, 0, length);
            this._byteSet.position += length * 8;
            return arr;
        } else {
            const realLength = this.lengthByType(length);
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + realLength * 8
            );
            const arr = new Float64Array(slice, 0, realLength);
            this._byteSet.position += realLength * 8;
            return arr;
        }
    }

    each(numberType: NumberType, fn: (x: number, p?: number) => void, limit = 0) {
        let readFunction = this.uint8.bind(this);

        switch (numberType) {
            case NumberType.Uint8:
                readFunction = this.uint8.bind(this);
                break;
            case NumberType.Int8:
                readFunction = this.int8.bind(this);
                break;
            case NumberType.Uint16:
                readFunction = this.uint16.bind(this);
                break;
            case NumberType.Int16:
                readFunction = this.int16.bind(this);
                break;
            case NumberType.Uint24:
                readFunction = this.uint24.bind(this);
                break;
            case NumberType.Uint32:
                readFunction = this.uint32.bind(this);
                break;
            case NumberType.Int32:
                readFunction = this.int32.bind(this);
                break;
            default:
                throw new Error(`Unkown interator`);
        }

        let read = 0;
        while (!this._byteSet.isEnd) {
            if (limit > 0 && read++ >= limit) {
                break;
            }
            const p = this._byteSet.position;
            fn(readFunction(), p);
        }
    }
}
