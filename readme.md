# Bytes

Deno module for easy handling of bytes and bits.

[![Custom badge](https://img.shields.io/endpoint?url=https%3A%2F%2Fdeno-visualizer.danopia.net%2Fshields%2Flatest-version%2Fx%2Fbytes%2Fmod.ts)](https://doc.deno.land/https/deno.land/x/bytes/mod.ts)
![Deno test](https://github.com/maldan/denolib-bytearray/workflows/Deno/badge.svg)
[![License](https://img.shields.io/github/license/maldan/denolib-bytearray)](https://github.com/maldan/denolib-bytearray/blob/master/LICENSE)
[![hits](https://hits.deltapapa.io/github/maldan/denolib-bytearray.svg)](https://hits.deltapapa.io)
<a href="https://github.com/badges/shields/pulse" alt="Activity">
<img src="https://img.shields.io/github/commit-activity/m/maldan/denolib-bytearray" />
</a>
![GitHub Repo stars](https://img.shields.io/github/stars/maldan/denolib-bytearray)

## Roadmap

-   [x] Read/Write 8, 16, 24, 32 bit numbers
-   [x] Read/Write float32, float64
-   [x] Read/Write strings
-   [x] Read/Write 8, 16, 32, float32, float64, arrays
-   [x] Read/Write little endian for numbers
-   [x] Read/Write big endian for numbers
-   [x] Read/Write little endian for arrays
-   [ ] Read/Write big endian for arrays
-   [ ] BitSet class
-   [ ] BitArray class
-   [ ] ByteArray class - same as ByteSet but with dynamic expansion

## Full documentation

Go here - https://doc.deno.land/https/deno.land/x/bytes/mod.ts

## How to import

```ts
import { ByteSet, LengthType, NumberType } from "https://deno.land/x/bytes@1.0.3/mod.ts";
```

# ByteSet

It's byte array but with fixed size. Think of it as a wrapper for `Uint8Array`. If you create a new `ByteSet` from existing `Uint8Array` it won't create a copy of that array. It just wrap around. Each `ByteSet` instance has a buffer, position, order and capacity.

```ts
// Buffer is some Uint8Array
const bytes = ByteSet.from(buffer);

// Write 1 byte
bytes.write.uint8(5);

console.log(buffer[0]); // 5

// Technically it's almost the same as buffer[n] = 5;
// But what if you need to store uint16 number in uint8array?
// Will you write buffer[0] = value & 0xff; buffer[1] = value >> 8; ?
// Or just bytes.write.uint16(16); ?
```

## Examples

### Basics

```ts
// Creates a byteset with static size
const a = new ByteSet(12);

// Or create from existing Uint8Array or ArrayBuffer
const b = ByteSet.from(new Uint8Array([1, 2, 3]));
```

How to read and write?

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

### Strings

```ts
// Create set
const a = new ByteSet(3); // length of string in bytes
a.write.string("Hi!");

// Reset position for reading
a.position = 0;

// Reads 3 bytes as string
console.log(a.read.string(3)); // Hi!
```

If you want to store length info to automatically reads it later you can pass `LengthType` parameter.

```ts
// Create set
const a = new ByteSet(1 + 3); // length info + string
a.write.string("Hi!", LengthType.Uint8);

// Reset position for reading
a.position = 0;

// The lenth is unknown for you (for example)
// but you know that the LengthType is Uint8
console.log(a.read.string(LengthType.Uint8)); // Hi!
```

The second parameter is `LengthType`. It can be `None`, `Uint8`, `Uint16` or `Uint32`. By default it's `None` so the length of the string can be any size but unknown for you. If you use `Uint8` you can store up until `255` bytes string. If use `Uint16` then up until `65335`. When you read string you can pass `LengthType` or specific size.

Technically `LengthType` just put bytes before string that contains length of string. When you read string with `LengthType.Uint8` it will read `1` byte that contains length. Then it will read full string with that length.

Note! String function will store any string as `utf-8` string. So when you read and write strings the length doesn't mean length of string it means length of bytes of that string.

### Arrays

You can also write and read some typed arrays. For example

```ts
// Create set
const b = new ByteSet(4); // because each number is 2 bytes
b.write.int16Array(new Int16Array([512, 2048]));

// Reset position for reading
b.position = 0;

const a = b.read.int16Array(2);
console.log(a[0]); // 512
console.log(a[1]); // 2048
```

By default it won't store length information. If you want to store length you can use this.

```ts
const b = new ByteSet(4);
b.write.uint8Array(new Uint8Array([1, 2, 3]), LengthType.Uint8);

// Reset position for reading
b.position = 0;

// The lenth is unknown for you (for example)
// but you know that the length info is in uint8
const a = b.read.uint8Array(LengthType.Uint8);
console.log(a[0]); // 1
console.log(a[1]); // 2
console.log(a[2]); // 3
console.log(a.length); // 3
```

The same logic goes for `LengthType.Uint16` and `LengthType.Uint32` and for other typed arrays too.

### Other examples

```ts
const b = new ByteSet(4);
b.write.uint8Array(new Uint8Array([1, 2, 3]));

// Reset position for reading
b.position = 0;

// You can read each uint8 from current position
b.read.each(NumberType.Uint8, (x) => {
    console.log(x);
});
// It will output
// 1
// 2
// 3
// 0
// Why zero at the end? Becase size of set is 4.
// And we wrote only 3 numbers. By default array contains 0 values.
```
