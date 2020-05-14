const lfMath = require('./lf-math')

let self = module.exports = {
  required: (obj, prop) => (!(!obj[prop] || obj[prop] === '')),
  numeric: (obj, prop) => (/^[+|-]?(\d+\.\d+|\.\d+|\d+|\d+\.)([E|e|X|x]?(10)?[\^\*]?[+|-]?\d+)?$/i.test(obj[prop])),
  email: (obj, prop) => {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(obj[prop]).toLowerCase())
  },
  minLength: (obj, prop, minLength) => (obj[prop] && obj[prop].length >= minLength),
  inclusiveBounds: (obj, prop, lowerBound, upperBound) => (obj[prop] >= lowerBound && obj[prop] <= upperBound),
  exclusiveBounds: (obj, prop, lowerBound, upperBound) => (obj[prop] > lowerBound && obj[prop] < upperBound)
}
