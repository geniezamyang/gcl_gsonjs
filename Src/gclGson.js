/**
 * @module gclGson
 * @description A module implement the GSON specification.
 *
 * - This module provides static methods to
 *   - Calculate JavaScript value's serialized size.
 *   - Serialize JavaScript value to buffer.
 *   - Deserialize JavaScript value from buffer.
 *   - Conver JavaScript value to string.
 * - The following built-in objects are augmented to implement some GSON types.
 *   - GSON Boolean is implemented by JavaScript Boolean.
 *   - GSON Number is implemented by JavaScript Number.
 *   - GSON Date is implemented by JavaScript Date.
 *   - GSON String is implemented by JavaScript String.
 *   - GSON Array is implemented by JavaScript Array.
 *   - GSON Map is implemented by JavaScript Map.
 *   - There is no GSON Object. However, JavaScript is serialized to GSON Map
 * for user convenience.
 * - The following modules implement the rest GSON types.
 *   - GSON Oper is implemented by gclGsonOper.
 *   - GSON Bin is implemented by gclGsonBin.
 *   - GSON Index is implemented by gclGsonIndex.
 *   - GSON Pair is implemented by gclGsonPair.
 *   - GSON Uuid is implemented by gclGsonUuid.
 *   - GSON Mac is implemented by gclGsonMac.
 *   - GSON Derive is implemented by gclGsonDerive.
 *   - GSON IP is implemented by gclGsonIp.
 *   - GSON Cidr is implemented by gclGsonCidr.
 *   - GSON Tag is implemented by gclGsonTag.
 */

const gclGsonType = require('./gclGsonType.js')
const gclGsonUtil = require('./gclGsonUtil.js')
const GclGsonOper = require('./gclGsonOper.js')
const GclGsonBin = require('./gclGsonBin.js')
const GclGsonIndex = require('./gclGsonIndex.js')
const GclGsonPair = require('./gclGsonPair.js')
const GclGsonUuid = require('./gclGsonUuid.js')
const GclGsonMac = require('./gclGsonMac.js')
const GclGsonDerive = require('./gclGsonDerive.js')
const GclGsonIp = require('./gclGsonIp.js')
const GclGsonCidr = require('./gclGsonCidr.js')
const GclGsonTag = require('./gclGsonTag.js')
const moment = require('moment')
const ipaddr = require('ipaddr.js')
const fs = require('fs')
/*
 * Deserialize a JavaScript value from a Buffer and index from the buffer.
 * @param {object} gson - a JavaScript object contains the following properties.
 * @param {buffer} gson.buf - the Buffer stores data to deserialize.
 * @param {number} gson.off - the index of the buffer to start deserializing.
 * @return the deserialized JavaScript object.
 */
