
function SigFloat (str) {
  if (typeof str === 'number') {
    this.fixed = str.toString()
  } else if (parseFloat(str)) {
    this.fixed = str
  } else {
    this.fixed = '0'
  }
}

SigFloat.containsSigDigit = function (str) {
  for (var i = 0; i < str.length; i++) {
    var j = parseInt(str.charAt(i))
    if ((j && j !== 0) || str.charAt(i) === '.') {
      return true
    } else {
      // return false;
      // Brian commented this out, because if it failed the first check, it would return false, and not continue through the rest of the string. So if the incoming string was
    }
  }
  // Brian uncommented this out so that if there wasn't a sig fig in the string we returned false.
  return false
}

// Only the digits to the right of the decimal place are considered significant in a logarithmic value.
SigFloat.log = function (sf) {
  if (sf.toFloat && sf.toFloat() > 0) {
    var logAsFloat = Math.log(sf.toFloat())
    var intLength = (parseInt(logAsFloat) + '').length
    var numSigFigs = sf.sigFigures() + intLength // accounting for non-significant digits in the result
    var logsf = new SigFloat(logAsFloat + '')
    return logsf.withSigFigures(numSigFigs)
  } else {
    return new SigFloat('0')
  }
}

SigFloat.prototype.toFixed = function () {
  var str = this.fixed
  var arr = str.split('.')
  if (arr.length === 1) {
    return str
  }
  return parseFloat(str).toFixed(arr[1].length)
}

SigFloat.prototype.toFloat = function () {
  return parseFloat(this.fixed)
}

SigFloat.prototype.toString = function () {
  return this.fixed
}

SigFloat.prototype.trailingZeros = function () {
  var decimalCorrection = 0
  if (this.toFloat() === parseInt(this.toFloat()) && this.toFixed() !== this.toFloat().toString()) {
    decimalCorrection = -1
  }
  return (this.toFixed().length - this.toFloat().toString().length + decimalCorrection)
}

SigFloat.prototype.isSignificantAt = function (index) {
  var flStr = this.toString()
  var flChar = flStr.charAt(index)
  if (!(parseInt(flChar) || parseInt(flChar) === 0)) { // If character isn't an integer
    return false
  }
  if ((flStr.substring(0, index).match(/^[-\.0]+$/g) || index === 0) && parseInt(flChar) === 0) { // If character is a leading zero
    return false
  }
  if (flStr.substring(0, index).match(/[eE]/g)) { // If character is the argument of an exponent (e.g. "23" in 6.022e+23)
    return false
  }
  if (parseInt(flChar) !== 0) { // If character is a non-zero integer
    return true
  }
  if (SigFloat.containsSigDigit(flStr.substring(index + 1))) { // If character is followed by a significant digit
    // Brian says, really this should be if there is a significant digit or decimal point following the character.
    return true
  }
  if (flStr.substring(0, index).match(/\./g) && !SigFloat.containsSigDigit(flStr.substring(index + 1))) { // If character is a trailing zero
    return true
  }
  return false
}

SigFloat.prototype.sigFigures = function () {
  var flStr = this.toString()
  var count = 0
  for (var i = 0; i < flStr.length; i++) {
    count += (this.isSignificantAt(i) * 1)
  }
  return count
}

module.exports = SigFloat
