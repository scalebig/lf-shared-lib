const _ = require('lodash')
const formatters = require('./formatters')
const numeral = require('numeral')
const lfMath = require('./lf-math')
const SigFigures = require('./sigfig-parse')
const roundTo = require('round-to')
const traverse = require('traverse')

const formatList = [
  'twoDigits',
  'currency',
  'dataSizeMbs',
  'decimals',
  'dynDecimals',
  'noDecimals',
  'percentDecimals',
  'percent',
  'percentNoSymbol'
]

const processOptions = (num, options) => {
  if (_.isNumber(options.default)) {
    num = _.isNumber(num) ? num : options.default
  }
  if (_.isNumber(options.min)) {
    if (num < options.min) {
      num = options.min
    }
  }

  return num
}

function LfNum (rawNum, options) {
  this.rawNum = rawNum
  this.strNum = null
  this.modified = false
  this.isLfNum = true
  this.roundedTo = options && options.roundedTo
  this.num = 0
  if (_.isString(rawNum)) {
    if (rawNum === '') {
      this.num = null
    } else {
      const regx = /^(\s*)(?<sign>[-+]?)?(?<currency>[$£])?(?<value>[0-9,]*(\.?[0-9]+))+(?<exponent>([eE][-+]?[0-9]+)?|(\s*[xX\*]\s*(10)+(?<exppow>\s*[^]\s*[-+]?[0-9]+)?)?)?\s*(?<unit>.*)?(\s*)$/i
      if (rawNum.match(regx) !== null) {
        let parseNum = rawNum.match(regx).groups

        if (!parseNum.unit) {
          this.unit = null
        } else {
          this.unit = parseNum.unit.trim()
        }

        if (!parseNum.sign) {
          this.sign = ''
        } else {
          this.sign = parseNum.sign
        }

        let value = this.sign + parseNum.value.replace(/,/g, '')

        if (parseNum.exponent) {
          let exp = parseNum.exponent.replace(/\s/gi, '').toUpperCase()

          // console.log('exp', exp, parseNum.exppow )
          if (exp.includes('X') || exp.includes('*')) {
            if (parseNum.exppow) {
              exp = 'E' + parseNum.exppow.replace(/\s|[\^]/gi, '')
            } else {
              exp = 'E1'
            }
          }
          // console.log('exp2', exp)
          if (exp.includes('E')) {
            this.exponent = exp
            this.exponentValue  = exp.substr(1)
            this.num = parseFloat(value + exp)
          }
        } else {
          this.num = parseFloat(value)
        }

        if (!parseNum.currency) {
          this.currency = null
        } else {
          this.currency = parseNum.currency.trim()
        }
      } else {
        this.rawNum = null
      }
    }
    this.strNum = rawNum
  }

  if (_.isNumber(rawNum)) {
    this.num = rawNum
    this.strNum = rawNum.toString()
  }

  if (_.isObject(rawNum)) {
    if (rawNum.num) {
      this.num = rawNum.num
      this.unit = rawNum.units
    } else {
      this.num = null
      this.unit = null
    }
  }

  if (rawNum === null || _.isNaN(rawNum)) {
    this.num = null
  }

  if (options) {
    this.num = processOptions(this.num, options)
  }
}

LfNum.prototype.isNumber = function () {
  return _.isNumber(this.num)
}

LfNum.prototype.toFloat = function () {
  return this.num
}

LfNum.prototype.toString = function () {
  // return this.modified ? this.format('nfDecimals') : this.strNum
  if (this.roundedTo) {
    return this.num.toFixed(this.roundedTo)
  }
  return this.format('0.[00]')
}

LfNum.prototype.format = function (format, options = {}) {
  if (formatList.includes(format)) {
    return formatters.formatNumber(this.num, options)[format]
  } else {
    return numeral(this.num).format(format)
  }
}

LfNum.prototype.add = function (...numArgs) {
  if (_.isArray(numArgs[0])) {
    return lfNum(this.num).addTo(numArgs[0])
  } else {
    return lfNum(this.num).addTo(numArgs)
  }
}

LfNum.prototype.subtract = function (...numArgs) {
  if (_.isArray(numArgs[0])) {
    return lfNum(this.num).subtractTo(numArgs[0])
  } else {
    return lfNum(this.num).subtractTo(numArgs)
  }
}

