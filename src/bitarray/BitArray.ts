import { Read } from "./Read.ts";
import { Write } from "./Write.ts";

export class BitArray {
    private _buffer: number[] = [];
    private _position = 0;

    readonly write: Write = new Write(this);
    readonly read: Read = new Read(this);

    get length(): number {
        return this._buffer.length;
    }

    get position(): number {
        return this._position;
    }

    set position(val: number) {
        this._position = val;
        if (this._position > this.buffer.length) throw new Error("Out of range");
    }

    get buffer(): number[] {
        return this._buffer;
    }

    toUint8Array(): Uint8Array {
        const arr = new Uint8Array(Math.ceil(this._buffer.length / 8));
        const padding = arr.length * 8 - this._buffer.length;

        const lastPosition = this.position;
        this.position = 0;
        for (let i = 0; i < arr.length - 1; i++) {
            arr[i] = this.read.uint8();
        }
        arr[arr.length - 1] = this.read.number(8 - padding);
        this.position = lastPosition;

        return arr;
    }
}
