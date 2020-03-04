/**
 * A module implements the GSON Oper type.
 * @module gclGsonOper
 */

const GsonType = require('./gclGsonType.js')
const GsonUtil = require('./gclGsonUtil.js')

class Oper {
    /**
     * Create an instance of gclGsonOper.
     * @param {Number} arg - the opcode.
     * @return {gclGsonOper} - an instance of gclGsonOper.
     */
  constructor (arg, label) {
    this.label = label
    arg = Number(arg)
    if (!isNaN(arg)) {
      this.opcode = arg
    } else { // exception
      throw new Error('Invalid argument')
    }
  }

  gclGsonCalcSize () {
    return 2
  }

  toJSON (type = true) {
    if (type) {
      return {'__OPER': GsonUtil.toJSON(this.opcode)}
    } else {
      return GsonUtil.toJSON(this.opcode)
    }
  }

  gclGsonSerialize (buf, off) {
    buf.writeUInt8(GsonType.OPER, off)
    off += 1
    buf.writeUInt8(this.opcode, off)
    off += 1
    return off
  }

  gclGsonPrint (ident) {
    const regStr = Oper.opValueMap.get(this.opcode)
    if (regStr === undefined) {
      return '$' + this.opcode.toString()
    }
    return '$' + regStr
  }

  toString () {
    return this.gclGsonPrint(0)
  }

  // static validator (arg) {
  //   if (typeof arg !== 'number') {
  //     return {
  //       rlt: false,
  //       err: `Error: the input "${arg}" is not an GSON Operator`
  //     }
  //   }

  //   if (operValueMap.get(arg) === undefined) {
  //     return {
  //       rlt: false,
  //       err: `Error: the input "${arg}" is not an GSON Operator`
  //     }
  //   }

  //   return {
  //     rlt: true,
  //     err: null
  //   }
  // }
}

Oper.opValueMap = new Map()

Oper.loadOpValueMap = function (map) {
  if (typeof map !== 'object') {
    throw new TypeError('operator value map shall be an object!')
  }
  if (map instanceof Map) {
    Oper.opValueMap = new Map([...Oper.opValueMap, ...map])
    // console.log(map)
  } else {
    for (let key in map) {
      Oper.updateOpValueMap(key, map[key])
    }
  }
}

Oper.updateOpValueMap = function (value, label) {
  Oper.opValueMap.set(Number(value), label)
}

module.exports = Oper

// module.exports.Reg = function(obj){
//  Object.keys(obj).forEach((elt, index, array) => {
//    operValueMap.set(obj[elt], elt)
//    module.exports[elt] = function() {
//      var arg = Array.from(arguments)
//      arg.unshift(obj[elt])
//      return new module.exports(arg)
//    }
//  })
// }
