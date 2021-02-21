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
     * Reads `1` byte from buffer and shifts position by `1`.
     * But you can get bit values. For example you have a byte `0xF2`.
     * One half have of it is `F` and the other is `2`.
     * Instead of manually decoding byte by bit operations
     * you call `byteByBits(4, 4)` and get the array `[0xF, 0x2]`.
     * The amount of arguments can be any but the sum of bits
     * must be in range between `1` and `8`.
     * @param {number[]} bits
     */
    byteByBits(...bits: number[]): number[] {
        const sum = bits.reduce((p, c) => p + c, 0);
        if (sum > 8 || sum <= 0) {
            throw new Error(`Sum of bits must be in range between 1 and 8`);
        }
        const c = this.uint8();
        const cAsBits = [];
        for (let i = 0; i < 8; i++) {
            cAsBits.push((c & Math.pow(2, i)) >> i);
        }

        const out: number[] = [];
        for (let i = 0; i < bits.length; i++) {
            if (bits[i] <= 0) {
                throw new Error(`Invalid bit size!`);
            }
            const tBits = cAsBits.slice(0, bits[i]);
            out.push(tBits.reduce((p, c, i) => p + c * Math.pow(2, i), 0));
            cAsBits.splice(0, bits[i]);
        }
        return out;
    }

    /**
     * Reads `1` byte from buffer and shifts position by `1`.
     * **`Uint8`** is a number between `0` and `255`.
     */
    uint8(): number {
        return this._byteSet.buffer[this._byteSet.position++];
    }

    /**
     * Reads `1` byte from buffer and shifts position by `1`.
     * **`Int8`** is a number between `-128` and `127`.
     */
    int8(): number {
        return (this.uint8() << 24) >> 24;
    }

    /**
     * Reads `2` bytes from buffer and shifts position by `2`.
     * **`Uint16`** is a number between `0` and `65535`.
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
     * Reads `2` bytes from buffer and shifts position by `2`.
     * **`Int16`** is a number between `-32768` and `32767`.
     */
    int16(): number {
        return (this.uint16() << 16) >> 16;
    }

    /**
     * Reads `3` bytes from buffer and shifts position by `3`.
     * **`Uint24`** is a number between `0` and `16777215`.
     * Often used for rgb colors. So I think there is no point for **`Int24`**.
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
     * Reads `4` bytes from buffer and shifts position by `4`.
     * **`Uint32`** is a number between `0` and `4294967295`.
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
     * Reads `4` bytes from buffer and shifts position by `4`.
     * **`Int32`** is a number between `-2147483648` and `2147483647`.
     */
    int32(): number {
        return (this.uint32() << 0) >> 0;
    }

    /**
     * Reads `4` bytes from buffer shifts position by `4`.
     * **`Float32`** is a number with `32` bits precision.
     */
    float32(): number {
        return this.float32Array(1)[0];
    }

    /**
     * Reads `8` bytes from buffer shifts position by `8`.
     * **`Float64`** is a number with `64` bits precision (aka double).
     */
    float64(): number {
        return this.float64Array(1)[0];
    }

    /**
     * Reads `utf-8` string from buffer. If you pass number for example `3` it will
     * read `3` bytes and shifts position by `3`. Then it converts bytes into string and returns.
     * Be aware it reads bytes not characters! So the string `привет` has `12` bytes because each
     * of this character is `2` bytes length. If you pass `LengthType` parameter instead of `number`
     * function will reads string with automatic length. For example `LengthType.Uint8` will read
     * `1` byte before string and it will be the length of the string.
     * @param {(number|LengthType)} length - How much bytes to read.
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
     * Reads `n` bytes from buffer and returns it as `Uint8Array`. Shifts position by `n`.
     * The length can be specific if you pass a `number`. But if an array was stored with
     * length information you can pass `LengthType` and read length automatically.
     *
     * For example if you write an array like `uintArray8(arr, LengthType.Uint8);` you can
     * read it with `uint8Array(LengthType.Uint8);`.
     * But you can't pass `LengthType.Uint16` if it was stored
     * with `LengthType.Uint8`. The types must be matched.
     * @param {(number|LengthType)} length - How much bytes to read.
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
     * Same as `uint8Array`. The difference is `uint8Array` has numbers between `0` and `255`.
     * But `int8Array` has numbers between `-128` and `127`.
     * @param {(number|LengthType)} length - How much bytes to read.
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

    /**
     * Same as `uint8Array`. The difference is `uint8Array` has numbers between `0` and `255`.
     * But `uint16Array` has numbers between `0` and `65535`.
     * @param {(number|LengthType)} length - How much bytes to read.
     */
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

    /**
     * Same as `uint8Array`. The difference is `uint8Array` has numbers between `0` and `255`.
     * But `int16Array` has numbers between `-32768` and `32767`.
     * @param {(number|LengthType)} length - How much bytes to read.
     */
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

    /**
     * Same as `uint8Array`. The difference is `uint8Array` has numbers between `0` and `255`.
     * But `uint32Array` has numbers between `0` and `4294967295`.
     * @param {(number|LengthType)} length - How much bytes to read.
     */
    uint32Array(length: number | LengthType = LengthType.None): Uint32Array {
        if (typeof length === "number") {
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + length * 4
            );
            const arr = new Uint32Array(slice, 0, length);
            this._byteSet.position += length * 4;
            return arr;
        } else {
            const realLength = this.lengthByType(length);

            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + realLength * 4
            );
            const arr = new Uint32Array(slice, 0, realLength);
            this._byteSet.position += realLength * 4;
            return arr;
        }
    }

    /**
     * Same as `uint8Array`. The difference is `uint8Array` has numbers between `0` and `255`.
     * But `int32Array` has numbers between `-2147483648` and `2147483647`.
     * @param {(number|LengthType)} length - How much bytes to read.
     */
    int32Array(length: number | LengthType = LengthType.None): Int32Array {
        if (typeof length === "number") {
            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + length * 4
            );

            this._byteSet.position += length * 4;
            return new Int32Array(slice, 0, length);
        } else {
            const realLength = this.lengthByType(length);

            const slice = this._byteSet.buffer.buffer.slice(
                this._byteSet.position,
                this._byteSet.position + realLength * 4
            );

            this._byteSet.position += realLength * 4;
            return new Int32Array(slice, 0, realLength);
        }
    }

    /**
     * The same as `uint8Array`. The difference is `uint8Array` has numbers between `0` and `255`.
     * But `float32Array` has float32 numbers.
     * @param {(number|LengthType)} length - How much bytes to read.
     */
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

    /**
     * The same as `uint8Array`. The difference is `uint8Array` has numbers between `0` and `255`.
     * But `float64Array` has float64 numbers.
     * @param {(number|LengthType)} length - How much bytes to read.
     */
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

    /**
     * Same as `forEach` function. If you pass `NumberType.Uint8` it will read
     * each byte. If you pass `NumberType.Uint16` it will read each `uint16` and etc.
     * It will read from the current position not from the start.
     * By defaultt it will read until the end. If you pass limit as `2` it will
     * read only 2 element. Be aware limit means iterations not bytes!.
     * @param {NumberType} numberType - How mush to read by one iteration.
     * @param {Function} fn - Will run each iteration
     * @param {number} limit - How much iterations to read. `0` - no limit.
     */
    each(numberType: NumberType, fn: (x: number, p: number) => void, limit = 0) {
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
            if (limit > 0 && read >= limit) {
                break;
            }
            fn(readFunction(), read++);
        }
    }
}
