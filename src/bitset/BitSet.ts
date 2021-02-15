import { Read } from "./Read.ts";
import { Write } from "./Write.ts";

export class BitSet {
    private _buffer: number[] = [];
    private _position = 0;

    readonly write: Write = new Write(this);
    readonly read: Read = new Read(this);

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
}
