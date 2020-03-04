const Gson = require('../index.js')
const _ = require('lodash')

var obj = {
  ip: new Gson.Ip([192, 168, 1, 1]),
  ip2: new Gson.Ip('192.168.1.1'),
  cidr: new Gson.Cidr('192.168.1.1/16'),
  bin: new Gson.Bin([1, 2, 3, 4]),
  mac: new Gson.Mac('0f:ff:03:04:05:06'),
  uuid: new Gson.Uuid(),
  arr: [1, 2, 3],
  number: 100
}

console.log(obj)
console.log(Gson.toJSON(obj))
console.log(Gson.toJSON(obj, false))

var test = _.cloneDeep(obj)
console.log(test)
