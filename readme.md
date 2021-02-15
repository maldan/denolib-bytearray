# Byte array module for deno for convenient work with bytes and bits.

---

**NOTE!**
Currently this version supports only little endian bytes order.

---

## How to use

```ts
import { ByteSet } from "";
```

## ByteSet

You can create byteset with a static size. For example:

```typescript
const a = new ByteSet(12);
// or
const b = ByteSet.from(new Uint8Array([1, 2, 3]));
```

This creates a Uint8Array with length in 12 bytes or 3 if you used second variant. Now you can work with this array.

```typescript
const a = new ByteSet(1 + 2 + 4);
a.write.uint8(1);
a.write.uint16(512);
a.write.uint32(100000);

// Reset position for reading
a.position = 0;

console.log(a.read.uint8()); // 1
console.log(a.read.uint16()); // 512
console.log(a.read.uint32()); // 100000
```
