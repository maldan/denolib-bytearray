import { ByteSet } from "./ByteSet.ts";

export class Read {
    private _byteSet: ByteSet;

    constructor(byteSet: ByteSet) {
        this._byteSet = byteSet;
    }

    uint8(): number {
        return this._byteSet.buffer[this._byteSet.position++];
    }

    uint16(): number {
        if (this._byteSet.order === "little") {
            return (
                this._byteSet.buffer[this._byteSet.position++] +
                this._byteSet.buffer[this._byteSet.position++] * 256
            );
        } else throw new Error(`Not supported yet`);
    }

    uint32(): number {
        if (this._byteSet.order === "little") {
            return (
                this._byteSet.buffer[this._byteSet.position++] +
                this._byteSet.buffer[this._byteSet.position++] * 256 +
                this._byteSet.buffer[this._byteSet.position++] * 65536 +
                this._byteSet.buffer[this._byteSet.position++] * 16777216
            );
        } else throw new Error(`Not supported yet`);
    }

    uint8Array(length: number): Uint8Array {
        const slice = this._byteSet.buffer.buffer.slice(
            this._byteSet.position,
            this._byteSet.position + length
        );
        this._byteSet.position += length;
        return new Uint8Array(slice);
    }

    uint16Array(length: number): Uint16Array {
        const slice = this._byteSet.buffer.buffer.slice(
            this._byteSet.position,
            this._byteSet.position + length * 2
        );
        const arr = new Uint16Array(slice, 0, length);
        this._byteSet.position += length * 2;
        return arr;
    }

    int16Array(length: number): Int16Array {
        const slice = this._byteSet.buffer.buffer.slice(
            this._byteSet.position,
            this._byteSet.position + length * 2
        );

        // const arr = new Int16Array(slice, 0, length);
        this._byteSet.position += length * 2;
        return new Int16Array(slice, 0, length);
    }

    floatArray(length: number): Float32Array {
        const slice = this._byteSet.buffer.buffer.slice(
            this._byteSet.position,
            this._byteSet.position + length * 4
        );
        const arr = new Float32Array(slice, 0, length);
        this._byteSet.position += length * 4;
        return arr;
    }

    string(): string {
        const len = this.uint32(); // str len
        const str = new TextDecoder().decode(
            this._byteSet.buffer.slice(this._byteSet.position, this._byteSet.position + len)
        );
        this._byteSet.position += len;
        return str;
    }
}
