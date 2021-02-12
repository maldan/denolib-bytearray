import { assertEquals } from "https://deno.land/std@0.86.0/testing/asserts.ts";
import { ByteSet } from "../src/ByteSet.ts";

// Simple name and function, compact form, but not configurable
Deno.test("hello world #1", () => {
    const b = new ByteSet(2 * 4);
    b.write.floatArray(new Float32Array([1.5, 4.5]));
    b.position = 0;
    const a = b.read.floatArray(2);

    assertEquals(a.length, 2);
    assertEquals(1.5, a[0]);
    assertEquals(4.5, a[1]);
});