function _deserialize (gson) {
  let val, len
  let boundary, tag
  let derive
  let src, dst
  let flag
  let lsb, msb
  let k, v
  let typeId = gson.buf[gson.off]
  // console.log("type", gson.off, typeId.toString(16))
  switch (typeId) {
    case gclGsonType.UNDEFINED:
      gson.off += 1
      val = undefined
      break
    case gclGsonType.NULL:
      gson.off += 1
      val = null
      break
    case gclGsonType.FALSE:
      gson.off += 1
      val = false
      break
    case gclGsonType.TRUE:
      gson.off += 1
      val = true
      break
    case gclGsonType.UINT8:
      gson.off += 1
      val = gson.buf.readUInt8(gson.off)
      gson.off += 1
      break
    case gclGsonType.UINT16:
      gson.off += 1
      val = gson.buf.readUInt16LE(gson.off)
      gson.off += 2
      break
    case gclGsonType.UINT32:
      gson.off += 1
      val = gson.buf.readUInt32LE(gson.off)
      gson.off += 4
      break
    case gclGsonType.NUMBER:
      gson.off += 1
      val = gson.buf.readDoubleLE(gson.off)
      gson.off += 8
      break
    case gclGsonType.INDEX:
    case gclGsonType.INDEX + 1:
    case gclGsonType.INDEX + 2:
    case gclGsonType.INDEX + 3:
      flag = gson.buf.readUInt8(gson.off) - gclGsonType.INDEX
      src = Boolean(flag & 2)
      dst = Boolean(flag & 1)
      gson.off += 1
      lsb = gson.buf.readUInt32LE(gson.off)
      gson.off += 4
      msb = gson.buf.readUInt32LE(gson.off)
      gson.off += 4
      val = new GclGsonIndex(src, dst, msb, lsb)
      break
    case gclGsonType.DOC8:
      gson.off += 1
      len = gson.buf.readUInt8(gson.off)
      gson.off += 1
      val = {}
      for (let i = 0; i < len; i += 2) {
        k = _deserialize(gson)
        v = _deserialize(gson)
        val[k] = v
      }
      break
    case gclGsonType.DOC16:
      gson.off += 1
      len = gson.buf.readUInt16LE(gson.off)
      gson.off += 2
      val = {}
      for (let i = 0; i < len; i += 2) {
        k = _deserialize(gson)
        v = _deserialize(gson)
        val[k] = v
      }
      break
    case gclGsonType.DOC32:
      gson.off += 1
      len = gson.buf.readUInt32LE(gson.off)
      gson.off += 4
      val = {}
      for (let i = 0; i < len; i += 2) {
        k = _deserialize(gson)
        v = _deserialize(gson)
        val[k] = v
      }
      break
    case gclGsonType.DATE:
      gson.off += 1
      val = new Date(gson.buf.readDoubleLE(gson.off))
      gson.off += 8
      break
    case gclGsonType.STRING8:
      gson.off += 1
      len = gson.buf.readUInt8(gson.off)
      gson.off += 1
      val = gson.buf.toString('utf8', gson.off, gson.off + len - 1)
      gson.off += len
      break
    case gclGsonType.STRING16:
      gson.off += 1
      len = gson.buf.readUInt16LE(gson.off)
      gson.off += 2
      val = gson.buf.toString('utf8', gson.off, gson.off + len - 1)
      gson.off += len
      break
    case gclGsonType.STRING32:
      gson.off += 1
      len = gson.buf.readUInt32LE(gson.off)
      gson.off += 4
      val = gson.buf.toString('utf8', gson.off, gson.off + len - 1)
      gson.off += len
      break
    case gclGsonType.OPER:
      gson.off += 1
      val = new GclGsonOper(gson.buf.readUInt8(gson.off))
      gson.off += 1
      break
    case gclGsonType.BIN8:
      gson.off += 1
      len = gson.buf.readUInt8(gson.off)
      gson.off += 1
      val = new GclGsonBin(gson.buf.slice(gson.off, gson.off + len))
      gson.off += len
      break
    case gclGsonType.BIN16:
      gson.off += 1
      len = gson.buf.readUInt16LE(gson.off)
      gson.off += 2
      val = new GclGsonBin(gson.buf.slice(gson.off, gson.off + len))
      gson.off += len
      break
    case gclGsonType.BIN32:
      gson.off += 1
      len = gson.buf.readUInt32LE(gson.off)
      gson.off += 4
      val = new GclGsonBin(gson.buf.slice(gson.off, gson.off + len))
      gson.off += len
      break
    case gclGsonType.UUID:
      gson.off += 1
      val = new GclGsonUuid(gson.buf.slice(gson.off, gson.off + 16))
      gson.off += 16
      break
    case gclGsonType.ARRAY8:
      gson.off += 1
      len = gson.buf.readUInt8(gson.off)
      gson.off += 1
      val = []
      for (let i = 0; i < len; i++) {
        val.push(_deserialize(gson))
      }
      break
    case gclGsonType.ARRAY16:
      gson.off += 1
      len = gson.buf.readUInt16LE(gson.off)
      gson.off += 2
      val = []
      for (let i = 0; i < len; i++) {
        val.push(_deserialize(gson))
      }
      break
    case gclGsonType.ARRAY32:
      gson.off += 1
      len = gson.buf.readUInt32LE(gson.off)
      gson.off += 4
      val = []
      for (let i = 0; i < len; i++) {
        val.push(_deserialize(gson))
      }
      break
    case gclGsonType.PAIR:
      gson.off += 1
      src = _deserialize(gson)
      dst = _deserialize(gson)
      val = new GclGsonPair(src, dst)
      break
    case gclGsonType.MAC:
      gson.off += 1
      val = new GclGsonMac(gson.buf.slice(gson.off, gson.off + 6))
      gson.off += 6
      break
    case gclGsonType.DERIVE:
      gson.off += 1
      derive = gson.buf.readUInt8(gson.off)
      val = new GclGsonDerive(derive)
      gson.off += 1
      break
    case gclGsonType.IP4:
      gson.off += 1
      val = new GclGsonIp(gson.buf.slice(gson.off, gson.off + 4))
      gson.off += 4
      break
    case gclGsonType.IP6:
      gson.off += 1
      val = new GclGsonIp(gson.buf.slice(gson.off, gson.off + 16))
      gson.off += 16
      break
    case gclGsonType.CIDR4:
      gson.off += 1
      len = gson.buf.readUInt8(gson.off)
      gson.off += 1
      val = new GclGsonCidr(`${ipaddr.fromByteArray(gson.buf.slice(gson.off, gson.off + 4)).toString()}/${len}`)
      gson.off += 4
      break
    case gclGsonType.CIDR6:
      gson.off += 1
      len = gson.buf.readUInt8(gson.off)
      gson.off += 1
      val = new GclGsonCidr(`${ipaddr.fromByteArray(gson.buf.slice(gson.off, gson.off + 16)).toString()}/${len}`)
      gson.off += 16
      break
    case gclGsonType.TAG8:
    case gclGsonType.TAG8 + 1:
      boundary = Boolean(gson.buf.readUInt8(gson.off) - gclGsonType.TAG8)
      gson.off += 1
      tag = gson.buf.readUInt8(gson.off)
      gson.off += 1
      val = new GclGsonTag(tag, boundary)
      break
    case gclGsonType.TAG16:
    case gclGsonType.TAG16 + 1:
      boundary = Boolean(gson.buf.readUInt8(gson.off) - gclGsonType.TAG16)
      gson.off += 1
      tag = gson.buf.readUInt16LE(gson.off)
      gson.off += 2
      val = new GclGsonTag(tag, boundary)
      break
    case gclGsonType.TAG32:
    case gclGsonType.TAG32 + 1:
      boundary = Boolean(gson.buf.readUInt8(gson.off) - gclGsonType.TAG32)
      gson.off += 1
      tag = gson.buf.readUInt32LE(gson.off)
      gson.off += 4
      val = new GclGsonTag(tag, boundary)
      break
    case gclGsonType.TAG52:
    case gclGsonType.TAG52 + 1:
      boundary = Boolean(gson.buf.readUInt8(gson.off) - gclGsonType.TAG52)
      gson.off += 1
      tag = gson.buf.readDoubleLE(gson.off)
      gson.off += 8
      val = new GclGsonTag(tag, boundary)
      break
    default:
      typeId = gson.buf[gson.off] & 0xE0
      len = gson.buf[gson.off] & 0x1F
      gson.off += 1
      switch (typeId) {
        case gclGsonType.FIXBIN:
          val = new GclGsonBin(gson.buf.slice(gson.off, gson.off + len))
          gson.off += len
          break
        case gclGsonType.FIXSTRING:
          val = gson.buf.toString('utf8', gson.off, gson.off + len - 1)
          gson.off += len
          break
        case gclGsonType.FIXUINT:
          val = len
          break
        case gclGsonType.FIXARRAY:
          val = []
          for (let i = 0; i < len; i++) {
            val.push(_deserialize(gson))
          }
          break
        case gclGsonType.FIXDOC:
          val = {}
          for (let i = 0; i < len; i += 2) {
            k = _deserialize(gson)
            v = _deserialize(gson)
            val[k] = v
          }
          //console.log(val)
          break
        default:
          throw new Error('Invalid Gson gclGsonType!')
      }
  }
  return val
}

