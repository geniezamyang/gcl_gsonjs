/**
 * A module implements the GSON Doc type.
 * @module gclGsonDoc
 */

const GsonType = require('./gclGsonType.js')
const GsonUtil = require('./gclGsonUtil.js')
module.exports = class {
    /**
     * Create an instance of gclGsonDoc.
     * @param val - the value of document.
     * @return {gclGsonDoc} - an instance of gclGsonDoc.
     */
    constructor (val) {
        this.value = val
    }

    gclGsonCalcSize() {
        var size = 0
        var len = this.value.gclGsonCalcSize()
        if (len <= 0xFFFFFFFF) {
            size += 5
        } else {
            throw "Invalid buffer size"
        }
        size += len
        return size
    }

    gclGsonSerialize(buf, off) {
        var len = this.value.gclGsonCalcSize()
        if (len <= 0xFFFFFFFF) {
            buf.writeUInt8(GsonType.DOC, off)
            off += 1
            buf.writeUInt32LE(len, off)
            off += 4
        } else {
            throw "Invalid buffer size"
        }
        off = this.value.gclGsonSerialize(buf, off)
        return off
    }

    toJSON(type = true){
      if (type) {
        return {"__DOC": GsonUtil.toJSON(this.value, type)}
      } else {
        return GsonUtil.toJSON(this.value, type)
      }
    }

    gclGsonPrint(ident) {
        var str = 'Doc('
        str += this.value.gclGsonPrint(ident)
        str += ')'
        return str
    }

    gclGsonFlatten (target, path) {
        // console.log('gclGsonDoc.gclGsonFlatten(): this=', this, 'target=', target, 'path=', path)
        GsonUtil.flatten(this.value, target, path)
    }

    toString(){
        return this.value.toString()
    }
}

