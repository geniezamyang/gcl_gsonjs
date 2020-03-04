/**
 * A module implements the GSON Index type.
 * @module gclGsonIndex
 */

const GsonType = require('./gclGsonType.js')
// const GsonUtil = require('./gclGsonUtil.js')

module.exports = class Index {
    /**
     * Create an instance of gclGsonIndex.
     * @param {boolean} src - the source flag.
     * @param {boolean} dst - the destination flag.
     * @param {number} hi - the higher 32-bits value.
     * @param {number} lo - an instance of gclGsonIndex.
     * @return {gclGsonIndex} - an instance of gclGsonIndex
     */
  constructor (src, dst, hi, lo) {
    this.src = src // should be Boolean
    this.dst = dst // should be Boolean
    this.hi = hi // should be Number
    this.lo = lo // should be Number
  }

  gclGsonCalcSize () {
    return 9
  }

  toJSON (type = true) {
    return {'__INDEX': {'__DIR': [this.src, this.dst], '__VALUE': [this.hi, this.lo]}}
  }

  gclGsonSerialize (buf, off) {
    var subtype = 0
    if (this.src) { subtype += 2 }
    if (this.dst) { subtype += 1 }
    buf.writeUInt8(GsonType.INDEX + subtype, off)
    off += 1
    buf.writeUInt32LE(this.lo, off)
    off += 4
    buf.writeUInt32LE(this.hi, off)
    off += 4
    return off
  }

  gclGsonPrint (ident) {
    var str = 'Index("'
    if (this.src) { str += '1.' } else { str += '0.' }
    if (this.dst) { str += '1.' } else { str += '0.' }
    str += this.hi.toString() + '.'
    str += this.lo.toString() + '")'
    return str
  }

  toString () {
    var str = ''
    if (this.src) { str += '1.' } else { str += '0.' }
    if (this.dst) { str += '1.' } else { str += '0.' }
    str += this.hi.toString() + '.'
    str += this.lo.toString()
    return str
  }
}
