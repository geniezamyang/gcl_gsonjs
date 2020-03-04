/**
 * A module implements the GSON Bin type.
 * @module gclGsonBin
 */
const GsonType = require('./gclGsonType.js')

module.exports = class Bin extends Uint8Array {
  /**
   * Create an instance of gclGsonBin.
   * @param {arg} arg - same as Uint8Array()
   * @return {gclGsonBin} - an instance of gclGsonBin
   */
  // constructor (...arg) {
  //   if (Array.isArray(arg) === false) {
  //     throw new Error('the input is not an Uint8Array')
  //   } else {
  //     super(...arg)
  //   }
  // }

  toJSON (type = true) {
    if (type) {
      return {'__BIN': Buffer.from(this).toString('hex')}
    } else {
      return Buffer.from(this).toString('hex')
    }
  }

  gclGsonCalcSize () {
    var size = 0
    if (this.length <= 0x1F) {
      size += 1
    } else if (this.length <= 0xFF) {
      size += 1
      size += 1
    } else if (this.length <= 0xFFFF) {
      size += 1
      size += 2
    } else if (this.length <= 0xFFFFFFFF) {
      size += 1
      size += 4
    } else {
      throw new Error('Invalid buffer size')
    }

    size += this.length
    return size
  }

  gclGsonSerialize (buf, off) {
    if (this.length <= 0x1F) {
      buf.writeUInt8(GsonType.FIXBIN + this.length, off)
      off += 1
    } else if (this.length <= 0xFF) {
      buf.writeUInt8(GsonType.BIN8, off)
      off += 1
      buf.writeUInt8(this.length, off)
      off += 1
    } else if (this.length <= 0xFFFF) {
      buf.writeUInt8(GsonType.BIN16, off)
      off += 1
      buf.writeUInt16LE(this.length, off)
      off += 2
    } else if (this.length <= 0xFFFFFFFF) {
      buf.writeUInt8(GsonType.BIN32, off)
      off += 1
      buf.writeUInt32LE(this.length, off)
      off += 4
    } else {
      throw new Error('Invalid buffer size')
    }

    Buffer.from(this).copy(buf, off)
    off += this.length
    return off
  }

  gclGsonPrint (ident) {
    return 'Bin("' + Buffer.from(this).toString('hex') + '")'
  }

  toString () {
    return Buffer.from(this).toString('hex')
  }
}
