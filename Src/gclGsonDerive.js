/**
 * A module implements the GSON Mac type.
 * @module gclGsonDerive
 */
const GsonType = require('./gclGsonType.js')
module.exports = class Derive {
    /**
     * Create an instance of gclGsonDerive.
     * @param {arg} arg - the derived function ID
     * @return {gclGsonDerive} - an instance of gclGsonDerive
     */
  constructor (arg) {
    this.derive = arg
  }

  toJSON (type = true) {
    if (type) {
      return {'__DERIVE': this.derive}
    } else {
      return this.derive
    }
  }

  gclGsonCalcSize () {
    return (2) // 1 + 1{uint}
  }

  gclGsonSerialize (buf, off) {
    buf.writeUInt8(GsonType.DERIVE, off)
    off += 1
    buf.writeUInt8(this.derive, off)
    off += 1
    return off
  }

  gclGsonPrint (ident) {
    var str = 'Derive('
    str += this.derive
    str += ')'
    return str
  }

  toString () {
    return this.derive.toString()
  }

  // static validator (val) {
  //   var json = val.toJSON()
  //   if (json.hasOwnProperty('__DERIVE') === false) {
  //     return {
  //       rlt: false,
  //       err: `Error: the input "${val}" is not a GSON Derive format`
  //     }
  //   }
  //   return {
  //     rlt: true,
  //     err: null
  //   }
  // }
}
