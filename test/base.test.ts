import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { ByteSet } from "../src/ByteSet.ts";

// Simple name and function, compact form, but not configurable
Deno.test("uint16", () => {
    const b = new ByteSet(4);
    b.write.uint16(1024);
    b.write.uint16(2048);
    b.position = 0;
    assertEquals(b.read.uint16(), 1024);
    assertEquals(b.read.uint16(), 2048);
});

// Simple name and function, compact form, but not configurable
Deno.test("uint32", () => {
    const b = new ByteSet(8);
    b.write.uint32(1024);
    b.write.uint32(100000);
    b.position = 0;
    assertEquals(b.read.uint32(), 1024);
    assertEquals(b.read.uint32(), 100000);
});

// Simple name and function, compact form, but not configurable
Deno.test("floatArray", () => {
    const b = new ByteSet(2 * 4);
    b.write.floatArray(new Float32Array([1.5, 4.5]));
    b.position = 0;
    const a = b.read.floatArray(2);

    assertEquals(a.length, 2);
    assertEquals(1.5, a[0]);
    assertEquals(4.5, a[1]);
});

Deno.test("int16Array", () => {
    const b = new ByteSet(4);
    b.write.int16Array(new Int16Array([512, 2048]));
    b.position = 0;
    const a = b.read.int16Array(2);
    assertEquals(512, a[0]);
    assertEquals(2048, a[1]);
});
