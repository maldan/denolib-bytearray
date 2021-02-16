import { assertEquals, assertThrows } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { BitArray } from "../src/bitarray/BitArray.ts";

Deno.test("base", () => {
    const b = new BitArray();
    b.write.uint8(1);
    b.write.bits(1, 1);
    console.log(b.toUint8Array());
});