/*
 * GSON Boolean
 */
Boolean.prototype.gclGsonCalcSize = function () {
  return 1
}
// Boolean.prototype.toJSON = function(){
//  return this.valueOf()
// }
Boolean.prototype.gclGsonSerialize = function (buf, off) {
  if (this.valueOf()) {
    buf.writeUInt8(gclGsonType.TRUE, off)
  } else {
    buf.writeUInt8(gclGsonType.FALSE, off)
  }
  off += 1
  return off
}

Boolean.prototype.gclGsonPrint = function (ident) {
  if (this.valueOf()) {
    return 'true'
  } else {
    return 'false'
  }
}

Boolean.prototype.toJSON = function (type = true) {
  return this.valueOf()
}

/*
 * GSON Number
 */
Number.prototype.gclGsonCalcSize = function () {
  var value = this.valueOf()
  if (Number.isInteger(value) && value >= 0) {
    if (value <= 0x1F) { // for FIXUINT shortType
      return 1
    } else if (value <= 0xFF) {
      return 2
    } else if (value <= 0xFFFF) {
      return 3
    } else if (value <= 0xFFFFFFFF) {
      return 5
    }
  }
  // can't compress
  return 9
}

Number.prototype.toJSON = function (type = true) {
  return this.valueOf()
}

