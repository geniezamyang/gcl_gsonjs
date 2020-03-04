const Gson = require('../index.js')

// var des
console.log('Undefined *****')
console.log(`Test Undefined validator: ${JSON.stringify(Gson.validator(Gson.Type.UNDEFINED, undefined))}`)
console.log(`Test Undefined validator: ${JSON.stringify(Gson.validator(Gson.Type.UNDEFINED, '192.128.0.1'))}`)

// console.log('null *****')
console.log(`Test null validator: ${JSON.stringify(Gson.validator(Gson.Type.NULL, null))}`)
console.log(`Test null validator: ${JSON.stringify(Gson.validator(Gson.Type.NULL, '192.128.0.1'))}`)

console.log('Boolean ***** ')
console.log(`Test Boolean validator: ${JSON.stringify(Gson.validator(Gson.Type.TRUE, true))}`)
console.log(`Test Boolean validator: ${JSON.stringify(Gson.validator(Gson.Type.FALSE, false))}`)
console.log(`Test Boolean validator: ${JSON.stringify(Gson.validator(Gson.Type.TRUE, '192.128.0.1'))}`)
console.log(`Test Boolean validator: ${JSON.stringify(Gson.validator(Gson.Type.FALSE, '192.128.0.1'))}`)

console.log('Number ***** ')
console.log(`Test Number validator: ${JSON.stringify(Gson.validator(Gson.Type.NUMBER, 100))}`)
console.log(`Test Number validator: ${JSON.stringify(Gson.validator(Gson.Type.NUMBER, '192.128.0.1'))}`)

// console.log('Index *****')
// console.log(`Test Index validator: ${JSON.stringify(Gson.validator(Gson.Type.INDEX, [true, false, 100, 1]))}`)
// console.log(`Test Index validator: ${JSON.stringify(Gson.validator(Gson.Type.INDEX, 100))}`)
// console.log(`Test Index validator: ${JSON.stringify(Gson.validator(Gson.Type.INDEX, '192.128.0.1'))}`)

// console.log('Object ***** ')
// var myObj = {}
// myObj.test = 'This is a this'
// myObj.test2 = new Gson.Pair('null', 2)
// myObj.test3 = '3'
// console.log('Ori = ', Gson.print(myObj))
// buf = Buffer.alloc(Gson.calcSize(myObj), 0x00)
// Gson.serialize(myObj, buf, 0)
// console.log('Buf = ', buf)
// des = Gson.deserialize(buf)
// console.log('Des = ', Gson.print(des))

console.log('Date ***** ')
console.log(`Test Date validator: ${JSON.stringify(Gson.validator(Gson.Type.DATE, new Date()))}`)
console.log(`Test Date validator: ${JSON.stringify(Gson.validator(Gson.Type.DATE, 100))}`)
console.log(`Test Date validator: ${JSON.stringify(Gson.validator(Gson.Type.DATE, '192.128.0.1'))}`)

// console.log('String ***** ')
// console.log(`Test String validator: ${JSON.stringify(Gson.validator(Gson.Type.STRING32, 'Genie-networks'))}`)
// console.log(`Test String validator: ${JSON.stringify(Gson.validator(Gson.Type.STRING32, new Date()))}`)
// console.log(`Test String validator: ${JSON.stringify(Gson.validator(Gson.Type.STRING32, 100))}`)

// console.log('Oper ***** ')
// console.log(`Test Oper validator: ${JSON.stringify(Gson.validator(Gson.Type.OPER, 0x10))}`)
// console.log(`Test Oper validator: ${JSON.stringify(Gson.validator(Gson.Type.OPER, 'Genie-networks'))}`)
// console.log(`Test Oper validator: ${JSON.stringify(Gson.validator(Gson.Type.OPER, new Date()))}`)

// console.log('Bin ***** ')
// console.log(`Test Bin validator: ${JSON.stringify(Gson.validator(Gson.Type.BIN32, [1, 2, 3]))}`)
// console.log(`Test Bin validator: ${JSON.stringify(Gson.validator(Gson.Type.BIN32, 'Genie-networks'))}`)
// console.log(`Test Bin validator: ${JSON.stringify(Gson.validator(Gson.Type.BIN32, new Date()))}`)

// console.log('Uuid ***** ')
// console.log(`Test Uuid validator: ${JSON.stringify(Gson.validator(Gson.Type.UUID, '1234'))}`)
// console.log(`Test Uuid validator: ${JSON.stringify(Gson.validator(Gson.Type.UUID, [1, 2, 3, 4]))}`)
// console.log(`Test Uuid validator: ${JSON.stringify(Gson.validator(Gson.Type.UUID, 100))}`)

console.log('Array ***** ')
console.log(`Test Array validator: ${JSON.stringify(Gson.validator(Gson.Type.ARRAY32, [1, 2, 3]))}`)
console.log(`Test Array validator: ${JSON.stringify(Gson.validator(Gson.Type.ARRAY32, 'Genie-networks'))}`)
console.log(`Test Array validator: ${JSON.stringify(Gson.validator(Gson.Type.ARRAY32, new Date()))}`)

