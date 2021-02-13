import { Write } from "./Write.ts";
import { Read } from "./Read.ts";

export class ByteSet {
    private _buffer: Uint8Array;
    private _capacity: number;
    private _position: number;
    private _order: string;

    readonly write: Write = new Write(this);
    readonly read: Read = new Read(this);

    constructor(capacity: number = 0, order: "little" = "little") {
        this._capacity = capacity;
        this._position = 0;
        this._order = order;
        this._buffer = new Uint8Array(capacity);
    }

    set(buffer: Uint8Array): void {
        this._buffer = buffer;
        this._position = 0;
        this._capacity = buffer.length;
    }

    get position(): number {
        return this._position;
    }

    set position(val: number) {
        this._position = val;
        if (this._position > this._capacity) throw new Error("Out of range");
    }

    get buffer(): Uint8Array {
        return this._buffer;
    }

    get length(): number {
        return this._buffer.length;
    }

    get order(): string {
        return this._order;
    }

    static from(buffer: Uint8Array | ArrayBuffer): ByteSet {
        if (buffer instanceof ArrayBuffer) {
            return this.from(new Uint8Array(buffer));
        } else {
            const temp = new ByteSet(buffer.length);
            temp.set(buffer);
            return temp;
        }
    }
}
