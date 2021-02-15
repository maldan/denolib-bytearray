import { assertEquals, assertThrows } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { ByteSet, LengthType } from "../src/byteset/ByteSet.ts";

Deno.test("base", () => {
    const b = new ByteSet(4);
    assertEquals(b.length, 4);
});

Deno.test("from uint8array", () => {
    const b = ByteSet.from(new Uint8Array([1, 2, 3]));
    assertEquals(b.read.uint8(), 1);
    assertEquals(b.read.uint8(), 2);
    assertEquals(b.read.uint8(), 3);
    assertEquals(b.length, 3);
});

Deno.test("from arrayBuffer", () => {
    const b = ByteSet.from(new Uint8Array([1, 2, 3]).buffer);
    assertEquals(b.read.uint8(), 1);
    assertEquals(b.read.uint8(), 2);
    assertEquals(b.read.uint8(), 3);
    assertEquals(b.length, 3);
});
