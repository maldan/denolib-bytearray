import { ByteSet, NumberType } from "./mod.ts";

const b = new ByteSet(4);
b.write.uint8Array(new Uint8Array([1, 2, 3]));
b.position = 0;

// You can read each uint8 from current position
b.read.each(NumberType.Uint8, (x) => {
    console.log(x);
});
