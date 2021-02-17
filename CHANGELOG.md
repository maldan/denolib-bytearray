# Changed Log

## [1.0.3] - 2021-02-18

### Changed

-   Move `LengthType` & `NumberType` enums from `ByteSet.ts` to `mod.ts`

### Added

-   Added `print` function that logs into console byteset and show current location
-   Added `isEnd` property to ByteSet
-   Added more Big Endian in functions
-   Added `uint24` write and read for colors
-   Added `each` function to go throuch each buffer element. You can set number type for example `uint8` for each byte or `uint16` for each short. By deafult it goes until position is reach end of the buffer.
-   Added `limit` parameter to `each` function
