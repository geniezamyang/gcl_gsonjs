/**
 * A module implements the GSON Mac type.
 * @module gclGsonTag
 */
const GsonType = require('./gclGsonType.js')
module.exports = class Tag {
  /**
   * Create an instance of gclGsonTag.
   * @param {integer} tag - the tag ID
   * @return {gclGsonTag} - an instance of gclGsonTag
   */
  constructor (tag, boundary = true) {
    if (!Number.isInteger(tag) || tag < 0) {
      throw new Error('tag id shall be non-negative integer')
    }
    this.tag = tag
    this.boundary = boundary
  }

  toJSON (type = true) {
    return {'__TAG': {'__BOUNDARY': this.boundary, '__VALUE': this.tag}}
  }

  gclGsonCalcSize () {
    var value = this.tag
    if (value <= 0xFF) {
      return 2 // 0x28~0x29 + 1{uint}
    } else if (value <= 0xFFFF) {
      return 3 // 0x2A~0x2B + 2{uint}
    } else if (value <= 0xFFFFFFFF) {
      return 5 // 0x2C~0x2D + 4{uint}
    }

    return 9 // 0x2E~0x2F + 8{double}
  }

  gclGsonSerialize (buf, off) {
    let value = this.tag
    let boundary = this.boundary ? 1 : 0
    if (value <= 0xFF) {
      buf.writeUInt8(GsonType.TAG8 + boundary, off)
      off += 1
      buf.writeUInt8(value, off)
      off += 1
      return off
    } else if (value <= 0xFFFF) {
      buf.writeUInt8(GsonType.TAG16 + boundary, off)
      off += 1
      buf.writeUInt16LE(value, off)
      off += 2
      return off
    } else if (value <= 0xFFFFFFFF) {
      buf.writeUInt8(GsonType.TAG32 + boundary, off)
      off += 1
      buf.writeUInt32LE(value, off)
      off += 4
      return off
    }

    // can't compress
    buf.writeUInt8(GsonType.TAG52 + boundary, off)
    off += 1
    buf.writeDoubleLE(value, off)
    off += 8
    return off
  }

  gclGsonPrint (ident) {
    var str = 'Tag('
    str += this.boundary
    str += '.'
    str += this.tag
    str += ')'
    return str
  }

  toString () {
    var str = ''
    str += this.boundary
    str += '.'
    str += this.tag
    str += ''
    return str
  }
}