// console.log('Pair ***** ')
// console.log(`Test Pair validator: ${JSON.stringify(Gson.validator(Gson.Type.PAIR, [1, 2]))}`)
// console.log(`Test Pair validator: ${JSON.stringify(Gson.validator(Gson.Type.PAIR, ['1', new Date()]))}`)
// console.log(`Test Pair validator: ${JSON.stringify(Gson.validator(Gson.Type.PAIR, [1, 2, 3]))}`)
// console.log(`Test Pair validator: ${JSON.stringify(Gson.validator(Gson.Type.PAIR, 'Genie-networks'))}`)

console.log('MAC *****')
console.log(`Test MAC validator: ${JSON.stringify(Gson.validator(Gson.Type.MAC, [1, 2, 3, 4, 5, 6]))}`)
console.log(`Test MAC validator: ${JSON.stringify(Gson.validator(Gson.Type.MAC, '0f:ff:03:04:05:06'))}`)
console.log(`Test MAC validator: ${JSON.stringify(Gson.validator(Gson.Type.MAC, '0f:ff:03:04:05:XX'))}`)

// console.log('Derive ***** ')
// var myDerive = new Gson.Derive(100)
// console.log(`Test Derive validator: ${JSON.stringify(Gson.validator(Gson.Type.DERIVE, myDerive))}`)
// console.log(`Test Derive validator: ${JSON.stringify(Gson.validator(Gson.Type.DERIVE, 100))}`)

console.log('IPv4 *****')
console.log(`Test IP(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.IP4, 100))}`)
console.log(`Test IP(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.IP4, '192.128.0.1'))}`)
console.log(`Test IP(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.IP4, [192, 128, 0, 1]))}`)
console.log(`Test IP(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.IP4, undefined))}`)
console.log(`Test IP(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.IP4, '192.128.100.400'))}`)
console.log(`Test IP(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.IP4, [192, 128, 100, 1000]))}`)

// console.log('IPv6 *****')
console.log(`Test IP(v6) validator: ${JSON.stringify(Gson.validator(Gson.Type.IP6, 'FE00:1234::1'))}`)
console.log(`Test IP(v6) validator: ${JSON.stringify(Gson.validator(Gson.Type.IP6, 'FE00:1234::1000'))}`)
console.log(`Test IP(v6) validator: ${JSON.stringify(Gson.validator(Gson.Type.IP6, undefined))}`)

console.log('IPv4 Cidr *****')
// var myCidr = new Gson.Cidr('192.168.0.0/16')
// console.log('Ori = ', Gson.print(myCidr))
// buf = Buffer.alloc(Gson.calcSize(myCidr))
// Gson.serialize(myCidr, buf, 0)
// console.log('Buf = ', buf)
// des = Gson.deserialize(buf)
// console.log('Des = ', Gson.print(des))
console.log(`Test CIDR(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.CIDR4, 'non ip string'))}`)
console.log(`Test CIDR(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.CIDR4, '192.128.0.1/abcdefg'))}`)
console.log(`Test CIDR(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.CIDR4, '192.128.0.1'))}`)
console.log(`Test CIDR(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.CIDR4, '192.128.0.1/24'))}`)
console.log(`Test CIDR(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.CIDR4, '192.128.0.1/36'))}`)
console.log(`Test CIDR(v4) validator: ${JSON.stringify(Gson.validator(Gson.Type.CIDR4, [192, 128, 0, 1]))}`)

console.log('IPv6 Cidr *****')
console.log(`Test CIDR(v6) validator: ${JSON.stringify(Gson.validator(Gson.Type.CIDR6, 'FE00:1234::1/112'))}`)
console.log(`Test CIDR(v6) validator: ${JSON.stringify(Gson.validator(Gson.Type.CIDR6, 'FE00:1234::1000/130'))}`)
console.log(`Test CIDR(v6) validator: ${JSON.stringify(Gson.validator(Gson.Type.CIDR6, undefined))}`)
// console.log('Tag ***** ')
// var myTag = new Gson.Tag(0x12345678123456781, false)
// console.log('Ori = ', Gson.print(myTag))
// buf = Buffer.alloc(Gson.calcSize(myTag), 0x00)
// Gson.serialize(myTag, buf, 0)
// console.log('Buf = ', buf)
// des = Gson.deserialize(buf)
// console.log('Des = ', Gson.print(des))

// var pipeline = [
//   new Gson.Oper(146),
//   [
//     new Gson.Var(''),
//     302
//   ],
//   'absolute'
// ]

// console.log(Gson.print(pipeline))
// buf = new Buffer(Gson.calcSize(pipeline))
// Gson.serialize(pipeline, buf, 0)
// console.log('Buf = ', buf)
// des = Gson.deserialize(buf)
// console.log('Des = ', Gson.print(des))

// var test = new Gson.Bin('2')
// console.log(Gson.print(test))
