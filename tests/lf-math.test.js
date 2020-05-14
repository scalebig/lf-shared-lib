const { lfMath } = require('../index')
const { lfNum } = require('../index')

describe('lfMath test suite', () => {
  // standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]); // => 2
  test('standard deviation should return the std dev of an array of numbers', () => {
    expect(lfMath.standardDeviation([2, 4, 4, 4, 5, 5, 7, 9]))
      .toBe(2)
  })

  test('genRandom - default returns a value between 0 and 1.', () => {
    for (let i = 0; i < 10; i++) {
      let randomValue = lfMath.genRandom()
      expect(lfNum(randomValue).num)
        .toBeGreaterThanOrEqual(0)
      expect(lfNum(randomValue).num)
        .toBeLessThanOrEqual(1)
    }
  })

  test('genRandom - return a value between -100 and 1.', () => {
    for (let i = 0; i < 10; i++) {
      let randomValue = lfMath.genRandom(-100)
      expect(lfNum(randomValue).num)
        .toBeGreaterThanOrEqual(-100)
      expect(lfNum(randomValue).num)
        .toBeLessThanOrEqual(1)
    }
  })

  test('genRandom - return a number between 0.100 and 0.500 at a precision of 0.050', () => {
    let potentialSteps = ['0.10', '0.15', '0.20', '0.25', '0.30', '0.35', '0.40', '0.45', '0.50']
    for (let i = 0; i < 10; i++) {
      let randomValue = lfMath.genRandom(0.100, 0.500, 0.05)
      expect(lfNum(randomValue).num)
        .toBeGreaterThanOrEqual(0.100)
      expect(lfNum(randomValue).num)
        .toBeLessThanOrEqual(0.500)
      expect(potentialSteps)
        .toContain(lfNum(randomValue).format('0.00'))
    }
  })

  test('genRandom - return a number between 100 and 500 at a precision of 50', () => {
    let potentialSteps = ['100', '150', '200', '250', '300', '350', '400', '450', '500']
    for (let i = 0; i < 10; i++) {
      let randomValue = lfMath.genRandom(100, 500, 50)
      expect(lfNum(randomValue).num)
        .toBeGreaterThanOrEqual(100)
      expect(lfNum(randomValue).num)
        .toBeLessThanOrEqual(500)
      expect(potentialSteps)
        .toContain(lfNum(randomValue).format('0'))
    }
  })

  test('genRandom - return a number between -500 and -100 at a precision of 50', () => {
    let potentialSteps = ['-100', '-150', '-200', '-250', '-300', '-350', '-400', '-450', '-500']
    for (let i = 0; i < 10; i++) {
      let randomValue = lfMath.genRandom(-500, -100, 50)
      expect(lfNum(randomValue).num)
        .toBeGreaterThanOrEqual(-500)
      expect(lfNum(randomValue).num)
        .toBeLessThanOrEqual(-100)
      expect(potentialSteps)
        .toContain(lfNum(randomValue).format('0'))
    }
  })
})