Number.prototype.gclGsonSerialize = function (buf, off) {
  var value = this.valueOf()
  if (Number.isInteger(value) && value >= 0) {
    if (value <= 0x1F) {
      buf.writeUInt8(gclGsonType.FIXUINT + value, off)
      off += 1
      return off
    } else if (value <= 0xFF) {
      buf.writeUInt8(gclGsonType.UINT8, off)
      off += 1
      buf.writeUInt8(value, off)
      off += 1
      return off
    } else if (value <= 0xFFFF) {
      buf.writeUInt8(gclGsonType.UINT16, off)
      off += 1
      buf.writeUInt16LE(value, off)
      off += 2
      return off
    } else if (value <= 0xFFFFFFFF) {
      buf.writeUInt8(gclGsonType.UINT32, off)
      off += 1
      buf.writeUInt32LE(value, off)
      off += 4
      return off
    }
  }
    // can't compress
  buf.writeUInt8(gclGsonType.NUMBER, off)
  off += 1
  buf.writeDoubleLE(value, off)
  off += 8
  return off
}

Number.prototype.gclGsonPrint = function (ident) {
  return this.toString()
}

/*
 * There is no GSON Object. However, JavaScript Object can be serialized as
 * GSON Map.
 */
Object.prototype.gclGsonCalcSize = function () {
  var size = 0
  var length = Object.keys(this).length * 2
  if (length <= 0x1F) {
    size += 1
  } else if (length <= 0xFF) {
    size += 1
    size += 1
  } else if (length <= 0xFFFF) {
    size += 1
    size += 2
  } else if (length <= 0xFFFFFFFF) {
    size += 1
    size += 4
  } else {
    throw new Error('Too many object properties !!!')
  }

  for (var property in this) {
    let num = Number(property)
    if (isNaN(num)) {
      size += gclGsonUtil.calcSize(property)
    } else {
      size += gclGsonUtil.calcSize(num)
    }
    size += gclGsonUtil.calcSize(this[property])
  }
  return size
}