LfNum.prototype.subtractTo = function (...numArgs) {
  this.modified = true
  let numList = numArgs
  if (_.isArray(numArgs[0])) {
    numList = numArgs[0]
  }

  let normLfNumList = numList.map((numItem) => (new LfNum(numItem)))
  this.num = normLfNumList.reduce((acc, item) => (acc - (_.isNumber(item.num) ? item.num : 0)), this.num)

  return this
}

LfNum.prototype.addTo = function (...numArgs) {
  this.modified = true
  let numList = numArgs
  if (_.isArray(numArgs[0])) {
    numList = numArgs[0]
  }

  let normLfNumList = numList.map((numItem) => (lfNum(numItem)))
  let addVal = normLfNumList.reduce((acc, item) => (acc + item.num), 0)
  this.num = normLfNumList.reduce((acc, item) => (acc + (_.isNumber(item.num) ? item.num : 0)), this.num)

  return this
}

LfNum.prototype.multiplyTo = function (...numArgs) {
  this.modified = true
  let numList = numArgs
  if (_.isArray(numArgs[0])) {
    numList = numArgs[0]
  }

  let normLfNumList = numList.map((numItem) => (lfNum(numItem)))
  this.num = normLfNumList.reduce((acc, item) => (acc * (_.isNumber(item.num) ? item.num : 0)), this.num)

  return this
}

LfNum.prototype.decimalPlacesCount = function (internalSource = 'string') {
  let source = internalSource === 'string' ? this.strNum : this.toString()

  const re = /[.][0-9]*/
  let dpCount = 0
  const matches = re.exec(source)
  if (matches && matches[0]) {
    dpCount = matches[0].length - 1
  }
  if (this.exponentValue) {
    dpCount = dpCount - this.exponentValue
  }
  return Math.max(dpCount, 0)
}

LfNum.prototype.isDecimalPlacesCount = function (compareTo) {
  return this.decimalPlacesCount() === parseInt(compareTo)
}

LfNum.prototype.isSigFigCount = function (compareTo) {
  return new SigFigures(this.strNum).sigFigures() === parseInt(compareTo)
}

LfNum.prototype.toSigFigCount = function (targetCount, round) {
  let value = this.strNum
  let parseNum = {}
  const regx = /^(\s*)(?<value>[0-9,]*(\.?[0-9]+))+(?<exponent>([eE][-+]?[0-9]+)?|(\s*[xX\*]\s*(10)+(?<exppow>\s*[^]\s*[-+]?[0-9]+)?)?)?\s*(?<unit>.*)?(\s*)$/i
  if (this.strNum.match(regx) !== null) {
    parseNum = this.strNum.match(regx).groups
    value = parseNum.value.replace(/,/g, '')
    if (parseNum.exponent) {
      let exp = parseNum.exponent.replace(/\s/gi, '').toUpperCase()

      if (exp.includes('X') || exp.includes('*')) {
        if (parseNum.exppow) {
          exp = 'E' + parseNum.exppow.replace(/\s|[\^]/gi, '')
        } else {
          exp = 'E1'
        }
      }
      if (exp.includes('E')) {
        this.exponent = exp
        this.exponentValue  = exp.substr(1)
        this.num = parseFloat(value + exp)
      }
    }
  }
  let minLength = value.indexOf('.')
  if (minLength === -1) {
    minLength = value.length
  }
  for (var i = value.length; i >= 0; i--) {
    let testNum = (round && i < value.length) ? lfNum(value.slice(0,i+1)).roundLastDigit() : value.slice(0, i)
    if (new SigFigures(testNum).sigFigures() <= parseInt(targetCount)) {
      for (var j = testNum.length; j < minLength; j++) { testNum = testNum + '0' }
      if (parseNum.exponent) {testNum = testNum + parseNum.exponent}
      return testNum
    }
  }
}

LfNum.prototype.isNotEq = function (compareTo) {
  return this.toFloat() !== lfNum(compareTo).toFloat()
}

LfNum.prototype.isEq = function (compareTo) {
  return this.toFloat() === lfNum(compareTo).toFloat()
}

LfNum.prototype.isGt = function (compareTo) {
  return this.toFloat() > lfNum(compareTo).toFloat()
}

