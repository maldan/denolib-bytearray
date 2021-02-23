import { assertEquals, assertThrows } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { ByteArray, NumberType } from "../mod.ts";

Deno.test("base", () => {
    let b = new ByteArray();
    assertEquals(b.length, 0);

    b = new ByteArray(10);
    assertEquals(b.length, 0);

    b = new ByteArray(250);
    assertEquals(b.length, 0);
});

Deno.test("auto expand", () => {
    const b = new ByteArray();
    b.write.uint8(1);
    assertEquals(b.length, 1);

    b.write.uint8(180);
    assertEquals(b.length, 2);

    b.write.uint16(500);
    assertEquals(b.length, 4);

    b.write.uint32(150000);
    assertEquals(b.length, 8);

    b.position = 0;

    assertEquals(b.read.uint8(), 1);
    assertEquals(b.read.uint8(), 180);
    assertEquals(b.read.uint16(), 500);
    assertEquals(b.read.uint32(), 150000);
    assertEquals(b.length, 8);
});