Object.prototype.gclGsonSerialize = function (buf, off) {
  let length = Object.keys(this).length * 2
  if (length <= 0x1F) {
    buf.writeUInt8(gclGsonType.FIXDOC + length, off)
    off += 1
  } else if (length <= 0xFF) {
    buf.writeUInt8(gclGsonType.DOC8, off)
    off += 1
    buf.writeUInt8(length, off)
    off += 1
  } else if (length <= 0xFFFF) {
    buf.writeUInt8(gclGsonType.DOC16, off)
    off += 1
    buf.writeUInt16LE(length, off)
    off += 2
  } else if (length <= 0xFFFFFFFF) {
    buf.writeUInt8(gclGsonType.DOC32, off)
    off += 1
    buf.writeUInt16LE(length, off)
    off += 4
  } else {
    throw new Error('Too many ojbect properties!!!')
  }

  for (let property in this) {
    let num = Number(property)
    if ( isNaN(num)) {
      off = gclGsonUtil.serialize(property, buf, off)
    } else {
      off = gclGsonUtil.serialize(num, buf, off)
    }
    off = gclGsonUtil.serialize(this[property], buf, off)
  }
  return off
}

Object.prototype.gclGsonPrint = function (ident) {
  var str = '{'
  var sep = '\n'
  var first = true
  ident += 2
  for (var property in this) {
    if (this.hasOwnProperty(property)) {
      str += sep
      str += ' '.repeat(ident)
      str += gclGsonUtil.print(property, ident)
      str += ': '
      str += gclGsonUtil.print(this[property], ident)
      sep = ',\n'
    }
  }
  ident -= 2
  str += '\n' + ' '.repeat(ident) + '}'
  return str
}

Object.prototype.toJSON = function (type = true) {
  var rlt = new Object()
  Object.keys(this).forEach(key => {
    rlt[key] = gclGsonUtil.toJSON(this[key], type)
  })
  return rlt
}

Object.prototype.gclGsonToString = function (ident) {
  var str = '{'
  var sep = '\n'
  var first = true
  ident += 2
  for (var property in this) {
    if (this.hasOwnProperty(property)) {
      str += sep
      str += ' '.repeat(ident)
      str += gclGsonUtil.toString(property, ident)
      str += ': '
      str += gclGsonUtil.toString(this[property], ident)
      sep = ',\n'
    }
  }
  ident -= 2
  str += '\n' + ' '.repeat(ident) + '}'
  return str
}

// hide the property, avoid infinite loop in for loop
Object.defineProperty(Object.prototype, 'toJSON', {enumerable: false})
Object.defineProperty(Object.prototype, 'gclGsonPrint', {enumerable: false})
Object.defineProperty(Object.prototype, 'gclGsonToString', {enumerable: false})
Object.defineProperty(Object.prototype, 'gclGsonSerialize', {enumerable: false})
Object.defineProperty(Object.prototype, 'gclGsonCalcSize', {enumerable: false})

/*
 * GSON Date
 */
Date.prototype.gclGsonCalcSize = function () {
  return 9 // 1 + 8(double) TBD...C and Javascript how to transfer?
}

Date.prototype.gclGsonSerialize = function (buf, off) {
  buf.writeUInt8(gclGsonType.DATE, off)
  off += 1
  buf.writeDoubleLE(this.valueOf(), off)
  off += 8
  return off
}

Date.prototype.gclGsonPrint = function (ident) {
  return 'Date("' + this.toJSON() + '")'
}

/*
 * GSON String
 */
String.prototype.gclGsonCalcSize = function () {
  var size = 0
  var strlen = Buffer.byteLength(this.valueOf())
  if (strlen <= 0x1E) {
    size += 1
  } else if (strlen <= 0xFE) {
    size += 2
  } else if (strlen <= 0xFFFE) {
    size += 3
  } else if (strlen <= 0xFFFFFFFE) {
    size += 5
  } else {
    throw new Error('String size overflow')
  }

  // type + strlen + EOS
  size += strlen
  size += 1
  return size
}

