# gcl_gsonjs
**Genie Common Library - GSON js**

## changeLog
* [1.0.0] 1.0.0 Released.
* [0.1.7] Chaneg Readme.md syntax
* [0.1.6] remove Oper.Reg

## Install
> npm install gcl_gsonjs


## Usage
```javascript
/* Require gclGson */
const gclGson = require('gcl_gsonjs')

/* Construct value of each type */
let myNum = 3

let myStr = 'hello'

let myBool = true

let myNull = null

let myUndefine

let myIndex = new gclGson.Index(true, false, 100, 1)

let myDate = new Date()

let myPair = new gclGson.Pair('null', 2)

let myOper = new gclGson.Oper(0x10)

let myBin = new gclGson.Bin([1, 2, 3, 4, 5])

let myUuid = new gclGson.Uuid()

let myMac = new gclGson.Mac('0f:ff:03:04:05:06')

let myDerive = new gclGson.Derive(100)

let myIp = new gclGson.Ip([192, 168, 0, 1])

let myIpv6 = new gclGson.Ip('FE00:1234::1')

let myCidr = new gclGson.Cidr('192.168.0.0/16')

let myTag = new gclGson.Tag(0x12345678123456781, false)

let myArr = [1, "s", myTag]

let myPair = new gclGson.Pair('null', 2)

let myDoc = {x:1, y:"str"}

// Get size for serialize buffer
let bufferSize = gclGson.calcSize(myDoc)

// serialize value
let buf = Buffer.alloc(gclGson.calcSize(myDoc), 0x00)
gclGson.serialize(myDoc, buf, 0)

// deserialize
let desDoc = Gson.deserialize(buf)

// toJSON
let jsonObj = myDoc.toJSON()

// construct a GSON value from a JSON value
let gsonDoc = gclGson.fromJSON(jsonObj)

// Print as GSON format
console.log(gclGson.print(myDoc))

// Print as GSON format without quotation marks
console.log(gclGson.toString(myDoc))

// serialize GSON and import to a file
gclGson.exportFile(myDoc, 'somewhere')

// Import and deserialize GSON from a file
let importDoc = gclGson.importFile('somewhere')
```

### Class
* gclGsonOper - Operator
* gclGsonBin  - Binary
* gclGsonTag - Tag
* gclGsonIndex - Index
* gclGsonPair  - Pair
* gclGsonUuid  - uuid
* gclGsonMac   - MAC
* gclGsonIp    - IPv4/IPv6
* gclGsonDerive - Derive

### Method
* toJSON(gson_obj)
* fromJSON(json_obj)
* calcSize(gson_obj)
* print(gson_obj)
* deserialize(buffer)
* serialize(gson_obj, buffer, offset)
* exportFile(gson_obj, filePath) - retrun a promise
* importFile(filePath) - return a promise and resolve gson_obj

## SPEC
### Type System

* **Simple**
  * **Undefined** represents the unexpected absence of value.
  * **Null** represents the intentional absence of value.
  * **Boolean** represents a logical data that can have only the values **true** or **false**.
  * **Date** represents the number of milliseconds since 1 January, 1970 UTC.
  * **Number** represents a double-precision floating point number.
  * **Oper** represents a software defined operator.
  * **Index** represents an 64-bit database index with 2-bit direction flag.
  * **String** represents a null-terminated UTF-8 string.
  * **Bin** represents a byte array.
  * **Uuid** represents universally unique identifier defined by RFC-4122.
  * **Mac** represents MAC address.
  * **Derive** represents a derive function ID.
  * **Ip** represents IPv4 or IPv6 address.
  * **Cidr** represents IPv4 or IPv6 CIDR.
  * **Tag** represents tagged id with 1-bit boundary flag.
* **Complex**
  * **Array** represents a sequence of **elements**, each is a GSON value.
  * **Doc** represents a sequence of **fields**, each is a key-value pair.
    * The type of key must be a **Number** or **String**.
    * The type of value could be any GSON value.
  * **Pair** represents a pair of values.

### Value Format

