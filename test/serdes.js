const Gson = require('../index.js')

var des
console.log('Undefined *****')
var un
var buf = Buffer.alloc(Gson.calcSize(un), 0x00)
console.log('Ori = ', Gson.print(un))
Gson.serialize(un, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('null *****')
var n = null
buf = Buffer.alloc(Gson.calcSize(n), 0x00)
console.log('Ori = ', Gson.print(n))
Gson.serialize(n, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Boolean ***** ')
var bool = true
console.log('Ori = ', Gson.print(bool))
buf = Buffer.alloc(Gson.calcSize(bool), 0x00)
Gson.serialize(bool, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))
bool = false
console.log('Ori = ', Gson.print(bool))
buf = Buffer.alloc(Gson.calcSize(bool), 0x00)
Gson.serialize(bool, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Number ***** ')
var num = 3
console.log('Ori = ', Gson.print(num))
buf = Buffer.alloc(Gson.calcSize(num), 0x00)
Gson.serialize(num, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Index *****')
var myIndex = new Gson.Index(true, false, 100, 1)
console.log('Ori = ', Gson.print(myIndex))
buf = Buffer.alloc(Gson.calcSize(myIndex), 0x00)
Gson.serialize(myIndex, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Object ***** ')
var myObj = {}
myObj.test = 'This is a this'
myObj.test2 = new Gson.Pair('null', 2)
myObj.test3 = '3'
console.log('Ori = ', Gson.print(myObj))
buf = Buffer.alloc(Gson.calcSize(myObj), 0x00)
Gson.serialize(myObj, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Date ***** ')
var myDate = new Date()
console.log('Ori = ', Gson.print(myDate))
buf = Buffer.alloc(Gson.calcSize(myDate), 0x00)
Gson.serialize(myDate, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('String ***** ')
var string = 'Genie-networks.com'
console.log('Ori = ', Gson.print(string))
buf = Buffer.alloc(Gson.calcSize(string), 0x00)
Gson.serialize(string, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Oper ***** ')
var myOper = new Gson.Oper(0x10)
console.log('Ori = ', Gson.print(myOper))
buf = Buffer.alloc(Gson.calcSize(myOper), 0x00)
Gson.serialize(myOper, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Bin ***** ')
var myBin = new Gson.Bin([1, 2, 3, 4, 5])
console.log('Ori = ', Gson.print(myBin))
buf = Buffer.alloc(Gson.calcSize(myBin), 0x00)
Gson.serialize(myBin, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Uuid ***** ')
var myUuid = new Gson.Uuid()
console.log('Ori = ', Gson.print(myUuid))
buf = Buffer.alloc(Gson.calcSize(myUuid), 0x00)
Gson.serialize(myUuid, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Array ***** ')
var myArray = [null, 0x20, 0x100, 0x10000, 0x100000000]
console.log('Ori = ', Gson.print(myArray))
buf = Buffer.alloc(Gson.calcSize(myArray), 0x00)
Gson.serialize(myArray, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Pair ***** ')
var myPair = new Gson.Pair('null', 2)
console.log('Ori = ', Gson.print(myPair))
buf = Buffer.alloc(Gson.calcSize(myPair), 0x00)
Gson.serialize(myPair, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('MAC *****')
// var myMac = new Gson.Mac([0, 0x0A, 3, 4, 5, 6])
var myMac = new Gson.Mac('0f:ff:03:04:05:06')
console.log('Ori = ', Gson.print(myMac))
buf = Buffer.alloc(Gson.calcSize(myMac), 0x00)
Gson.serialize(myMac, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Derive ***** ')
var myDerive = new Gson.Derive(100)
console.log('Ori = ', Gson.print(myDerive))
buf = Buffer.alloc(Gson.calcSize(myDerive), 0x00)
Gson.serialize(myDerive, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('IPv4 *****')
var myIp = new Gson.Ip([192, 168, 0, 1])
console.log('Ori = ', Gson.print(myIp))
buf = Buffer.alloc(Gson.calcSize(myIp))
Gson.serialize(myIp, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('IPv6 *****')
var myIpv6 = new Gson.Ip('FE00:1234::1')
console.log('Ori = ', Gson.print(myIpv6))
buf = Buffer.alloc(Gson.calcSize(myIpv6))
Gson.serialize(myIpv6, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('IPv4 Cidr *****')
var myCidr = new Gson.Cidr('192.168.0.0/16')
console.log('Ori = ', Gson.print(myCidr))
buf = Buffer.alloc(Gson.calcSize(myCidr))
Gson.serialize(myCidr, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('IPv6 Cidr *****')
myCidr = new Gson.Cidr('FE80::1234:0/112')
console.log('Ori = ', Gson.print(myCidr))
buf = Buffer.alloc(Gson.calcSize(myCidr))
Gson.serialize(myCidr, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

console.log('Tag ***** ')
var myTag = new Gson.Tag(0x12345678123456781, false)
console.log('Ori = ', Gson.print(myTag))
buf = Buffer.alloc(Gson.calcSize(myTag), 0x00)
Gson.serialize(myTag, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))

var numObj = {
	"1": "somecase",
	"abc" : 123
}
console.log('Ori = ', Gson.print(numObj))
buf = Buffer.alloc(Gson.calcSize(numObj), 0x00)
Gson.serialize(numObj, buf, 0)
console.log('Buf = ', buf)
des = Gson.deserialize(buf)
console.log('Des = ', Gson.print(des))
console.log('Des = ', Gson.toString(des))
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

// const defaultData = require('./default.js')
// buf = Buffer.alloc(Gson.calcSize(defaultData))
// Gson.serialize(defaultData, buf, 0)
// console.log('Buf = ', buf)
// des = Gson.deserialize(buf)
// console.log('Des = ', Gson.print(des))
