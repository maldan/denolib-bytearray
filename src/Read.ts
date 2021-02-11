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
        return (
            this._byteSet.buffer[this._byteSet.position++] * 256 +
            this._byteSet.buffer[this._byteSet.position++]
        );
    }

    uint32(): number {
        return (
            this._byteSet.buffer[this._byteSet.position++] * 16777216 +
            this._byteSet.buffer[this._byteSet.position++] * 65536 +
            this._byteSet.buffer[this._byteSet.position++] * 256 +
            this._byteSet.buffer[this._byteSet.position++]
        );
    }

    floatArray(length: number): Float32Array {
        const arr = new Float32Array(
            this._byteSet.buffer.slice(this._byteSet.position, this._byteSet.position + length)
        );
        this._byteSet.position += length;
        return arr;
        /*return (
            this._byteSet.buffer[this._byteSet.position++] * 16777216 +
            this._byteSet.buffer[this._byteSet.position++] * 65536 +
            this._byteSet.buffer[this._byteSet.position++] * 256 +
            this._byteSet.buffer[this._byteSet.position++]
        );*/
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
