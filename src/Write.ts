import { ByteSet } from "./ByteSet.ts";

export class Write {
    private _byteSet: ByteSet;
    private _tempFloatArray: Float32Array = new Float32Array(1);

    constructor(byteSet: ByteSet) {
        this._byteSet = byteSet;
    }

    uint8Array(array: Uint8Array): Write {
        for (let i = 0; i < array.length; i++) {
            this.uint8(array[i]);
        }
        return this;
    }

    floatArray(array: Float32Array): Write {
        this.uint8Array(new Uint8Array(array.buffer));
        return this;
    }

    uint8(number: number): Write {
        // Check
        if (number > 255 || number < 0) {
            throw new Error(`Byte can't be > 255`);
        }

        // Write to buffer
        this._byteSet.buffer[this._byteSet.position++] = number;

        return this;
    }

    uint16(number: number): Write {
        // Check
        if (number > 65535 || number < 0) {
            throw new Error(`Short can't be > 65535`);
        }

        // Write to buffer
        this._byteSet.buffer[this._byteSet.position++] = number >> 8;
        this._byteSet.buffer[this._byteSet.position++] = number & 0xff;

        return this;
    }

    uint32(number: number): Write {
        // Check
        if (number > 4294967295 || number < 0) {
            throw new Error(`Int can't be > 4294967295`);
        }

        // Write to buffer
        this._byteSet.buffer[this._byteSet.position++] = number >> 24;
        this._byteSet.buffer[this._byteSet.position++] = (number >> 16) & 0xff;
        this._byteSet.buffer[this._byteSet.position++] = (number >> 8) & 0xff;
        this._byteSet.buffer[this._byteSet.position++] = number & 0xff;

        return this;
    }

    /*float(number: number): Write {
        this._tempFloatArray[0] = number;
        const d = new DataView(this._tempFloatArray.buffer);
        d.setFloat32(0, number);
        this.uint8Array(new Uint8Array(d.buffer));
        return this;
    }*/

    string(str: string): Write {
        const byteStr = new TextEncoder().encode(str);
        this.uint32(byteStr.length); // str len
        for (let i = 0; i < byteStr.length; i++) {
            this.uint8(byteStr[i]);
        }

        return this;
    }
}
