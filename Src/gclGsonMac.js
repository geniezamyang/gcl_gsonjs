/**
 * A module implements the GSON Mac type.
 * @module gclGsonMac
 */
const GsonType = require('./gclGsonType.js')
const GsonUtil = require('./gclGsonUtil.js')
module.exports = class Mac extends Uint8Array {
    /**
     * Create an instance of gclGsonMac.
     * @param {arg} arg - same as Uint8Array()
     * @return {gclGsonMac} - an instance of gclGsonMac
     */
  constructor (...arg) {
    if (arg[0] === undefined) {
      super(6)
    } else if (typeof arg[0] === 'string' || arg[0] instanceof String) {
      var array = arg[0].split(':')
      array.forEach((element, index, arr) => { array[index] = parseInt(element, 16) })
      super(array)
    } else {
      super(...arg)
    }
  }

  toJSON (type = true) {
    if (type) {
      return {'__MAC': GsonUtil.toHexString(this[0]) + ':' +
          GsonUtil.toHexString(this[1]) + ':' +
          GsonUtil.toHexString(this[2]) + ':' +
          GsonUtil.toHexString(this[3]) + ':' +
          GsonUtil.toHexString(this[4]) + ':' +
          GsonUtil.toHexString(this[5])}
    } else {
      return GsonUtil.toHexString(this[0]) + ':' +
          GsonUtil.toHexString(this[1]) + ':' +
          GsonUtil.toHexString(this[2]) + ':' +
          GsonUtil.toHexString(this[3]) + ':' +
          GsonUtil.toHexString(this[4]) + ':' +
          GsonUtil.toHexString(this[5])
    }
  }

  gclGsonCalcSize () {
    return (7) // 1 + 6{mac}
  }

  gclGsonSerialize (buf, off) {
    buf.writeUInt8(GsonType.MAC, off)
    off += 1
    Buffer.from(this).copy(buf, off)
    off += 6
    return off
  }

  gclGsonPrint (ident) {
    var str = 'Mac("'
    for (var i = 0; i < 6; i++) {
      str += Buffer.from(this.buffer, i, 1).toString('hex')
      if (i !== 5) {
        str += ':'
      }
    }
    str += '")'
    return str
  }

  toString () {
    var str = ''
    for (var i = 0; i < 6; i++) {
      str += Buffer.from(this.buffer, i, 1).toString('hex')
      if (i !== 5) {
        str += ':'
      }
    }
    return str
  }

  static validator (...arg) {
    if (arg[0] === undefined) {
      return {
        rlt: false,
        err: `Error: the input "${arg[0]}" is not an MAC format`
      }
    } else if (typeof arg[0] === 'string' || arg[0] instanceof String) {
      var array = arg[0].split(':')
      if (array.length !== 6) {
        return {
          rlt: false,
          err: `Error: the input "${arg[0]}" is not an MAC format`
        }
      }

      for (var idx = 0; idx < array.length; idx++) {
        if (isNaN(parseInt(array[idx], 16)) === true) {
          return {
            rlt: false,
            err: `Error: the input "${arg[0]}" is not an MAC format`
          }
        }
      }
    }
    return {
      rlt: true,
      err: null
    }
  }
}