| Encoding  | Type           | Format                               | Description |
|--------------|-------------|--------------------------------------|-------------|
| 000 00000 | Undefined      | 0x00                                 | unexpected absence of value |
| 000 00001 | Null           | 0x01                                 | intentional absence of value |
| 000 00010 | False          | 0x02                                 | boolean false |
| 000 00011 | True           | 0x03                                 | boolean true |
| 000 00100 | Uint8          | 0x04 + 1{uint}                       | 8-bits non-negative integer number |
| 000 00101 | Uint16         | 0x05 + 2{uint}                       | 16-bits non-negative integer number |
| 000 00110 | Uint32         | 0x06 + 4{uint}                       | 32-bits non-negative integer number |
| 000 00111 | Number         | 0x07 + 8{double}                     | double precision floating point number |
| 000 010xx | Index          | 0x08~0x0B + 8{uint)                  | 64-bit database index with 2-bit direction flag | 
| 000 01100 | Doc8           | 0x0C + 1{len} + *{value}             | document up to `2^8-1` values |
| 000 01101 | Doc16          | 0x0D + 2{len} + *{value}             | document up to `2^16-1` values |
| 000 01110 | Doc32          | 0x0E + 4{len} + *{value}             | document up to `2^32-1` values |
| 000 01111 | Date           | 0x0F + 8{double}                     | number of milliseconds since 1 January, 1970 UTC |
| 000 10000 | String8        | 0x10 + 1{size} + *{char}             | string up to `2^8-1` chars |
| 000 10001 | String16       | 0x11 + 2{size} + *{char}             | string up to `2^16-1` chars |
| 000 10010 | String32       | 0x12 + 4{size} + *{char}             | string up to `2^32-1` chars |
| 000 10011 | Oper           | 0x13 + 1{code}                       | operator |
| 000 10100 | Bin8           | 0x14 + 1{size} + *{data}             | byte array up to `2^8-1` bytes |
| 000 10101 | Bin16          | 0x15 + 2{size} + *{data}             | byte array up to `2^16-1` bytes |
| 000 10110 | Bin32          | 0x16 + 4{size} + *{data}             | byte array up to `2^32-1` bytes |
| 000 10111 | Uuid           | 0x17 + 16{uuid}                      | universal unique id defined by RFC-4122  |
| 000 11000 | Array8         | 0x18 + 1{len} + *{value}             | array up to `2^8-1` values |
| 000 11001 | Array16        | 0x19 + 2{len} + *{value}             | array up to `2^16-1` values |
| 000 11010 | Array32        | 0x1A + 4{len} + *{value}             | array up to `2^32-1` values |
| 000 11011 | Pair           | 0x1B + {value} + {value}             | pair of values |
| 000 11100 | Mac            | 0x1C + 6{mac}                        | mac address |
| 000 11101 | Derive         | 0x1D + 1{uint}                       | lazy derive |
| 000 11110 | Reserved       | 0x1E                                 | reserved |
| 000 11111 | Reserved       | 0x1F                                 | reserved |
| 001 00000 | Ip4            | 0x20 + 4{ip}                         | ipv4 address |
| 001 00001 | Ip6            | 0x21 + 16{ip}                        | ipv6 address |
| 001 00010 | Cidr4          | 0x22 + 1{uint} + 4{ip}               | ipv4 CIDR |
| 001 00011 | Cidr6          | 0x23 + 1{uint} + 16{ip}              | ipv6 CIDR |
| 001 001xx | Reserved       | 0x24~0x27                            | reserved | 
| 001 0100x | Tag8           | 0x28~0x29 + 1{uint}                  | 8-bits non-negative integer tag id |
| 001 0101x | Tag16          | 0x2A~0x2B + 2{uint}                  | 16-bits non-negative integer tag id |
| 001 0110x | Tag32          | 0x2C~0x2D + 4{uint}                  | 32-bits non-negative integer tag id |
| 001 0111x | Tag52          | 0x2E~0x2F + 8{double}                | 52-bits non-negative integer tag id |
| 001 1xxxx | Reserved       | 0x30~0x3F                            | reserved | 
| 010 xxxxx | Reserved       | 0x40~0x5F                            | reserved |
| 011 xxxxx | Fixbin         | 0x60~0x7F + *{data}                  | byte array up to `2^5-1` bytes | 
| 100 xxxxx | Fixstring      | 0x80~0x9F + *{char}                  | string up to `2^5-1` bytes | 
| 101 xxxxx | Fixuint        | 0xA0~0xBF                            | unsigned interger up to `2^5-1` | 
| 110 xxxxx | Fixarray       | 0xC0~0xDF + *{value}                 | array up to `2^5-1` values | 
| 111 xxxxx | Fixdoc         | 0xE0~0xFF + *{value}                 | document up to `2^5-1` values | 

* `1{uint}` is 8-bits unsigned integer in host order.
* `2{uint}` is 16-bits unsigned integer in host order.
* `4{uint}` is 32-bits unsigned integer in host order.
* `8{uint}` is 64-bits unsigned integer in host order.
* `8{double}` is 64-bits double precision floating number in host order.
* `1{code}` is 8-bits unsigned integer in host order.
* `1{len}`: is 8-bits unsigned integer indicates number of values.
* `2{len}`:  is 16-bits unsigned integer indicates number of values.
* `4{len}`:  is 32-bits unsigned integer indicates number of values.
* `1{size}`: is 8-bits unsigned integer indicates number of bytes.
* `2{size}`:  is 16-bits unsigned integer indicates number of bytes.
* `4{size}`:  is 32-bits unsigned integer indicates number of bytes.
* `*{char}` is null-terminated string.
* `*{data}` is variable size byte array
* `16{uuid}`:  is 128-bits UUID in RFC-4122 format.
* `6{mac}` is 48-bits mac address
* `4{ip}` is 32-bits ipv4 address
* `16{ip}` is 128-bits ipv6 address
* `{value}` is a serialized GSON value.
* `*{value}` is zero or more serialized GSON values.

