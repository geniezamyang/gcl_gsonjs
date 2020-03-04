/**
 * A module implements the GSON Pair type.
 * @module gclGsonPair
 */

const GsonType = require('./gclGsonType.js')
const GsonUtil = require('./gclGsonUtil.js')
module.exports = class Pair {
    /**
     * Create an instance of gclGsonPair.
     * @param {Object} src - the source value.
     * @param {Object} dst - the destination value.
     * @return {gclGsonPair} - an instance of gclGsonPair
     */
  constructor (src, dst) {
    this.src = src
    this.dst = dst
  }

  toJSON (type = true) {
    if (type) {
      return {'__PAIR': [GsonUtil.toJSON(this.src), GsonUtil.toJSON(this.dst)]}
    } else {
      return [GsonUtil.toJSON(this.src), GsonUtil.toJSON(this.dst)]
    }
  }

  gclGsonCalcSize () {
    var size = 0
    size += 1
    size += GsonUtil.calcSize(this.src)
    size += GsonUtil.calcSize(this.dst)
    return size
  }

  gclGsonSerialize (buf, off) {
    buf.writeUInt8(GsonType.PAIR, off)
    off += 1
    off = GsonUtil.serialize(this.src, buf, off)
    off = GsonUtil.serialize(this.dst, buf, off)
    return off
  }

  gclGsonPrint (ident) {
    var str = 'Pair('
    str += GsonUtil.print(this.src, ident)
    str += ', '
    str += GsonUtil.print(this.dst, ident)
    str += ')'
    return str
  }

  toString () {
    var str = ''
    str += GsonUtil.toString(this.src)
    str += ', '
    str += GsonUtil.toString(this.dst)
    return str
  }

  gclGsonFlatten (target, path) {
    // console.log('gclGsonPair.gclGsonFlatten(): this=', this, 'target=', target, 'path=', path)
    var seperator = (path.length === 0) ? '' : '.'
    GsonUtil.flatten(this.src, target, path + seperator + 'src')
    GsonUtil.flatten(this.dst, target, path + seperator + 'dst')
  }

  // static validator (val) {
  //   if (Array.isArray(val) === false) {
  //     return {
  //       rlt: false,
  //       err: `Error: the input "${val}" is not an GSON Pair format`
  //     }
  //   } else if (val.length !== 2) {
  //     return {
  //       rlt: false,
  //       err: `Error: the input "${val}" is not an GSON Pair format`
  //     }
  //   }
  //   return {
  //     rlt: true,
  //     err: null
  //   }
  // }
}
