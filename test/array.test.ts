import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { ByteSet, NumberType, LengthType, Endianness } from "../mod.ts";

Deno.test("write/read int32Array with Uint32 length - Endianness.BE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.BE);
    const arr = [-1, -2, 3];
    b.write.int32Array(new Int32Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.int32Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read int32Array with Uint32 length - Endianness.LE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int32Array(new Int32Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.int32Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read int32Array with Uint16 length - Endianness.BE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.BE);
    const arr = [-1, -2, 3];
    b.write.int32Array(new Int32Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.int32Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read int32Array with Uint16 length - Endianness.LE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int32Array(new Int32Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.int32Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read int32Array with Uint8 length - Endianness.BE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.BE);
    const arr = [-1, -2, 3];
    b.write.int32Array(new Int32Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.int32Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read int32Array with Uint8 length - Endianness.LE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int32Array(new Int32Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.int32Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read int16Array with Uint32 length - Endianness.BE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.BE);
    const arr = [-1, -2, 3];
    b.write.int16Array(new Int16Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.int16Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read int16Array with Uint32 length - Endianness.LE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int16Array(new Int16Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.int16Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read int16Array with Uint16 length - Endianness.BE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.BE);
    const arr = [-1, -2, 3];
    b.write.int16Array(new Int16Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.int16Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read int16Array with Uint16 length - Endianness.LE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int16Array(new Int16Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.int16Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read int16Array with Uint8 length - Endianness.BE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.BE);
    const arr = [-1, -2, 3];
    b.write.int16Array(new Int16Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.int16Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read int16Array with Uint8 length - Endianness.LE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int16Array(new Int16Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.int16Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read int8Array with Uint32 length - Endianness.BE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.BE);
    const arr = [-1, -2, 3];
    b.write.int8Array(new Int8Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.int8Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read int8Array with Uint32 length - Endianness.LE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int8Array(new Int8Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.int8Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read int8Array with Uint16 length - Endianness.BE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.BE);
    const arr = [-1, -2, 3];
    b.write.int8Array(new Int8Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.int8Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read int8Array with Uint16 length - Endianness.LE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int8Array(new Int8Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.int8Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read int8Array with Uint8 length - Endianness.BE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.BE);
    const arr = [-1, -2, 3];
    b.write.int8Array(new Int8Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.int8Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read int8Array with Uint8 length - Endianness.LE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int8Array(new Int8Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.int8Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read uint32Array with Uint32 length - Endianness.BE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.BE);
    const arr = [1, 2, 3];
    b.write.uint32Array(new Uint32Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.uint32Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read uint32Array with Uint32 length - Endianness.LE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint32Array(new Uint32Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.uint32Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read uint32Array with Uint16 length - Endianness.BE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.BE);
    const arr = [1, 2, 3];
    b.write.uint32Array(new Uint32Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.uint32Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read uint32Array with Uint16 length - Endianness.LE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint32Array(new Uint32Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.uint32Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read uint32Array with Uint8 length - Endianness.BE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.BE);
    const arr = [1, 2, 3];
    b.write.uint32Array(new Uint32Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.uint32Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read uint32Array with Uint8 length - Endianness.LE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint32Array(new Uint32Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.uint32Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read uint16Array with Uint32 length - Endianness.BE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.BE);
    const arr = [1, 2, 3];
    b.write.uint16Array(new Uint16Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.uint16Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read uint16Array with Uint32 length - Endianness.LE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint16Array(new Uint16Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.uint16Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read uint16Array with Uint16 length - Endianness.BE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.BE);
    const arr = [1, 2, 3];
    b.write.uint16Array(new Uint16Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.uint16Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read uint16Array with Uint16 length - Endianness.LE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint16Array(new Uint16Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.uint16Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read uint16Array with Uint8 length - Endianness.BE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.BE);
    const arr = [1, 2, 3];
    b.write.uint16Array(new Uint16Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.uint16Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read uint16Array with Uint8 length - Endianness.LE", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint16Array(new Uint16Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.uint16Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read uint8Array with Uint32 length - Endianness.BE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.BE);
    const arr = [1, 2, 3];
    b.write.uint8Array(new Uint8Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.uint8Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read uint8Array with Uint32 length - Endianness.LE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint8Array(new Uint8Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.uint8Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read uint8Array with Uint16 length - Endianness.BE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.BE);
    const arr = [1, 2, 3];
    b.write.uint8Array(new Uint8Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.uint8Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read uint8Array with Uint16 length - Endianness.LE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint8Array(new Uint8Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.uint8Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read uint8Array with Uint8 length - Endianness.BE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.BE);
    const arr = [1, 2, 3];
    b.write.uint8Array(new Uint8Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.uint8Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read uint8Array with Uint8 length - Endianness.LE", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint8Array(new Uint8Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.uint8Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read float64Array with Uint32 length - Endianness.BE", () => {
    const b = new ByteSet((64 / 8) * 3 + 4, Endianness.BE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float64Array(new Float64Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.float64Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (64 / 8) * 3 + 4);
});

Deno.test("write/read float64Array with Uint32 length - Endianness.LE", () => {
    const b = new ByteSet((64 / 8) * 3 + 4, Endianness.LE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float64Array(new Float64Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.float64Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (64 / 8) * 3 + 4);
});

Deno.test("write/read float64Array with Uint16 length - Endianness.BE", () => {
    const b = new ByteSet((64 / 8) * 3 + 4, Endianness.BE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float64Array(new Float64Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.float64Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (64 / 8) * 3 + 4);
});

Deno.test("write/read float64Array with Uint16 length - Endianness.LE", () => {
    const b = new ByteSet((64 / 8) * 3 + 4, Endianness.LE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float64Array(new Float64Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.float64Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (64 / 8) * 3 + 4);
});

Deno.test("write/read float64Array with Uint8 length - Endianness.BE", () => {
    const b = new ByteSet((64 / 8) * 3 + 4, Endianness.BE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float64Array(new Float64Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.float64Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (64 / 8) * 3 + 4);
});

Deno.test("write/read float64Array with Uint8 length - Endianness.LE", () => {
    const b = new ByteSet((64 / 8) * 3 + 4, Endianness.LE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float64Array(new Float64Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.float64Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (64 / 8) * 3 + 4);
});

Deno.test("write/read float32Array with Uint32 length - Endianness.BE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.BE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float32Array(new Float32Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.float32Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read float32Array with Uint32 length - Endianness.LE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float32Array(new Float32Array(arr), LengthType.Uint32);
    b.position = 0;
    const a = b.read.float32Array(LengthType.Uint32);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read float32Array with Uint16 length - Endianness.BE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.BE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float32Array(new Float32Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.float32Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read float32Array with Uint16 length - Endianness.LE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float32Array(new Float32Array(arr), LengthType.Uint16);
    b.position = 0;
    const a = b.read.float32Array(LengthType.Uint16);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read float32Array with Uint8 length - Endianness.BE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.BE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float32Array(new Float32Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.float32Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read float32Array with Uint8 length - Endianness.LE", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float32Array(new Float32Array(arr), LengthType.Uint8);
    b.position = 0;
    const a = b.read.float32Array(LengthType.Uint8);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read int32Array with specific length", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int32Array(new Int32Array(arr));
    b.position = 0;
    const a = b.read.int32Array(3);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read int16Array with specific length", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int16Array(new Int16Array(arr));
    b.position = 0;
    const a = b.read.int16Array(3);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read int8Array with specific length", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.LE);
    const arr = [-1, -2, 3];
    b.write.int8Array(new Int8Array(arr));
    b.position = 0;
    const a = b.read.int8Array(3);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read uint32Array with specific length", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint32Array(new Uint32Array(arr));
    b.position = 0;
    const a = b.read.uint32Array(3);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});

Deno.test("write/read uint16Array with specific length", () => {
    const b = new ByteSet((16 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint16Array(new Uint16Array(arr));
    b.position = 0;
    const a = b.read.uint16Array(3);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (16 / 8) * 3 + 4);
});

Deno.test("write/read uint8Array with specific length", () => {
    const b = new ByteSet((8 / 8) * 3 + 4, Endianness.LE);
    const arr = [1, 2, 3];
    b.write.uint8Array(new Uint8Array(arr));
    b.position = 0;
    const a = b.read.uint8Array(3);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (8 / 8) * 3 + 4);
});

Deno.test("write/read float64Array with specific length", () => {
    const b = new ByteSet((64 / 8) * 3 + 4, Endianness.LE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float64Array(new Float64Array(arr));
    b.position = 0;
    const a = b.read.float64Array(3);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (64 / 8) * 3 + 4);
});

Deno.test("write/read float32Array with specific length", () => {
    const b = new ByteSet((32 / 8) * 3 + 4, Endianness.LE);
    const arr = [1.5, 4.5, 5.5];
    b.write.float32Array(new Float32Array(arr));
    b.position = 0;
    const a = b.read.float32Array(3);
    assertEquals(a, arr);
    assertEquals(a.length, 3);
    assertEquals(b.length, (32 / 8) * 3 + 4);
});