String.prototype.gclGsonSerialize = function (buf, off) {
  var len = Buffer.byteLength(this.valueOf())
  if (len <= 0x1E) {
    buf.writeUInt8(gclGsonType.FIXSTRING + len + 1, off)
    off += 1
  } else if (len <= 0xFE) {
    buf.writeUInt8(gclGsonType.STRING8, off)
    off += 1
    buf.writeUInt8(len + 1, off)
    off += 1
  } else if (len <= 0xFFFE) {
    buf.writeUInt8(gclGsonType.STRING16, off)
    off += 1
    buf.writeUInt16LE(len + 1, off)
    off += 2
  } else if (len <= 0xFFFFFFFE) {
    buf.writeUInt8(gclGsonType.STRING32, off)
    off += 1
    buf.writeUInt32LE(len + 1, off)
    off += 4
  } else {
    throw new Error('String size overflow')
  }

  buf.write(this.valueOf(), off)
  off += len
  buf.writeUInt8(0, off) // EOS
  off += 1
  return off
}

String.prototype.gclGsonPrint = function (ident) {
  return '"' + this.valueOf() + '"'
}

String.prototype.toJSON = function (type = true) {
  return this.valueOf()
}

/*
 * GSON Array
 */
Array.prototype.gclGsonCalcSize = function () {
  var size = 0
  if (this.length <= 0x1F) {
    size += 1
  } else if (this.length <= 0xFF) {
    size += 2
  } else if (this.length <= 0xFFFF) {
    size += 3
  } else if (this.length <= 0xFFFFFFFF) {
    size += 5
  } else {
    throw new Error('Array length overflow')
  }

  this.forEach(function (elem) {
    size += gclGsonUtil.calcSize(elem)
  })
  return size
}

Array.prototype.gclGsonSerialize = function (buf, off) {
  if (this.length <= 0x1F) {
    buf.writeUInt8(gclGsonType.FIXARRAY + this.length, off)
    off += 1
  } else if (this.length <= 0xFF) {
    buf.writeUInt8(gclGsonType.ARRAY8, off)
    off += 1
    buf.writeUInt8(this.length, off)
    off += 1
  } else if (this.length <= 0xFFFF) {
    buf.writeUInt8(gclGsonType.ARRAY16, off)
    off += 1
    buf.writeUInt16LE(this.length, off)
    off += 2
  } else if (this.length <= 0xFFFFFFFF) {
    buf.writeUInt8(gclGsonType.ARRAY32, off)
    off += 1
    buf.writeUInt32LE(this.length, off)
    off += 4
  } else {
    throw new Error('Array length overflow')
  }

  this.forEach(function (elem) {
    off = gclGsonUtil.serialize(elem, buf, off)
  })
  return off
}

Array.prototype.toJSON = function (type = true) {
  var rlt = []
  this.forEach(function (item, index) {
    rlt[index] = gclGsonUtil.toJSON(item, type)
  })
  return rlt
}

Array.prototype.gclGsonPrint = function (ident) {
  var str = '['
  var sep = '\n'
  ident += 2
  this.forEach(function (elem) {
    str += sep
    str += ' '.repeat(ident)
    str += gclGsonUtil.print(elem, ident)
    sep = ',\n'
  })
  ident -= 2
  str += '\n' + ' '.repeat(ident) + ']'
  return str
}

Array.prototype.gclGsonToString = function (ident) {
  var str = '['
  var sep = '\n'
  ident += 2
  this.forEach(function (elem) {
    str += sep
    str += ' '.repeat(ident)
    str += gclGsonUtil.toString(elem, ident)
    sep = ',\n'
  })
  ident -= 2
  str += '\n' + ' '.repeat(ident) + ']'
  return str
}

/**
 * Calculate a Javascript value's serialized size.
 * @param val - the JavaScript value to serialize.
 * @return {Number} the serialized size in bytes.
 */
exports.calcSize = function (val) {
  return gclGsonUtil.calcSize(val)
}

/**
 * Serialize a Javascript value to a buffer.
 * @param val - the JavaScript value to serialize.
 * @param buf - the buffer to store serialized data.
 * @param off - the start offset of buffer.
 */
