import { assertEquals, assertNotEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { ByteSet } from "../src/byteset/ByteSet.ts";

Deno.test("uint8", () => {
    const b = new ByteSet(6);
    b.write.uint8(1);
    b.write.uint8(250);
    b.write.uint8(-1);
    b.write.uint8(-2);
    b.write.uint8(256);
    b.write.uint8(257);

    b.position = 0;

    assertEquals(b.read.uint8(), 1);
    assertEquals(b.read.uint8(), 250);
    assertEquals(b.read.uint8(), 255);
    assertEquals(b.read.uint8(), 254);
    assertEquals(b.read.uint8(), 0);
    assertEquals(b.read.uint8(), 1);
});

Deno.test("int8", () => {
    const b = new ByteSet(6);
    b.write.int8(-1).int8(0).int8(256).int8(255).int8(127).int8(128);

    b.position = 0;

    assertEquals(b.read.int8(), -1);
    assertEquals(b.read.int8(), 0);
    assertEquals(b.read.int8(), 0);
    assertEquals(b.read.int8(), -1);
    assertEquals(b.read.int8(), 127);
    assertEquals(b.read.int8(), -128);
});

Deno.test("uint16", () => {
    const b = new ByteSet(6 * 2);
    b.write.uint16(1024);
    b.write.uint16(2048);
    b.write.uint16(65535);
    b.write.uint16(65536);
    b.write.uint16(-1);
    b.write.uint16(-2);
    b.position = 0;
    assertEquals(b.read.uint16(), 1024);
    assertEquals(b.read.uint16(), 2048);
    assertEquals(b.read.uint16(), 65535);
    assertEquals(b.read.uint16(), 0);
    assertEquals(b.read.uint16(), 65535);
    assertEquals(b.read.uint16(), 65534);
});

Deno.test("int16", () => {
    const b = new ByteSet(6 * 2);
    b.write.int16(-1);
    b.write.int16(-1000);
    b.write.int16(-32768);
    b.write.int16(32767);
    b.write.int16(32768);
    b.write.int16(65535);
    b.position = 0;
    assertEquals(b.read.int16(), -1);
    assertEquals(b.read.int16(), -1000);
    assertEquals(b.read.int16(), -32768);
    assertEquals(b.read.int16(), 32767);
    assertEquals(b.read.int16(), -32768);
    assertEquals(b.read.int16(), -1);
});

Deno.test("uint32", () => {
    const b = new ByteSet(6 * 4);
    b.write.uint32(1024);
    b.write.uint32(100000);
    b.write.uint32(4294967295);
    b.write.uint32(4294967296);
    b.write.uint32(-1);
    b.write.uint32(-2);
    b.position = 0;
    assertEquals(b.read.uint32(), 1024);
    assertEquals(b.read.uint32(), 100000);
    assertEquals(b.read.uint32(), 4294967295);
    assertEquals(b.read.uint32(), 0);
    assertEquals(b.read.uint32(), 4294967295);
    assertEquals(b.read.uint32(), 4294967294);
});

Deno.test("int32", () => {
    const b = new ByteSet(6 * 4);
    b.write.int32(-1);
    b.write.int32(-1073741825);
    b.write.int32(-2147483648);
    b.write.int32(2147483647);
    b.write.int32(2147483648);
    b.write.int32(4294967295);
    b.position = 0;
    assertEquals(b.read.int32(), -1);
    assertEquals(b.read.int32(), -1073741825);
    assertEquals(b.read.int32(), -2147483648);
    assertEquals(b.read.int32(), 2147483647);
    assertEquals(b.read.int32(), -2147483648);
    assertEquals(b.read.int32(), -1);
});

Deno.test("float32", () => {
    const b = new ByteSet(4 * 4);
    b.write.float32(1.23);
    b.write.float32(-4.5);
    b.write.float32(0.0123456789);
    b.write.float32(0.012345678);
    b.position = 0;
    assertEquals(b.read.float32().toFixed(2), "1.23");
    assertEquals(b.read.float32().toFixed(2), "-4.50");
    assertNotEquals(b.read.float32().toFixed(10), "0.0123456789");
    assertEquals(b.read.float32().toFixed(9), "0.012345678");
});

Deno.test("float64", () => {
    const b = new ByteSet(3 * 8);
    b.write.float64(0.0123456789);
    b.write.float64(0.0123456789123);
    b.write.float64(0.01234567891234567);
    b.position = 0;
    assertEquals(b.read.float64().toFixed(10), "0.0123456789");
    assertEquals(b.read.float64().toFixed(13), "0.0123456789123");
    assertEquals(b.read.float64().toFixed(17), "0.01234567891234567");
});
