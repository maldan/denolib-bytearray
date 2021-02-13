export class ByteHelper {
    static uint8ArrayToBitSet(byteArray: Uint8Array | number) {
        if (typeof byteArray === "number") {
            return [
                byteArray & 1,
                (byteArray & 2) >> 1,
                (byteArray & 4) >> 2,
                (byteArray & 8) >> 3,
                (byteArray & 16) >> 4,
                (byteArray & 32) >> 5,
                (byteArray & 64) >> 6,
                (byteArray & 128) >> 7,
            ];
        } else {
            const bitArray = [];
            for (let i = 0; i < byteArray.length; i++) {
                bitArray.push(
                    byteArray[i] & 1,
                    (byteArray[i] & 2) >> 1,
                    (byteArray[i] & 4) >> 2,
                    (byteArray[i] & 8) >> 3,
                    (byteArray[i] & 16) >> 4,
                    (byteArray[i] & 32) >> 5,
                    (byteArray[i] & 64) >> 6,
                    (byteArray[i] & 128) >> 7
                );
            }
            return bitArray;
        }
    }
}
