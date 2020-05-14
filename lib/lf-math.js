const regression = require('./regression')
const lfNum = require('./lf-num')

const {
  min,
  max,
  sum,
  sumSimple,
  quantile,
  quantileRank,
  product,

  mean,
  addToMean,
  mode,
  modeSorted,
  modeFast,
  median,
  medianSorted,
  harmonicMean,
  geometricMean,
  rootMeanSquare,
  sampleSkewness,

  variance,
  sampleVariance,
  standardDeviation,
  sampleStandardDeviation,
  medianAbsoluteDeviation,
  interquartileRange,
  sumNthPowerDeviations,
  zScore,

  sampleCorrelation,
  sampleCovariance,
  rSquared,

  shuffle,
  shuffleInPlace,
  sampleWithReplacement,
  sample,

  bernoulliDistribution,
  binomialDistribution,
  poissonDistribution,
  chiSquaredDistributionTable,
  standardNormalTable,
  tTest,
  tTestTwoSample,
  permutationTest,
  cumulativeStdNormalProbability,

  chunk,
  chiSquaredGoodnessOfFit,
  epsilon,
  factorial,
  gamma,
  gammaln,
  uniqueCountSorted,
  extent,
  extentSorted,
  sampleKurtosis,
  permutationsHeap,
  combinations,
  combinationsReplacement,
  combineMeans,
  combineVariances,
  subtractFromMean,
  kernelDensityEstimation,
  bisect,
  quickselect

} = require('simple-statistics')

const builtIns = {
  abs: Math.abs,
  acos: Math.acos,
  acosh: Math.acosh,
  asin: Math.asin,
  asinh: Math.asinh,
  atan: Math.atan,
  atan2: Math.atan2,
  atanh: Math.atanh,
  cbrt: Math.cbrt,
  ceil: Math.ceil,
  clz32: Math.clz32,
  cos: Math.cos,
  cosh: Math.cosh,
  exp: Math.exp,
  expm1: Math.expm1,
  floor: Math.floor,
  fround: Math.fround,
  hypot: Math.hypot,
  imul: Math.imul,
  log: Math.log,
  log10: Math.log10,
  log1p: Math.log1p,
  log2: Math.log2,
  // max: Math.max,
  // min: Math.min,
  pow: Math.pow,
  random: Math.random,
  round: Math.round,
  sign: Math.sign,
  sin: Math.sin,
  sinh: Math.sinh,
  sqrt: Math.sqrt,
  tan: Math.tan,
  tanh: Math.tanh,
  trunc: Math.trunc
}

const custom = {
  deg2rad: degrees => (degrees * Math.PI / 180),
  rad2deg: radians => (radians * 180 / Math.PI),
  equivalencePoint: (array, box) => {
    // expects an array of objects with x and y properties
    let newArray = array.map((item) => ([item.x, item.y]))
    let index = null
    let slopeMax = 0
    let slopeCheck = 0
    let pointMax = {}
    for (let i = 0; i < array.length - box - 1; i++) {
      let arraySlice = newArray.slice(i, i + box)
      slopeCheck = regression.linear(arraySlice).equation[0]
      if (slopeCheck > slopeMax) {
        slopeMax = slopeCheck
        pointMax = array[i + Math.floor(box / 2)]
        index = i + Math.floor(box / 2)
      }
    }
    return ({ pointMax, index })
  },
  fmod: (a, b) => (Number((a - (Math.floor(a / b) * b)).toPrecision(8)))
}

module.exports = {
  ...builtIns, // add all of the Math funcs
  ...custom,
  regression: {...regression},
  genRandom: (min = 0, max = 1, step = 0.01) => {
    let rawRandom = Math.random() * (max - min + step)
    let increment = Math.floor(rawRandom / step)
    return (min + (step * increment))
  },

  min,
  max,
  sum,
  sumSimple,
  quantile,
  quantileRank,
  product,

  mean,
  addToMean,
  mode,
  modeSorted,
  modeFast,
  median,
  medianSorted,
  harmonicMean,
  geometricMean,
  rootMeanSquare,
  sampleSkewness,

  variance,
  sampleVariance,
  standardDeviation,
  sampleStandardDeviation,
  medianAbsoluteDeviation,
  interquartileRange,
  sumNthPowerDeviations,
  zScore,

  sampleCorrelation,
  sampleCovariance,
  rSquared,

  shuffle,
  shuffleInPlace,
  sampleWithReplacement,
  sample,

  bernoulliDistribution,
  binomialDistribution,
  poissonDistribution,
  chiSquaredDistributionTable,
  standardNormalTable,
  tTest,
  tTestTwoSample,
  permutationTest,
  cumulativeStdNormalProbability,

  chunk,
  chiSquaredGoodnessOfFit,
  epsilon,
  factorial,
  gamma,
  gammaln,
  uniqueCountSorted,
  extent,
  extentSorted,
  sampleKurtosis,
  permutationsHeap,
  combinations,
  combinationsReplacement,
  combineMeans,
  combineVariances,
  subtractFromMean,
  kernelDensityEstimation,
  bisect,
  quickselect

}
