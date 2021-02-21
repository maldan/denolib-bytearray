import { BitArray } from "./BitArray.ts";

export class Write {
    private _bitArray: BitArray;

    constructor(bitArray: BitArray) {
        this._bitArray = bitArray;
    }

    bit(val: number) {
        this._bitArray.buffer.push(val > 0 ? 1 : 0);
        this._bitArray.position++;
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
        /*for (let i = 0; i < length; i++) {
            this.bit((val & Math.pow(2, i)) >> i);
        }*/
    }

    uint8(val: number) {
        this.number(val, 8);
    }

    uint16(val: number) {
        this.number(val, 16);
    }

    uint32(val: number) {
        this.number(val, 32);
    }
}
