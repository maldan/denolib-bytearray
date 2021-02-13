import { Write } from "./Write.ts";

export class BitSet {
    private _buffer: number[] = [];
    position = 0;

    readonly write: Write = new Write(this);

    get buffer(): number[] {
        return this._buffer;
    }
}
