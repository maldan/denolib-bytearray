import { BitSet } from "./BitSet.ts";

export class Read {
    private _bitSet: BitSet;

    constructor(bitSet: BitSet) {
        this._bitSet = bitSet;
    }

    bit(): number {
        return this._bitSet.buffer[this._bitSet.position++];
    }

    bits(length: number): number[] {
        const a = this._bitSet.buffer.slice(this._bitSet.position, this._bitSet.position + length);
        this._bitSet.position += length;
        return a;
    }

    number(length: number): number {
        let out = 0;
        for (let i = 0; i < length; i++) {
            out += (this._bitSet.buffer[this._bitSet.position++] ?? 0) * Math.pow(2, i);
        }
        return out;
    }

    uint8() {
        return this.number(8);
    }

    uint16() {
        return this.number(16);
    }

    uint32() {
        return this.number(32);
    }
}