### Type String

|**type**      |**format** |
|--------------|-----------|
|**Undefined** |`"undefined"` |
|**Null**      |`"null"` |
|**Boolean**   |`"boolean"` |
|**Date**      |`"date"` |
|**Number**    |`"number"` |
|**Oper**      |`"oper"` |
|**Index**     |`"index"` |
|**String**    |`"string"` |
|**Bin**       |`"bin"` |
|**Uuid**      |`"uuid"` |
|**Mac**       |`"mac"` |
|**Derive**    |`"derive"` |
|**Ip**        |`"ip"` |
|**Cidr**      |`"cidr"` |
|**Tag**       |`"tag"` |
|**Array**     |`"array"` |
|**Doc**       |`"doc"` |
|**Pair**      |`"pair"` |

### Text Format

|**type**      |**format** |
|--------------|-----------|
|**Undefined** |`undefined` |
|**Null**      |`null` |
|**Boolean**   |`true` or `false` |
|**Date**      |`Date("<string>")` |
|**Number**    |`<number>` |
|**Oper**      |`$<name>` or `$<name>(<argument>,...)` for expression |
|**Index**     |`Index("<src>.<dst>.<msb>.<lsb>")` |
|**String**    |`"<string>"` |
|**Bin**       |`Bin("<hexstring>")` |
|**Uuid**      |`Uuid("<hexstring>")` |
|**Mac**       |`Mac("<macstring>")` |
|**Derive**   |`Derive(<number>)` |
|**Ip**        |`Ip("<ipstring>")` |
|**Cidr**        |`Cidr("<ipstring>")` |
|**Tag**       |`Tag("<boundary>.<id>")` |
|**Array**     |`[<value>,...]` |
|**Doc**       |`{<key>: <value>,...}` |
|**Pair**      |`Pair(<value>, <value>)` |

### JSON Format

|**type**      |**JSON format** |
|--------------|-----------|
|**Undefined** |`undefined` |
|**Null**      |`null` |
|**Boolean**   |`boolean` |
|**Date**      |`string` |
|**Number**    |`number` |
|**Oper**      |`"__OPER":<opcode>` |
|**Index**     |`"__INDEX:{"__DIR":[src, dst], "__VALUE":[hi, lo]}"` |
|**String**    |`"<string>"` |
|**Bin**       |`"__BIN":<hex string>` |
|**Uuid**      |`"__UUID":<hex string>` |
|**Mac**       |`"__MAC":<macstring>` |
|**Ip**        |`"__IP":<ipstring>` |
|**Cidr**      |`"__CIDR":<cidrstring>` |
|**Tag**       |`"__TAG:{"__BOUNDARY":boolean, "__VALUE":number}"` |
|**Derive**    |`"__DERIVE":<number>` |
|**Array**     |`array` |
|**Doc**       |`object` which keys are string|
|**Pair**      |`"__PAIR":[<src>, <dst>]` |

### JavaScript Implement

* **simple**
  * **Undefined** is mapped to the standard value **undefined**.
  * **Null** is mapped to the standard value **null**.
  * **Boolean** is mapped to the standard class **Boolean**.
  * **Date** is mapped to the standard class **Date**.
  * **Number** is mapped to the standard class **Number**.
  * **Oper** is mapped to the proprietry class **gclGsonOper**.
  * **Index** is mapped to the proprietry class **gclGsonIndex**.
  * **String** is mapped to the standard class **String**.
  * **Bin** is mapped to the proprietry class **gclGsonBin**.
  * **Uuid** is mapped to the proprietry class **gclGsonUuid**.
  * **Mac** is mapped to the proprietry class **gclGsonMac**.
  * **Ip** is mapped to the proprietry class **gclGsonIp**.
  * **Cidr** is mapped to the proprietry class **gclGsonCidr**.
  * **Tag** is mapped to the proprietry class **gclGsonTag**.
  * **Derive** is mapped to the proprietry class **gclGsonDerive**.
* **complex**
  * **Array** is map to the standard class **Array**.
  * **Doc** is map to the standard class **Object**.
  * **Pair** is map to the proprietry class **gclGsonPair**.
  
