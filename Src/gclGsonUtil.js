/*
 * Calcculate a Javascript object's serialized size.
 * @param {object} obj - the JavaScript object to serialize.
 * @return {number} the serialized size.
 */
const gclGsonType = require('./gclGsonType.js')
const GclGsonOper = require('./gclGsonOper')
const GclGsonCidr = require('./gclGsonCidr')
const GclGsonDerive = require('./gclGsonDerive')
const GclGsonIndex = require('./gclGsonIndex')
const GclGsonTag = require('./gclGsonTag')

exports.calcSize = function (val) {
  if (val === undefined) {
    return 1
  } else if (val === null) {
    return 1
  } else if (typeof val.gclGsonCalcSize !== 'function'){
    return 1
  } else {
    return val.gclGsonCalcSize()
  }
}

/*
 * Convert a Javascript object to a string in GSON format.
 * @param {object} obj - the object to print.
 * @param {number} ident - the identation.
 * @return {string} the result string.
 */
exports.print = function (obj, ident = 0) {
  if (obj === undefined) {
    return 'undefined'
  } else if (obj === null || typeof obj.gclGsonPrint !== 'function') {
    return 'null'
  } else {
    return obj.gclGsonPrint(ident)
  }
}

exports.toString = function (obj, ident = 0) {
  if (obj === null) {
    return 'null'
  } else if (obj === undefined) {
    return 'undefined'
  } else if (typeof (obj) === 'string') {
    return obj
  } else if (Array.isArray(obj)) {
    return obj.gclGsonToString(ident)
  } else if (obj instanceof Object) {
    if (obj instanceof Uint8Array) {
      // Bin, Ip, MAC, Uuid
      return obj.toString()
    } else if (obj instanceof Date || obj instanceof GclGsonCidr || obj instanceof GclGsonDerive ||
      obj instanceof GclGsonIndex || obj instanceof GclGsonTag || obj instanceof GclGsonOper) {
      return obj.toString()
    }
    return obj.gclGsonToString(ident)
  } else {
    return obj.toString()
  }
}
/*
 * Serialize a Javascript object to a Buffer and index into the buffer.
 * @param {object} obj - the JavaScript object to serialize.
 * @param {buffer} buf - the Buffer to store the serialized GSON data.
 * @param {number} off - the index in the buffer to start serializing.
 * @return {number} the new write index in the Buffer.
 */
exports.serialize = function (val, buf, off) {
  if (val === undefined) {
    buf.writeUInt8(gclGsonType.UNDEFINED, off)
    off += 1
    return off
  } else if (val === null) {
    buf.writeUInt8(gclGsonType.NULL, off)
    off += 1
    return off
  } else if (typeof val.gclGsonSerialize !== 'function'){ // val is unknown type
    buf.writeUInt8(gclGsonType.UNDEFINED, off)
    off += 1
    return off
  } else {
    return val.gclGsonSerialize(buf, off)
  }
}

exports.toJSON = function (val, type) {
  if (val === undefined) {
    return undefined
  } else if (val === null) {
    return null
  } else if (typeof val.toJSON !== 'function') {
    return null
  } else {
    return val.toJSON(type)
  }
}

exports.toHexString = function (num) {
  let str = num.toString(16)
  return '0'.repeat(2 - str.length) + str
}

exports.flatten = function (val, target, path) {
  // console.log('gclGsonUtil.flatten(): val=', val, 'target=', target, 'path=', path)
  if (val !== undefined) {
    if (val.gclGsonFlatten) {
      val.gclGsonFlatten(target, path)
    } else {
      // target[path] = val
      target[path] = exports.toString(val)
      target[path].__data = val
    }
  }
}
