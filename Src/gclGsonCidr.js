/**
 * A module implements the GSON Ip type.
 * @module gclGsonCidr
 */
const GsonType = require('./gclGsonType.js')
const ipaddr = require('ipaddr.js')

module.exports = class Cidr {
    /**
     * Create an instance of gclGsonCidr.
     * @param {arg} arg - the cidr string
     * @return {gclGsonCidr} - an instance of gclGsonCidr
     */
  constructor (arg) {
    // if (arg[0] === undefined) {
    //   throw new Error('the input is neither an IPv6 nor IPv4 address')
    // } else if (typeof arg[0] === 'string') {
    //   super(ipaddr.parse(arg[0]).toByteArray())
    // } else {
    //   super(...arg)
    // }
    if (typeof arg !== 'string') {
      throw new Error('the input is neither an IPv6 nor IPv4 CIDR format')
    }
    let str = arg.split('/')
    this.ip = ipaddr.parse(str[0]).toByteArray()

    if (isNaN(str[1])) {
      throw new Error(`the input ${arg} is neither an IPv6 nor IPv4 CIDR address`)
    }

    this.len = parseInt(str[1])
  }

  toJSON (type = true) {
    if (type) {
      return {'__CIDR': `${ipaddr.fromByteArray(this.ip).toString()}/${this.len}`}
    } else {
      return `${ipaddr.fromByteArray(this.ip).toString()}/${this.len}`
    }
  }

  gclGsonCalcSize () {
    // type + len + ip
    return 2 + this.ip.length
  }

  gclGsonSerialize (buf, off) {
    if (this.ip.length === 4) {
      buf.writeUInt8(GsonType.CIDR4, off)
    } else {
      buf.writeUInt8(GsonType.CIDR6, off)
    }
    off += 1
    buf.writeUInt8(this.len, off)
    off += 1
    Buffer.from(this.ip).copy(buf, off)
    off += this.ip.length
    return off
  }

  gclGsonPrint (ident) {
    var str = 'Cidr("'
    str += `${ipaddr.fromByteArray(this.ip).toString()}/${this.len}`
    str += '")'
    return str
  }

  toString () {
    return `${ipaddr.fromByteArray(this.ip).toString()}/${this.len}`
  }

  static validator (arg) {
    if (arg === undefined) {
      return {
        rlt: false,
        err: `Error: the input "${arg}" is neither an IPv6 nor IPv4 Cidr address`
      }
    } else if (typeof arg === 'string') {
      try {
        let str = arg.split('/')
        let ip = ipaddr.parse(str[0]).toByteArray()

        if (isNaN(str[1])) {
          return {
            rlt: false,
            err: `Error: the input "${arg}" is neither an IPv6 nor IPv4 Cidr address`
          }
        }

        let len = parseInt(str[1])
        let flag = false
        if (ip.length === 4) {
          if (len > 32) {
            flag = true
          }
        } else {
          if (len > 128) {
            flag = true
          }
        }

        if (flag) {
          return {
            rlt: false,
            err: `Error: the input "${arg}" is neither an IPv6 nor IPv4 Cidr address`
          }
        }
      } catch (err) {
        // "192.168.0.1000"
        return {
          rlt: false,
          err: err.toString()
        }
      }
    } else {
      return {
        rlt: false,
        err: `Error: the input "${arg}" is neither an IPv6 nor IPv4 Cidr address`
      }
    }
    return {
      rlt: true,
      err: null
    }
  }
}
