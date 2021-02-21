import { Write } from "./Write.ts";
import { Read } from "./Read.ts";

/**
 * This is wrapper for Uint8Array for better work with bytes. ByteSet
 * can't be expanded at runtime and always has fixed size. But you
 * can write and read value from it. The exception will occur if you
 * try to write more data than ByteSet capacity has.
 */
export class ByteSet {
    private _buffer: Uint8Array;
    private _capacity: number;
    private _position: number;
    private _order: string;

    /**
     * Write interface
     */
    readonly write: Write = new Write(this);

    /**
     * Read interface
     */
    readonly read: Read = new Read(this);

    /**
     * Creates new `ByteSet`
     * @param {number} capacity - The size of array
     * @param {string} order - Endiand order of bytes. The values "little" or "big"
     */
    constructor(capacity: number = 0, order: "little" | "big" = "little") {
        this._capacity = capacity;
        this._position = 0;
        this._order = order;
        this._buffer = new Uint8Array(capacity);
    }

    /**
     * Get current position in array
     */
    get position(): number {
        return this._position;
    }

    /**
     * Set new position in array.
     * If position overflow capacity it will throw an exception.
     */
    set position(val: number) {
        this._position = val;
        if (this._position > this._capacity) {
            throw new Error("Out of range");
        }
    }

    /**
     * Get raw `Uint8Array` buffer.
     */
    get buffer(): Uint8Array {
        return this._buffer;
    }

    /**
     * Overwrites current raw buffer with new. It will reset position to `0` and
     * set new capacity based on buffer length.
     * @param {Uint8Array} buffer
     */
    set buffer(buffer: Uint8Array) {
        this._buffer = buffer;
        this._position = 0;
        this._capacity = buffer.length;
    }

    /**
     * Get length/capacity of this array.
     */
    get length(): number {
        return this._buffer.length;
    }

    /**
     * Get current bytes endian
     */
    get order(): string {
        return this._order;
    }

    /**
     * Returns `true` is position reaches end.
     */
    get isEnd(): boolean {
        return this._position === this._capacity;
    }

    /**
     * Create new `ByteSet` from `Uint8Array` or `ArrayBuffer`
     * @param {(Uint8Array | ArrayBuffer)} buffer
     * @param {string} order - "big" or "little"
     */
    static from(buffer: Uint8Array | ArrayBuffer, order: "little" | "big" = "little"): ByteSet {
        if (buffer instanceof ArrayBuffer) {
            return this.from(new Uint8Array(buffer), order);
        } else {
            const temp = new ByteSet(buffer.length, order);
            temp.buffer = buffer;
            return temp;
        }
    }

    /**
     * Same as common forEach function for arrays and strings.
     * It goes for the start, read each byte but don't shift the position.
     * @param {Function} fn
     */
    forEach(fn: (x: number) => void) {
        this.buffer.forEach(fn);
    }

    /**
     * Same as common slice function for arrays and strings.
     * @param {number} start
     * @param {number} end
     */
    slice(start: number, end?: number) {
        return ByteSet.from(this.buffer.slice(start, end));
    }

    /**
     * Prints the buffer in console.
     * Each row contains max `rowSize` bytes (by default `16`) in hex.
     * Also current position in array highlights with red color.
     */
    print(rowSize = 16) {
        let out = "| ";
        this.buffer.forEach((x, i) => {
            const code = ("00" + x.toString(16)).slice(-2).toUpperCase();
            if (i === this.position) {
                out += "\u001b[41m" + code + "\u001b[0m ";
            } else {
                out += code + " ";
            }

            if ((i + 1) % rowSize === 0) out += "| \n| ";
        });
        console.log(out);
    }
}
