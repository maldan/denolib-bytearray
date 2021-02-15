# Byte array module for deno for convenient work with bytes and bits.

[![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fbytes%2Fmod.ts)](https://doc.deno.land/https/deno.land/x/bytes/mod.ts)

---

**NOTE!**
Currently this version supports only little endian bytes order. And also
not optimized for speed.

---

## Full documentation

Go here - https://doc.deno.land/https/deno.land/x/bytes/mod.ts

## How to import

```ts
// Latest version (I not recommended because I often make many breaking changes)
import { ByteSet, LengthType } from "https://deno.land/x/bytes/mod.ts";

// Specific version
import { ByteSet, LengthType } from "https://deno.land/x/bytes@1.0.2/mod.ts";
```

## Example for ByteSet

Creates a byteset with static size:

```ts
const a = new ByteSet(12);
```

Or creates from uint8array or arrayBuffer.

```ts
const b = ByteSet.from(new Uint8Array([1, 2, 3]));
```

How to reads and writes.

```ts
// Create set
const a = new ByteSet(1 + 2 + 4); // byte + short + int

// Write some numbers
a.write.uint8(1); // position = 1
a.write.uint16(512); // position = 3
a.write.uint32(100000); // position = 7

// Reset position for reading
a.position = 0;

console.log(a.read.uint8()); // 1
console.log(a.read.uint16()); // 512
console.log(a.read.uint32()); // 100000
```

## What can I read and write?

-   uint8 / int8
-   uint16 / int16
-   uint32 / int32
-   float32 / float64
-   string
-   uint8array / int8array
-   uint16array / int16array
-   uint32array / int32array
-   float32Array / float64Array

## More examples

### Strings

```ts
// Create set
const a = new ByteSet(3); // length of string in bytes
a.write.string("Hi!");
a.position = 0;

// Reads 3 bytes as string
console.log(a.read.string(3)); // Hi!
```

If you want to store length info to automatically reads it later you can pass lengthType parameter.

```ts
// Create set
const a = new ByteSet(1 + 4); // length info + string
a.write.string("Hi!", LengthType.Uint8);
a.position = 0;

// The lenth is unknown for you (for example)
// but you know that the length info is in uint8
console.log(a.read.string(LengthType.Uint8)); // Hi!
```

The second parameter is LengthType. It can be None, Uint8, Uint16, Uint32. By default it's None so the length of the string can be any size. If you use Uint8 you can store up until 255 bytes string. If use Uint16 then up until 65335. When you read string you also can pass length type or specific size.

### Arrays

You can also write and read some typed arrays. For example

```ts
// Create set
const b = new ByteSet(4); // because each number is 2 bytes
b.write.int16Array(new Int16Array([512, 2048]));
b.position = 0;

const a = b.read.int16Array(2);
console.log(a[0]); // 512
console.log(a[1]); // 2048
```

By default it won't store length information. If you want to store length you can use this.

```ts
const b = new ByteSet(4);
b.write.uint8Array(new Uint8Array([1, 2, 3]), LengthType.Uint8);
b.position = 0;

// The lenth is unknown for you (for example)
// but you know that the length info is in uint8
const a = b.read.uint8Array(LengthType.Uint8);
console.log(a[0]); // 1
console.log(a[1]); // 2
console.log(a[2]); // 3
console.log(a.length); // 3
```

The same logic goes for LengthType.Uint16 and LengthType.Uint32 and for other typed arrays too.
