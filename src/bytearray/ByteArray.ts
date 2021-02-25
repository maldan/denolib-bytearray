import { ByteSet, Endianness } from "../../mod.ts";

/**
 * Extended version of ByteSet. The main difference
 * is dynamic size and auto expand at runtime. It's
 * very convenient for write-only operations when you
 * don't want to calculate size of buffer.
 */
export class ByteArray extends ByteSet {
    private _reserved = 0;

    /**
     * Creates new `ByteArray`.
     * @param {number} reserved - The reserved amount of bytes.
     * @param {Endianness} order - Endiand order of bytes. The values "little" or "big"
     */
    constructor(reserved = 0, order: Endianness = Endianness.LE) {
        super(0, order);
        this._capacity = 0;
        this._reserved = 0;
    }

    /**
     * Get current position in buffer
     */
    get position(): number {
        return this._position;
    }

    /**
     * Set new position in buffer.
     * Position won't throw expection if it goes beyound limit.
     * It will automatically expand buffer.
     */
    set position(val: number) {
        this._position = val;

        // Go over capacity
        if (this._position > this._capacity) {
            this._capacity = this._position;

            // Go over reserved
            if (this._position > this._reserved) {
                if (this._reserved <= 0) {
                    this._reserved = 1;
                } else {
                    this._reserved *= 2;
                }

                // Create new buffer
                const tb = new Uint8Array(this._reserved);
                tb.set(this._buffer, 0);
                this._buffer = tb;
            }
        }
    }

    /**
     * Get sliced buffer from 0 to buffer capacity. Because actual buffer
     * is almost always bigger than you need.
     */
    get buffer(): Uint8Array {
        return this._buffer.slice(0, this._capacity);
    }
}