exports.serialize = function (val, buf, off) {
  gclGsonUtil.serialize(val, buf, off)
}

exports.toJSON = function (val, type = true) {
  return gclGsonUtil.toJSON(val, type)
}
/**
 * Deserialize a JavaScript value from a buffer.
 * @return the deserialized JavaScript object.
 */
exports.deserialize = function (buf) {
  return _deserialize({buf: buf, off: 0})
}

/**
 * Convert a Javascript value to a string.
 * @param arr, array should contain [{name: <string>,constructor: <function>, isinstance:<function>, print:<function}].
 * @return {string} the converted string.
 */
// var gson_extend = new Array()
// exports.Extend = function (arr) {
//  arr.forEach((elt, index, array) => {
//    exports[elt.name] = elt.constructor
//    gson_extend.push(elt)
//  })
// }

/**
 * Convert a Javascript value to a string.
 * @param val - the JavaScript value to convert.
 * @return {string} the converted string.
 */
exports.print = function (val, ident = 0) {
    // for (let el of gson_extend) {
    //  if(el.isinstance(val)){
    //    return el.print(val)
    //  }
    // }
  return gclGsonUtil.print(val, ident)
}

exports.flatten = function (val) {
  var target = {}
  var path = ''
    // console.log('gclGson.flatten(): val=', val)
  gclGsonUtil.flatten(val, target, path)
  return target
}

exports.toString = function (val, ident = 0) {
  return gclGsonUtil.toString(val, ident)
}

/**
 * Convert a JSON value to a GSON.
 * @param val - the JSON value to convert.
 * @return {GSON} the converted .
 */
var fromJSON = function (val) {
  var rlt
  if (val === undefined) {
    return undefined
  } else if (val === null) {
    return null
  } else if (typeof val === 'boolean' || val instanceof Boolean) {
    // return new Boolean(val)
    return val
  } else if (typeof val === 'number' || val instanceof Number) {
    // return new Number(val)
    return val
  } else if (typeof val === 'string' || val instanceof String) {
    // DATE
    // Format 2018-02-03T12:00:02.020Z
    // Run moment validtate first, Exp is slow.
    if (moment(val, moment.ISO_8601).isValid() && val.match(new RegExp('.*-.*-.*T.*:.*:.*[.].*Z'))) {
      return new Date(val)
    }
    // String
    // return new String(val)
    return val
  } else if (Array.isArray(val)) {  // Array
    rlt = []
    val.forEach(function (item, index) {
      rlt[index] = fromJSON(item)
    })
    return rlt
  } else {  // Object
    if (val.hasOwnProperty('__INDEX')) {
      return new GclGsonIndex(val['__INDEX']['__DIR'][0], val['__INDEX']['__DIR'][1],
                val['__INDEX']['__VALUE'][0], val['__INDEX']['__VALUE'][1])
    }
    if (val.hasOwnProperty('__OPER')) {
      return new GclGsonOper(val['__OPER'])
    }
    if (val.hasOwnProperty('__BIN')) {
      return new GclGsonBin(Buffer.from(val['__BIN'], 'hex'))
    }
    if (val.hasOwnProperty('__UUID')) {
      return new GclGsonUuid(val['__UUID'], 'hex')
    }
    if (val.hasOwnProperty('__PAIR')) {
      return new GclGsonPair(fromJSON(val['__PAIR'][0]), fromJSON(val['__PAIR'][1]))
    }
    if (val.hasOwnProperty('__MAC')) {
      return new GclGsonMac(val['__MAC'])
    }
    if (val.hasOwnProperty('__DERIVE')) {
      return new GclGsonDerive(val['__DERIVE'])
    }
    if (val.hasOwnProperty('__IP')) {
      return new GclGsonIp(val['__IP'])
    }
    if (val.hasOwnProperty('__CIDR')) {
      return new GclGsonCidr(val['__CIDR'])
    }
    if (val.hasOwnProperty('__TAG')) {
      return new GclGsonTag(val['__TAG']['__VALUE'], val['__TAG']['__BOUNDARY'])
    }
    rlt = {}
    Object.keys(val).forEach((key) => {
      if (!isNaN(key)) {  // Key is number
        rlt[parseInt(key, 10)] = fromJSON(val[key])
      } else {
        rlt[key] = fromJSON(val[key])
      }
    })
    return rlt
  }
}

