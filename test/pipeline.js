const Gson = require('../index.js')
// console.log(new Date().toISOString())

// console.log(JSON.parse(Gson.toJSON({
//   key: new Gson.Ip('192.168.10.1'),
//   arr: [1, 2, 3],
//   number: 100
// })))

console.log(Gson.toJSON({
  key: new Gson.Ip('192.168.10.1'),
  arr: [1, 2, 3],
  number: 100
}))
console.log(JSON.stringify(Gson.toJSON({
  key: new Gson.Ip('192.168.10.1'),
  arr: [1, 2, 3],
  number: 100
})))
var pipeline1 = {
  ip: new Gson.Ip('192.168.10.1'),
  date: new Date(),
  number: 100,
  key: [
    new Gson.Oper(146),
    [
      new Gson.Ip('192.168.10.1'),
      302
    ],
    'absolute'
  ]
}
var pipeline2 = [
  new Gson.Oper(146),
  [
    new Gson.Ip('192.168.10.1'),
    302
  ],
  'absolute'
]
// var buf
// var des

// console.log(Gson.print(pipeline))
// buf = Buffer.alloc(Gson.calcSize(pipeline))
// Gson.serialize(pipeline, buf, 0)
// console.log('Buf = ', buf)
// des = Gson.deserialize(buf)
// console.log('Des = ', Gson.print(des))
console.log(Gson.toString(pipeline1))
// console.log(Gson.print(pipeline1))
// console.log(Gson.toString(pipeline2))
// console.log(Gson.print(pipeline2))
