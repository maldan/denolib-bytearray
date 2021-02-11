export class ByteArray {
    private _buffer: Uint8Array;
    private _capacity: number;
    private _order: string;
    private _position: number;
    private _isAutoExpand: boolean;
    private _tempFloatArray: Float32Array = new Float32Array(1);

    constructor(capacity: number = 1024, order: string = "big", array: any = null, isAutoExpand: boolean = false) {
        this._order = order;
        this._position = 0;
        this._isAutoExpand = isAutoExpand;
        this._capacity = array ? array.length : capacity;
        this._buffer = array || new Uint8Array(this._capacity);
    }

    put(data: Uint8Array): ByteArray {
        for (let i = 0; i < data.length; i++)
            this.putUInt8(data[i]);
        return this;
    }

    putUInt8(number: number): ByteArray {
        if (number > 255) throw new Error(`Byte can't be > 255`);

        if (this._isAutoExpand && this._position > this._capacity - 8) {
            this.append(new Uint8Array(1024));
        }

        this._buffer[this._position++] = number;

        if (this._position > this._capacity)
            throw new Error('Out of range');

        return this;
    }

    putUInt16(number: number): ByteArray {
        if (number > 65535) throw new Error(`Byte can't be > 65535`);

        if (this._isAutoExpand && this._position > this._capacity - 16) {
            this.append(new Uint8Array(1024));
        }

        if (this._order === "big") {
            this._buffer[this._position++] = number >> 8;
            this._buffer[this._position++] = number & 0xFF;
        } else {
            this._buffer[this._position++] = number & 0xFF;
            this._buffer[this._position++] = number >> 8;
        }

        if (this._position > this._capacity)
            throw new Error('Out of range');

        return this;
    }

    putUInt32(number: number) {
        if (number > 4294967295) throw new Error(`Byte can't be > 4294967295`);

        if (this._isAutoExpand && this._position > this._capacity - 32) {
            this.append(new Uint8Array(1024));
        }

        if (this._order === "big") {
            this._buffer[this._position++] = number >> 24;
            this._buffer[this._position++] = (number >> 16) & 0xFF;
            this._buffer[this._position++] = (number >> 8) & 0xFF;
            this._buffer[this._position++] = number & 0xFF;
        } else {
            this._buffer[this._position++] = number & 0xFF;
            this._buffer[this._position++] = (number >> 8) & 0xFF;
            this._buffer[this._position++] = (number >> 16) & 0xFF;
            this._buffer[this._position++] = number >> 24;
        }

        if (this._position > this._capacity)
            throw new Error('Out of range');
    }

    putUInt64(number: number) {
        const big = ~~(number / 0x0100000000);
        const low = (number % 0x0100000000);

        if (this._order === "big") {
            this.putUInt32(big);
            this.putUInt32(low);
        } else {
            this.putUInt32(low);
            this.putUInt32(big);
        }
    }

    putFloat(number: number) {
        this._tempFloatArray[0] = number;
        this.putUInt8(this._tempFloatArray.buffer[0]);
        this.putUInt8(this._tempFloatArray.buffer[1]);
        this.putUInt8(this._tempFloatArray.buffer[2]);
        this.putUInt8(this._tempFloatArray.buffer[3]);
    }

    putString(str: string): ByteArray {
        const byteStr = new TextEncoder().encode(str);
        this.putUInt32(byteStr.length); // str len
        for (let i = 0; i < byteStr.length; i++) {
            this.putUInt8(byteStr[i]);
        }

        return this;
    }

    /** Equally to putStr but doesn't contain length info */
    putChars(str: string): void {
        const byteStr = new TextEncoder().encode(str);
        for (let i = 0; i < byteStr.length; i++) {
            this.putUInt8(byteStr[i]);
        }
    }

    getUInt8(): number {
        return this._buffer[this._position++];
    }

    getUInt16() {
        return (this._buffer[this._position++] << 8 |
            this._buffer[this._position++]);
    }

    getUInt32() {
        return (this._buffer[this._position++] * 16777216 +
            this._buffer[this._position++] * 65536 +
            this._buffer[this._position++] * 256 +
            this._buffer[this._position++]);
    }

    getUInt64() {
        let l = this.getUInt32();
        let h = this.getUInt32();
        return h + (l * 0x0100000000);
    }

    getString(): string {
        const len = this.getUInt32();
        const str = new TextDecoder().decode(this._buffer.slice(this._position, this._position + len));
        this._position += len;
        return str;
    }

    addUInt32(number) {
        let val = this.getUInt32() + number;
        this._position -= 4;
        this.putUInt32(val);
    }

    addUInt64(number) {
        let val = this.getUInt64() + number;
        this._position -= 8;
        this.putUInt64(val);
    }

    /*resize(length: number) {
        this._buffer = (new Uint8Array(length)).append(this._buffer);
        this._capacity = this._buffer.length;
    }*/

    append(v: Uint8Array): void {
        const c = new Uint8Array(this._buffer.length + v.length);
        c.set(this._buffer, 0);
        c.set(v, this._buffer.length);
        this._buffer = c;
        this._capacity = this._buffer.length;
    }

    optimize(): ByteArray {
        this._buffer = this._buffer.slice(0, this._position);
        return this;
    }

    get position() {
        return this._position;
    }

    set position(pos) {
        if (pos > this._capacity) throw new Error(`OUT_OF_RANGE`);
        this._position = pos;
    }

    get buffer(): Uint8Array {
        return this._buffer;
    }

    print() {
        console.log(this._buffer);
    }

    /*get base64() {
        return ByteHelper.base64decode(this._buffer);
    }*/

    get capacity(): number {
        return this._capacity;
    }
}