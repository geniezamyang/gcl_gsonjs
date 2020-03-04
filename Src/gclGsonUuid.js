/**
 * A module implements the GSON Uuid type.
 * @module gclGsonUuid
 */

const GsonType = require('./gclGsonType.js')
const uuid = require('uuid/v1')
const uuidParse = require('uuid-parse')

module.exports = class Uuid extends Uint8Array {
    /**
     * Create an instance of gclGsonUuid.
     * @return {gclGsonUuid} - an instance of gclGsonUuid
     */
  constructor (...arg) {
    if (arg[0] === undefined) {
      var option
      super(16) // check length
      uuid(option, this, 0)
    } else if (typeof arg[0] === 'string' || arg[0] instanceof String) {
      super(uuidParse.parse(arg[0]))
    } else {
      super(...arg)
    }
  }

  gclGsonCalcSize () {
    return 17 // 1 + 16{uuid}
  }

  toJSON (type = true) {
    // ex: uuid: ea724370-000a-11e8-b423-615052c19080
    var str = ''
    str += Buffer.from(this.buffer, 0, 4).toString('hex') + '-' // ea72437
    str += Buffer.from(this.buffer, 4, 2).toString('hex') + '-' // 000a
    str += Buffer.from(this.buffer, 6, 2).toString('hex') + '-' // 11e8
    str += Buffer.from(this.buffer, 8, 2).toString('hex') + '-' // b423
    str += Buffer.from(this.buffer, 10, 6).toString('hex') // 615052c19080

    if (type) {
      return {'__UUID': str}
    } else {
      return str
    }
  }

  gclGsonSerialize (buf, off) {
    buf.writeUInt8(GsonType.UUID, off)
    off += 1
    Buffer.from(this).copy(buf, off)
    off += 16
    return off
  }

  gclGsonPrint (ident) {
    // 4-2-2-2-6
    var str = 'Uuid("'
    str += Buffer.from(this.buffer, 0, 4).toString('hex') + '-'
    str += Buffer.from(this.buffer, 4, 2).toString('hex') + '-'
    str += Buffer.from(this.buffer, 6, 2).toString('hex') + '-'
    str += Buffer.from(this.buffer, 8, 2).toString('hex') + '-'
    str += Buffer.from(this.buffer, 10, 6).toString('hex')
    str += '")'
    return str
  }

  toString () {
    // 4-2-2-2-6
    var str = ''
    str += Buffer.from(this.buffer, 0, 4).toString('hex') + '-'
    str += Buffer.from(this.buffer, 4, 2).toString('hex') + '-'
    str += Buffer.from(this.buffer, 6, 2).toString('hex') + '-'
    str += Buffer.from(this.buffer, 8, 2).toString('hex') + '-'
    str += Buffer.from(this.buffer, 10, 6).toString('hex')
    str += ''
    return str
  }
}
