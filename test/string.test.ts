import { assertEquals, assertThrows } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { LengthType } from "../mod.ts";
import { ByteSet } from "../src/byteset/ByteSet.ts";

Deno.test("string 0 size", () => {
    const b = new ByteSet(0);
    b.write.string("");
    b.position = 0;
    assertEquals(b.read.string(0), "");
    assertEquals(b.position, 0);
});

Deno.test("string specific size", () => {
    const b = new ByteSet(3);
    b.write.string("Hi!");
    b.position = 0;
    assertEquals(b.read.string(3), "Hi!");
    assertEquals(b.position, 3);
});

Deno.test("string uint8 size", () => {
    const b = new ByteSet(1 + 3);
    b.write.string("Hi!", LengthType.Uint8);
    b.position = 0;
    assertEquals(b.read.string(LengthType.Uint8), "Hi!");
    assertEquals(b.position, 4);
});

Deno.test("string uint16 size", () => {
    const largeString = new Array(300).fill("A").join("");
    const b = new ByteSet(512);
    b.write.string(largeString, LengthType.Uint16);
    b.position = 0;
    assertEquals(b.read.string(LengthType.Uint16), largeString);
});

Deno.test("string uint32 size", () => {
    const largeString = new Array(100000).fill("A").join("");
    const b = new ByteSet(100100);
    b.write.string(largeString, LengthType.Uint32);
    b.position = 0;
    assertEquals(b.read.string(LengthType.Uint32), largeString);
});

Deno.test("string uint8 size overflow", () => {
    const largeString = new Array(300).fill("A").join("");
    const b = new ByteSet(512);
    assertThrows(() => {
        b.write.string(largeString, LengthType.Uint8);
    });
});

Deno.test("string uint16 size overflow", () => {
    const largeString = new Array(100000).fill("A").join("");
    const b = new ByteSet(100100);
    assertThrows(() => {
        b.write.string(largeString, LengthType.Uint16);
    });
});
