import { BitArray } from "./BitArray.ts";

export class Read {
    private _bitArray: BitArray;

    constructor(bitArray: BitArray) {
        this._bitArray = bitArray;
    }

    bit(): number {
        return this._bitArray.buffer[this._bitArray.position++];
    }

    bits(length: number): number[] {
        const a = this._bitArray.buffer.slice(
            this._bitArray.position,
            this._bitArray.position + length
        );
        this._bitArray.position += length;
        return a;
    }

    number(length: number): number {
        let out = 0;
        for (let i = 0; i < length; i++) {
            out += (this._bitArray.buffer[this._bitArray.position++] ?? 0) * Math.pow(2, i);
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
