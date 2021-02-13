import { BitSet } from "./src/bitset/BitSet.ts";

const bs = new BitSet();
bs.write.number(255, 4);
console.log(bs.buffer);
