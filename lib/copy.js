let safeCopy = require('clone')
let copy = require('deep-copy')

module.exports = (source, safe) => {
  if (safe) {
    return safeCopy(source)
  } else {
    return copy(source)
  }
}
