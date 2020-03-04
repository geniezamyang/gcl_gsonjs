/**
 * A module implements the GSON Ip type.
 * @module gclGsonIp
 */
const GsonType = require('./gclGsonType.js')
const ipaddr = require('ipaddr.js')
module.exports = class Ip extends Uint8Array {
    /**
     * Create an instance of gclGsonIp.
     * @param {arg} arg - same as Uint8Array()
     * @return {gclGsonIp} - an instance of gclGsonIp
     */
  constructor (...arg) {
    if (arg[0] === undefined) {
      throw new Error('the input is neither an IPv6 nor IPv4 address')
    } else if (typeof arg[0] === 'string') {
      super(ipaddr.parse(arg[0]).toByteArray())
    } else if (Array.isArray(arg[0]) && (arg[0].length === 4 || arg[0].length === 16)) {
      arg[0].forEach(item => {
        if (item < 0 || item > 255) {
          throw new Error('the input is neither an IPv6 nor IPv4 address')
        }
      })
      super(...arg)
    } else if (arg[0] instanceof ArrayBuffer || arg[0] instanceof Buffer) {
      super(...arg)
    } else {
      throw new Error('the input is neither an IPv6 nor IPv4 address')
    }
  }

  toJSON (type = true) {
    if (type) {
      return {'__IP': ipaddr.fromByteArray(this).toString()}
    } else {
      return ipaddr.fromByteArray(this).toString()
    }
  }

  gclGsonCalcSize () {
    return this.length + 1
    // return (5)
  }

  gclGsonSerialize (buf, off) {
    if (this.length === 4) {
      buf.writeUInt8(GsonType.IP4, off)
    } else {
      buf.writeUInt8(GsonType.IP6, off)
    }
    // buf.writeUInt8(GsonType.IP, off)
    off += 1
    Buffer.from(this).copy(buf, off)
    off += this.length
    // off += 4
    return off
  }

  gclGsonPrint (ident) {
    var str = 'Ip("'
    str += ipaddr.fromByteArray(this).toString()
    str += '")'
    return str
  }

  toString () {
    return ipaddr.fromByteArray(this).toString()
  }

  static validator (...arg) {
    if (arg[0] === undefined) {
      return {
        rlt: false,
        err: `Error: the input "${arg[0]}" is neither an IPv6 nor IPv4 address`
      }
    } else if (typeof arg[0] === 'string') {
      let tmp = Number(arg[0])
      if (!Number.isNaN(tmp)) {
        return {
          rlt: false,
          err: `Error: the input "${arg[0]}" is neither an IPv6 nor IPv4 address`
        }
      }
      try {
        ipaddr.parse(arg[0])
        return {
          rlt: true,
          err: null
        }
      } catch (err) {
        // "192.168.0.1000"
        return {
          rlt: false,
          err: err.toString()
        }
      }
    } else if (Array.isArray(arg[0]) && (arg[0].length === 4 || arg[0].length === 16)) {
      let tmp = arg[0].join('.')
      try {
        ipaddr.parse(tmp).toByteArray()
        return {
          rlt: true,
          err: null
        }
      } catch (err) {
        // "192.168.0.1000"
        return {
          rlt: false,
          err: err.toString()
        }
      }
    } else if (arg[0] instanceof ArrayBuffer || arg[0] instanceof Buffer) {
    } else {
      return {
        rlt: false,
        err: `Error: the input "${arg[0]}" is neither an IPv6 nor IPv4 address`
      }
    }
  }
}
