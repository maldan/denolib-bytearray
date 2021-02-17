import { assertEquals, assertThrows } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { NumberType } from "../mod.ts";
import { ByteSet } from "../src/byteset/ByteSet.ts";

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

Deno.test("each uint8", () => {
    const b = ByteSet.from(new Uint8Array([1, 2, 3, 4, 5]).buffer);
    const out: number[] = [];
    b.read.each(NumberType.Uint8, (x) => {
        out.push(x);
    });
    assertEquals(out, [1, 2, 3, 4, 5]);

    b.position = 0;
    out.length = 0;
    b.read.each(
        NumberType.Uint8,
        (x) => {
            out.push(x);
        },
        2
    );
    assertEquals(out, [1, 2]);
    assertEquals(b.position, 2);
    assertEquals(b.read.uint8(), 3);
});
