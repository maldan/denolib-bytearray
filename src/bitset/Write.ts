import { BitSet } from "./BitSet.ts";

export class Write {
    private _bitSet: BitSet;

    constructor(bitSet: BitSet) {
        this._bitSet = bitSet;
    }

    bit(val: number) {
        this._bitSet.buffer.push(val > 0 ? 1 : 0);
        this._bitSet.position++;
    }

    bits(...val: number[]) {
        for (let i = 0; i < val.length; i++) {
            this.bit(val[i]);
        }
    }

    number(val: number, length: number) {
        for (let i = length - 1; i >= 0; i--) {
            this.bit((val & Math.pow(2, i)) >> i);
        }
    }

    byte(val: number) {
        for (let i = 7; i >= 0; i--) {
            this.bit((val & Math.pow(2, i)) >> i);
        }
    }

    short(val: number) {
        for (let i = 15; i >= 0; i--) {
            this.bit((val & Math.pow(2, i)) >> i);
        }
    }

    int(val: number) {
        for (let i = 31; i >= 0; i--) {
            this.bit((val & Math.pow(2, i)) >> i);
        }
    }
}