exports.fromJSON = fromJSON

exports.exportFile = function (data, path) {
  return new Promise((resolve, reject) => {
    try {
      let buffer = Buffer.alloc(gclGsonUtil.calcSize(data))
      gclGsonUtil.serialize(data, buffer, 0)
      fs.writeFile(path, buffer, (err) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    } catch (e) {
      reject(e) // catch error from calcSize
    }
  })
}

exports.importFile = function (path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, (err, serData) => {
      if (err) {
        reject(err)
      } else {
        try {
          let result = _deserialize({buf: serData, offset: 0})
          resolve(result)
        } catch (err) { // catch from _deserialize error
          reject(err)
        }
      }
    })
  })
}

exports.validator = function (type, val) {
  switch (type) {
    case gclGsonType.UNDEFINED:
      if (typeof val !== typeof undefined) {
        return {
          rlt: false,
          err: `Error: the input "${val}" is not "undefined"`
        }
      }
      break
    case gclGsonType.NULL:
      if (typeof val !== typeof null) {
        return {
          rlt: false,
          err: `Error: the input "${val}" is not "null"`
        }
      }
      break
    case gclGsonType.FALSE:
    case gclGsonType.TRUE:
      if (typeof val !== typeof true) {
        return {
          rlt: false,
          err: `Error: the input "${val}" is not "Boolean"`
        }
      }
      break
    case gclGsonType.UINT8:
    case gclGsonType.UINT16:
    case gclGsonType.UINT32:
    case gclGsonType.NUMBER:
      if (typeof val !== typeof 1) {
        return {
          rlt: false,
          err: `Error: the input "${val}" is not "Number"`
        }
      }
      break
    case gclGsonType.INDEX:
    case gclGsonType.INDEX + 1:
    case gclGsonType.INDEX + 2:
    case gclGsonType.INDEX + 3:
      break
    case gclGsonType.DATE:
      if (typeof val !== typeof new Date()) {
        return {
          rlt: false,
          err: `Error: the input "${val}" is not "Date"`
        }
      }
      break
    case gclGsonType.STRING8:
    case gclGsonType.STRING16:
    case gclGsonType.STRING32:
    case gclGsonType.OPER:
    case gclGsonType.BIN8:
    case gclGsonType.BIN16:
    case gclGsonType.BIN32:
    case gclGsonType.UUID:
    case gclGsonType.ARRAY8:
    case gclGsonType.ARRAY16:
    case gclGsonType.ARRAY32:
      if (Array.isArray(val) === false) {
        return {
          rlt: false,
          err: `Error: the input "${val}" is not "Array"`
        }
      }
      break
    case gclGsonType.PAIR:
      break
    case gclGsonType.MAC:
      return GclGsonMac.validator(val)
    case gclGsonType.DERIVE:
      break
    case gclGsonType.IP4:
    case gclGsonType.IP6:
      return GclGsonIp.validator(val)
    case gclGsonType.CIDR4:
    case gclGsonType.CIDR6:
      return GclGsonCidr.validator(val)
    case gclGsonType.TAG8:
    case gclGsonType.TAG8 + 1:
      break
    case gclGsonType.TAG16:
    case gclGsonType.TAG16 + 1:
      break
    case gclGsonType.TAG32:
    case gclGsonType.TAG32 + 1:
      break
    case gclGsonType.TAG52:
    case gclGsonType.TAG52 + 1:
      break
    default:
      return {
        rlt: false,
        err: `Undefined type: ${type}`
      }
  }
  return {
    rlt: true,
    err: null
  }
}
