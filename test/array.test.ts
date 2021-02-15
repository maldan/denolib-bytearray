import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { ByteSet, LengthType } from "../src/byteset/ByteSet.ts";

Deno.test("uint8Array specific length", () => {
    const b = new ByteSet(4);
    b.write.uint8Array(new Uint8Array([1, 2]));
    b.position = 0;
    const a = b.read.uint8Array(2);
    assertEquals(a[0], 1);
    assertEquals(a[1], 2);
    assertEquals(a.length, 2);
});

Deno.test("uint8Array uint8 length", () => {
    const b = new ByteSet(4);
    b.write.uint8Array(new Uint8Array([1, 2, 3]), LengthType.Uint8);
    b.position = 0;
    const a = b.read.uint8Array(LengthType.Uint8);
    assertEquals(a[0], 1);
    assertEquals(a[1], 2);
    assertEquals(a[2], 3);
    assertEquals(a.length, 3);
});

Deno.test("float32Array", () => {
    const b = new ByteSet(2 * 4);
    b.write.float32Array(new Float32Array([1.5, 4.5]));
    b.position = 0;
    const a = b.read.float32Array(2);

    assertEquals(a.length, 2);
    assertEquals(a[0], 1.5);
    assertEquals(a[1], 4.5);
});

Deno.test("float64Array", () => {
    const b = new ByteSet(2 * 8);
    b.write.float64Array(new Float64Array([1.5, 4.5]));
    b.position = 0;
    const a = b.read.float64Array(2);

    assertEquals(a.length, 2);
    assertEquals(a[0], 1.5);
    assertEquals(a[1], 4.5);
});

Deno.test("int16Array", () => {
    const b = new ByteSet(4);
    b.write.int16Array(new Int16Array([512, 2048]));
    b.position = 0;
    const a = b.read.int16Array(2);
    assertEquals(512, a[0]);
    assertEquals(2048, a[1]);
});