LfNum.prototype.isGte = function (compareTo) {
  return this.toFloat() >= lfNum(compareTo).toFloat()
}

LfNum.prototype.isLt = function (compareTo) {
  return this.toFloat() < lfNum(compareTo).toFloat()
}

LfNum.prototype.isLte = function (compareTo) {
  return this.toFloat() <= lfNum(compareTo).toFloat()
}

LfNum.prototype.isInTolerance = function (expected, tolerance, multiplier = 1, absolute = false) {
  let val = this.toFloat()
  let expectedVal = lfNum(expected).toFloat() * multiplier

  if (tolerance === null || _.isUndefined(tolerance)) {
    tolerance = 0
  }

  if (absolute) {
    return (val <= (expectedVal + tolerance)) && (val >= (expectedVal - tolerance))
  } else {
    if (expected < 0) {
      tolerance = tolerance * -1
    }
    return (val <= (expectedVal * (1 + tolerance))) && (val >= expectedVal * (1 - tolerance))
  }
}

LfNum.prototype.scaledScore = function (maxPoints, maxScore) {
  return lfNum((this.toFloat() / lfNum(maxPoints).toFloat()) * lfNum(maxScore).toFloat())
}

LfNum.prototype.round = function (places) {
  return this.num === null ? this : lfNum(roundTo(this.toFloat(), places), { roundedTo: places })
}

LfNum.prototype.roundScore = function () {
  return this.round(2)
}
// < 1
LfNum.prototype.roundPercent = function () {
  return this.round(4)
}

/* returns a new number string with the last character lopped off and the new last digit rounded accordingly
    e.g. '1234' -> '123'
    e.g. '1236' -> '124'
    e.g. '123.4' -> '123.'
    e.g. '123.6' -> '124.'
*/

LfNum.prototype.roundLastDigit = function () {
  const lastThree = this.strNum.slice(-3)
  const index = lastThree.indexOf('.')
  const lastDigit = lastThree.slice(-1)
  let result = ''
  let pre = ''
  let post = ''
  if (this.strNum.length <= 1) {
    return ''
  }
  switch (index) {
    case 1: // decimal place is in between the last two digits
      pre = this.strNum.slice(0,-3)
      post = lastDigit >= 5 ? String(Number(lastThree.slice(-3,-2))+1) + '.' : lastThree.slice(-3,-1)
      result = pre+post
      break;
    case 2: // drop the trailing decimal place
      result = this.strNum.slice(0,-1)
      break;
    case 0:
    case -1:
    default: // lop off the last digit, but round the new last digit accordingly
      pre = this.strNum.slice(0,-2)
      post = lastDigit >= 5 ? String(Number(lastThree.slice(-2,-1))+1) : lastThree.slice(-2,-1)
      result = pre+post
  }
  return result
}

LfNum.prototype.getNormalizedUnit = function () {
  if (this.unit) {
    return lfNum.normalizeUnit(this.unit)
  } else return null
}

function lfNum (arg, options) {
  if (_.isArray(arg)) {
    return arg.map((item) => (lfNum(item)))
  } else {
    return new LfNum(arg, options)
  }
}

lfNum.mul = (...numArgs) => {
  return lfNum(1).multiplyTo(numArgs)
}

lfNum.div = (...numArgs) => {
  return lfNum(lfNum(numArgs[0]).toFloat() / lfNum(numArgs[1]).toFloat())
}

lfNum.sub = (...numArgs) => {
  return lfNum(numArgs[0]).subtractTo(numArgs[1])
}

lfNum.add = (...numArgs) => {
  return lfNum(numArgs[0]).addTo(numArgs[1])
}

lfNum.objToFloat = (obj, predicate) => {
  if (!obj) return obj
  traverse(obj).forEach(function (node) {
    if (node && node.isLfNum) {
      if (predicate) {
        this.update(predicate(node))
      } else {
        this.update(node.toFloat())
      }
    }
  })
  return obj
}

lfNum.objToLfNum = (obj, keyList) => {
  if (!obj) return obj
  traverse(obj).forEach(function (node) {
    if (keyList.indexOf(this.key) !== -1) {
      this.update(lfNum(node))
    }
  })
  return obj
}

lfNum.normalizeUnit = (str) => {
  return str.replace(/\-|\–|\—/g, '-')
}

module.exports = lfNum
