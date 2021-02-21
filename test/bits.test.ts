import { assertEquals, assertThrows } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { BitArray } from "../src/bitarray/BitArray.ts";

Deno.test("base", () => {
    const b = new BitArray();
    b.write.uint8(0xae);
    assertEquals(b.buffer, [1, 0, 1, 0, 1, 1, 1, 0]);
    b.position = 0;
    assertEquals(b.read.uint8(), 0xae);
});
