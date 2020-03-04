const Gson = require('../index.js')
// function conExpr (...arg) {
//   return [...arg]
// }

// function isExpr (val) {
//   if (!Array.isArray(val)) {
//     return false
//   }
//   if (val[0] instanceof Gson.Oper) {
//     return true
//   }
//   if (val[0] instanceof Gson.Var) {
//     return true
//   }
//   return false
// }

// function printExpr (val) {
//   if (val[0] instanceof Gson.Oper) {
//     var str = ''
//     var pos = 0
//     val.forEach(function (elem) {
//       if (pos === 0) {
//         str += Gson.print(elem) + '('
//       } else if (pos === 1) {
//         str += Gson.print(elem)
//       } else {
//         str += ', ' + Gson.print(elem)
//       }
//       pos++
//     })
//     str += ')'
//     return str
//   } else { // Var
//     var str = ''
//     var sep = ''
//     val.forEach(function (elem) {
//       str += sep + Gson.print(elem)
//       sep = '.'
//     })
//       // console.log(str);
//     return str
//   }
// }

// Gson.Extend([
// {
//  name:'Expr',
//  constructor: conExpr,
//  isinstance: isExpr,
//  print: printExpr
// }]);
// Gson.Oper.Reg({
//  'Add':0X00,
//  'Sub':0X01,
//  'Mul':0X02,
//  'Div':0X03,
//  'Mod':0X04,
//  'Eq':0X10,
//  'Ne':0X11,
//  'Gt':0X12,
//  'Gte':0X13,
//  'Lt':0X14,
//  'Lte':0X15,
//  'Between':0X16,
//  'And':0X20,
//  'Or':0X21,
//  'Not':0X22,
//  'BitsAnd':0X30,
//  'BitsOr':0X31,
//  'BitsXor':0X32,
//  'BitsNot':0X33,
//  'BitsEq':0X34,
//  'BitsAnySet':0x35,
//  'bitsAllSet':0x36,
//  'IpEqPrefix':0X40,
//  'IpEqMask':0X41,
//  'StrEq':0X50,
//  'StrEqPrefix':0X51,
//  'StrEqSuffix':0X52,
//  'StrEqRegex':0X53,
//  'Swap':0X60,
//  'Path':0X61,
//  'First':0X62,
//  'Last':0X63,
//  'In':0X64,
//  'Filter':0X65,
//  'Nop':0X70,
//  'Cond':0X71,
//  'Condn':0X72,
//  'Switch':0X73,
//  'ToString':0X80,
//  'ToNumber':0X81,
//  'ToDate':0X82,
//  'Lambda':0X90,
//  'Return':0X91,
//  'Var':0X92,
//  'Let':0X93,
//  'If':0X94,
//  'While':0X95,
//  'Until':0X96,
//  'Derive':0XA0,
//  'Select':0XA1,
//  'Match':0XA2,
//  'Topn':0XA3,
//  'Sum':0XB0,
//  'Distinct':0XB1
// }
// );
console.log('\n\nnull *****')
var myNull = null
console.log(`toString: ${Gson.toString(myNull)}`)
console.log(`print: ${Gson.print(myNull)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myNull), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myNull)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myNull)))}`)

console.log('\n\nUndefined *****')
var myUndefined
console.log(`toString: ${Gson.toString(myUndefined)}`)
console.log(`print: ${Gson.print(myUndefined)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myUndefined), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myUndefined)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myUndefined)))}`)

console.log('\n\nBoolean ***** ')
var myBool = true
console.log(`toString: ${Gson.toString(myBool)}`)
console.log(`print: ${Gson.print(myBool)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myBool), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myBool)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myBool)))}`)
myBool = false
console.log(`toString: ${Gson.toString(myBool)}`)
console.log(`print: ${Gson.print(myBool)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myBool), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myBool)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myBool)))}`)

console.log('\n\nNumber ***** ')
var myNum = 32
console.log(`toString: ${Gson.toString(myNum)}`)
console.log(`print: ${Gson.print(myNum)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myNum), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myNum)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myNum)))}`)

console.log('\n\nIndex *****')
var myIndex = new Gson.Index(true, false, 100, 1)
console.log(`toString: ${Gson.toString(myIndex)}`)
console.log(`print: ${Gson.print(myIndex)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myIndex), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myIndex, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myIndex)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myIndex)))}`)

console.log('\n\nObject ***** ')
var myObj = {x: 1, y: 1}
myObj.test = 'This is a this'
myObj.test2 = new Gson.Pair('null', 2)
myObj.test3 = '3'
myObj.test4 = {x: 1, y: 2}
myObj[5] = {x: 1, y: 2}
console.log(`toString: ${Gson.toString(myObj)}`)
console.log(`print: ${Gson.print(myObj)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myObj), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myObj, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myObj)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myObj)))}`)

