let { readFileSync } = require("fs");
let src = readFileSync('/home/runner/karinaTwo/database/client/changelogs/change.txt',{encoding:"utf8"});
//require("../../../")
const NEWLINE = '\n'
const RE_INI_KEY_VAL = /^\s*([\w.-]+)\s*=\s*(.*)?\s*$/
const RE_NEWLINES = /\\n/g
const NEWLINES_MATCH = /\r\n|\n|\r/
const obj = {}

src.toString().split(NEWLINES_MATCH).forEach(function (line, idx) {
    //const obj = {}
    const keyValueArr = line.match(RE_INI_KEY_VAL)
    if (keyValueArr != null) {
      const key = keyValueArr[1]
      
      let val = (keyValueArr[2] || '')
      const end = val.length - 1
      const isDoubleQuoted = val[0] === '"' && val[end] === '"'
      const isSingleQuoted = val[0] === "'" && val[end] === "'"

      if (isSingleQuoted || isDoubleQuoted) {
        val = val.substring(1, end)

        if (isDoubleQuoted) {
          val = val.replace(RE_NEWLINES, NEWLINE)
        }
      } else {
        val = val.trim()
      }
        obj[key] = val
    }
    //return obj
})
let cuu = {}
Object.keys(obj).forEach(function (key) {
      if (!Object.prototype.hasOwnProperty.call(cuu, key)) {
        cuu[key] = obj[key]
      } else if (debug) {
        
      }
    })
module.exports = cuu   
