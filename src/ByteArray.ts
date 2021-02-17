export class ByteArray {
    private _buffer: Uint8Array;
    private _capacity: number;
    private _order: string;
    private _position: number;
    private _isAutoExpand: boolean;

    constructor(
        capacity: number = 1024,
        order: string = "big",
        array: any = null,
        isAutoExpand: boolean = false
    ) {
        this._order = order;
        this._position = 0;
        this._isAutoExpand = isAutoExpand;
        this._capacity = array ? array.length : capacity;
        this._buffer = array || new Uint8Array(this._capacity);
    }

    putUInt16(number: number): ByteArray {
        if (number > 65535) throw new Error(`Byte can't be > 65535`);

        if (this._isAutoExpand && this._position > this._capacity - 16) {
            this.append(new Uint8Array(1024));
        }

        if (this._order === "big") {
            this._buffer[this._position++] = number >> 8;
            this._buffer[this._position++] = number & 0xff;
        } else {
            this._buffer[this._position++] = number & 0xff;
            this._buffer[this._position++] = number >> 8;
        }

        if (this._position > this._capacity) throw new Error("Out of range");

        return this;
    }

    putUInt32(number: number) {
        if (number > 4294967295) throw new Error(`Byte can't be > 4294967295`);

        if (this._isAutoExpand && this._position > this._capacity - 32) {
            this.append(new Uint8Array(1024));
        }

        if (this._order === "big") {
            this._buffer[this._position++] = number >> 24;
            this._buffer[this._position++] = (number >> 16) & 0xff;
            this._buffer[this._position++] = (number >> 8) & 0xff;
            this._buffer[this._position++] = number & 0xff;
        } else {
            this._buffer[this._position++] = number & 0xff;
            this._buffer[this._position++] = (number >> 8) & 0xff;
            this._buffer[this._position++] = (number >> 16) & 0xff;
            this._buffer[this._position++] = number >> 24;
        }

        if (this._position > this._capacity) throw new Error("Out of range");
    }

    putUInt64(number: number) {
        const big = ~~(number / 0x0100000000);
        const low = number % 0x0100000000;

        if (this._order === "big") {
            this.putUInt32(big);
            this.putUInt32(low);
        } else {
            this.putUInt32(low);
            this.putUInt32(big);
        }
    }

    getUInt16() {
        return (this._buffer[this._position++] << 8) | this._buffer[this._position++];
    }

    getUInt32() {
        return (
            this._buffer[this._position++] * 16777216 +
            this._buffer[this._position++] * 65536 +
            this._buffer[this._position++] * 256 +
            this._buffer[this._position++]
        );
    }

    getUInt64() {
        let l = this.getUInt32();
        let h = this.getUInt32();
        return h + l * 0x0100000000;
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

    append(v: Uint8Array): void {
        const c = new Uint8Array(this._buffer.length + v.length);
        c.set(this._buffer, 0);
        c.set(v, this._buffer.length);
        this._buffer = c;
        this._capacity = this._buffer.length;
    }
}