console.log('\n\nDate ***** ')
var myDate = new Date()
console.log(`toString: ${Gson.toString(myDate)}`)
console.log(`print: ${Gson.print(myDate)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myDate), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myDate)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myDate)))}`)

console.log('\n\nString ***** ')
var myString = 'Genie-networks.com'
console.log(`toString: ${Gson.toString(myString)}`)
console.log(`print: ${Gson.print(myString)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myString), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myString)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myString)))}`)

console.log('\n\nOper ***** ')
const opValueMap = new Map()
opValueMap.set(0X10, 'abc')
Gson.Oper.loadOpValueMap(opValueMap)
const myOper = new Gson.Oper(0x10)
console.log(`toString: ${Gson.toString(myOper)}`)
console.log(`print: ${Gson.print(myOper)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myOper), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myOper, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myOper)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myOper)))}`)

console.log('\n\nBin ***** ')
var myBin = new Gson.Bin([1, 2, 3, 4, 5])
console.log(`toString: ${Gson.toString(myBin)}`)
console.log(`print: ${Gson.print(myBin)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myBin), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myBin, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myBin)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myBin)))}`)

console.log('\n\nUuid ***** ')
var myUuid = new Gson.Uuid()
console.log(`toString: ${Gson.toString(myUuid)}`)
console.log(`print: ${Gson.print(myUuid)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myUuid), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myUuid, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myUuid)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myUuid)))}`)

console.log('\n\nArray ***** ')
var myArray = [null, 0x20, 0x100, 0x10000, 0x100000000]
console.log(`toString: ${Gson.toString(myArray)}`)
console.log(`print: ${Gson.print(myArray)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myArray), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myArray)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myArray)))}`)

console.log('\n\nPair ***** ')
var myPair = new Gson.Pair('null', 2)
console.log(`toString: ${Gson.toString(myPair)}`)
console.log(`print: ${Gson.print(myPair)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myPair), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myPair, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myPair)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myPair)))}`)

console.log('\n\nMac ***** ')
// var myMac = new Gson.Mac([0, 0x0A, 3, 4, 5, 6]);
var myMac = new Gson.Mac('0f:ff:03:04:05:06')
console.log(`toString: ${Gson.toString(myMac)}`)
console.log(`print: ${Gson.print(myMac)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myMac), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myMac, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myMac)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myMac)))}`)

console.log('\n\nDerive ***** ')
// var myMac = new Gson.Mac([0, 0x0A, 3, 4, 5, 6]);
var myDerive = new Gson.Derive(100)
console.log(`toString: ${Gson.toString(myDerive)}`)
console.log(`print: ${Gson.print(myDerive)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myDerive), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myDerive, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myDerive)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myDerive)))}`)

console.log('\n\nIPv4 *****')
var myIp = new Gson.Ip('192.168.0.1')
// var myIp = new Gson.Ip([192, 168, 0, 1])
console.log(`toString: ${Gson.toString(myIp)}`)
console.log(`print: ${Gson.print(myIp)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myIp), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myIp, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myIp)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myIp)))}`)

process.exit(0)
console.log('\n\nIPv6 *****')
myIp = new Gson.Ip('FE00:1234::1')
console.log(`toString: ${Gson.toString(myIp)}`)
console.log(`print: ${Gson.print(myIp)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myIp), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myIp, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myIp)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myIp)))}`)

console.log('\n\nIPv4 Cidr***** ')
var myCidr = new Gson.Cidr('192.168.0.0/16')
console.log(`toString: ${Gson.toString(myCidr)}`)
console.log(`print: ${Gson.print(myCidr)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myCidr), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myCidr, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myCidr)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myCidr)))}`)
console.log('\n\nIPv6 Cidr *****')
myCidr = new Gson.Cidr('FE80::1234:0/112')
console.log(`toString: ${Gson.toString(myCidr)}`)
console.log(`print: ${Gson.print(myCidr)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myCidr), null, 2)}`)
console.log(`toJSON(without type): ${JSON.stringify(Gson.toJSON(myCidr, false), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myCidr)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myCidr)))}`)

console.log('\n\nTag ***** ')
var myTag = new Gson.Tag(100, false)
console.log(`toString: ${Gson.toString(myTag)}`)
console.log(`print: ${Gson.print(myTag)}`)
console.log(`toJSON: ${JSON.stringify(Gson.toJSON(myTag), null, 2)}`)
console.log(`calcSize: ${Gson.calcSize(myTag)}`)
console.log(`toJSON=>fromJSON=>print: ${Gson.print(Gson.fromJSON(Gson.toJSON(myTag)))}`)
